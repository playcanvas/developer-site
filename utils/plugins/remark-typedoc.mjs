// utils/plugins/remark-tsdoc-simple.mjs
import { visit } from 'unist-util-visit';
import { Project, SyntaxKind, ts } from 'ts-morph';

/**
 * This is a docusaurus plugin to parse TS Code blocks and extract API documentation.
 * Use in conjunction with the RenderApiDocs component to display the TSDocs.
 * 
 * @example
 * ```tsx asTypedoc
 * export MyType = {
 *   // The is the name property
 *   name: string;
 *   // The age property is optional
 *   age?: number;
 * }
 * ```
 * 
 * This will render a Type doc style component
 */

/**
 * The symbol to use to denote that the code block should be rendered as documentation
 */
const DOC_SYMBOL = 'asTypedoc';

/**
 * @typedef {Object} PropertyType
 * Defines a type with a name, and the module that it belongs to
 * @param {string} name - The name of the type
 * @param {string} moduleName - The name of the module
*/

/**
 * @typedef {Function} TypeResolver
 * A function that allows users to map documented types to custom URLs
 * @param {Object} options - The options for generating definitions
 * @param {string} options.displayName - The name of the type
 * @param {PropertyType[]} options.types - The types of the type
 * @param {Map<string, string>} options.tags - The JSDoc tags for the type
*/

/**
 * @typedef {Object} Definition
 * @param {string} name - The name of the type
 * @param {string} description - The description of the type
 * @param {Entry[]} entries - The entries for the type
*/

/**
 * @typedef {Object} Entry
 * @param {string} name - The name of the entry
 * @param {Object} type - The type of the entry
 * @param {string} description - The description of the entry
 * @param {boolean} optional - Whether the entry is optional
 * @param {string} defaultValue - The default value of the entry
*/

// Create a single project instance (like Nextra does)
const project = new Project({
  tsConfigFilePath: './tsconfig.json',
  skipAddingFilesFromTsConfig: true,
  compilerOptions: {
    exactOptionalPropertyTypes: true,
    strictNullChecks: true,
    skipLibCheck: true,
    moduleResolution: 2, // Node
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
  },
});

/**
 * Remark plugin to parse TypeScript code blocks and extract API documentation
 * Uses ts-morph for robust TypeScript parsing
 * @param {Object} options - The options for generating definitions
 * @param {TypeResolver} options.typeResolver - A function to resolve types
 */
export default function remarkTypedoc({ typeResolver }) {
  return async (tree) => {
    visit(tree, 'code', async (node, index, parent) => {
      if ((node.lang === 'tsx' || node.lang === 'ts') && node.meta?.includes(DOC_SYMBOL)) {
        try {

          const definitions = generateDefinitions({
            code: node.value,
            typeResolver
          });          

          parent.children[index] = {
            type: 'mdxJsxTextElement',
            name: 'RenderApiDocs',
            attributes: [{
              type: 'mdxJsxAttribute',
              name: 'data',
              value: JSON.stringify(definitions)
            }],
            children: []
          };

        } catch (error) {
          console.error('Error processing tsdoc code block:', error);
        }
      }
    });
  };
}

/**
 * Generate documentation for all exported members (types, interfaces, etc.)
 * @param {Object} options - The options for generating definitions
 * @param {string} options.code - The code to generate definitions for
 * @param {TypeResolver} options.typeResolver - A function to resolve types
 * @returns {Array} An array of definitions
 */
function generateDefinitions({ code, typeResolver }) {
  // Get a fresh compiler object for each call to avoid stale references
  const compilerObject = project.getTypeChecker().compilerObject;
  const sourceFile = project.createSourceFile('temp.tsx', code, { overwrite: true });
  const exportedDeclarations = sourceFile.getExportedDeclarations();
  const definitions = [];

  // Run through all exported declarations
  for (const [name, declarations] of exportedDeclarations) {
    const declaration = declarations[0];
    const symbol = declaration?.getSymbol()
    if(!symbol) continue;
    const description = getComment(symbol, compilerObject);
    const properties = declaration.getType().getApparentProperties();
    
    // Run through the exports properties
    const entries = properties
      .map(symbol => getDocEntry({ symbol, declaration, typeResolver, compilerObject }))
      .filter(({ type }) => !!type); // Ignore properties with no type

    // Add the definition to the definitions array
    definitions.push({ name, description, entries });
  };

  return definitions;
}

/**
 * Get comment and tags from symbol
 * @param {Object} symbol - The symbol to get the comment from
 * @param {Object} compilerObject - The TypeScript compiler object
 * @returns {string} The comment from the symbol
 */
function getComment(symbol, compilerObject) {
  if (!symbol) {
    return ''
  }
  const comment = symbol.compilerSymbol.getDocumentationComment(compilerObject);
  return ts.displayPartsToString(comment);
}

/**
 * Get documentation entry for a symbol
 * @param {Object} options - The options for generating definitions
 * @param {Object} options.symbol - The symbol for the type
 * @param {Object} options.declaration - The declaration for the type
 * @param {TypeResolver} options.typeResolver - A function to resolve types
 * @param {Object} options.compilerObject - The TypeScript compiler object
 * @returns {Entry} The documentation entry for the symbol
 */
function getDocEntry({ symbol, declaration, typeResolver = noop, compilerObject }) {

  // get internal properties
  const subType = symbol.getTypeAtLocation(declaration);
  const valueDeclaration = symbol.getValueDeclaration();
  const isFunctionParameter = valueDeclaration && valueDeclaration.getKind() === SyntaxKind.Parameter;
  
  // get entry properties
  const name = symbol.getName();
  const comments = getComment(symbol, compilerObject);
  const description = replaceJsDocLinks(comments)//.replace(/^- /, '');
  const optional = isFunctionParameter ? valueDeclaration.isOptional() : symbol.isOptional();
  const tags = getTags(symbol);
  const defaultValue = subType.getDefault() ?? tags.get('default') ?? tags.get('defaultValue');
  const typeName = getTypeName({ symbol, subType, valueDeclaration });

  // Extract the type information
  const typesToProcess = subType.isUnion() 
    ? subType.getUnionTypes().filter(t => !t.isNull() && !t.isUndefined())
    : [subType];
  
  // Extract the name and module names for the types
  const types = typesToProcess.map(t => {
    const sym = t?.getSymbol();
    const sourceFile = sym?.getDeclarations()[0]?.getSourceFile();
    return {
      name: sym?.getName() || t.getText(),
      moduleName: sourceFile?.getBaseNameWithoutExtension()
    };
  });
  
  const type = typeResolver({ displayName: typeName, types, tags });
  
  return {
    name,
    description,
    optional,
    defaultValue,
    type
  };
}

/**
 * Get type name for a symbol
 * @param {Object} options - The options for generating definitions
 * @param {Object} options.symbol - The symbol for the type
 * @param {Object} options.subType - The sub type for the type
 * @param {Object} options.valueDeclaration - The value declaration for the type
 * @returns {string} The type name for the symbol
 */
function getTypeName({ symbol, subType, valueDeclaration }) {  
  const typeOf = valueDeclaration?.getType() ?? symbol.getDeclaredType();
  return typeOf.isUnknown() ? 'unknown' : getFormattedText(subType);
}

/**
 * Get JSDoc tags from symbol
 * @param {Object} options - The options for generating definitions
 * @param {Object} options.symbol - The symbol for the type
 * @returns {Map<string, string>} The JSDoc tags for the symbol
 */
const getTags = (symbol) => {
  const tags = new Map();
  symbol.getJsDocTags().forEach(tag => 
    tags.set(tag.getName(), ts.displayPartsToString(tag.getText()))
  );
  return tags;
};

/**
 * Get formatted text from type
 * @param {Object} t - The type to get the formatted text from
 * @returns {string} The formatted text from the type
 */
const getFormattedText = (t) => t.getText(undefined, ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope);

/**
 * Replace JSDoc links
 * @param {string} md - The markdown to replace links in
 * @returns {string} The markdown with links replaced
 */
const replaceJsDocLinks = (md) => md.replaceAll(/{@link (?<link>[^}]*)}/g, '$1');


const noop = (a) => a;