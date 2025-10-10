// src/components/playcanvas-react/RenderApiDocs.jsx
import React from 'react';
import './RenderApiDocs.css';

/**
 * Main component to render API documentation from parsed TypeScript types
 * Data comes pre-parsed from the remark plugin at build time
 */
export default function RenderApiDocs({ data }) {
  const definitions = parseData(data);
  
  if (!definitions || definitions.length === 0) {
    return <div className="api-docs-error">No API data available</div>;
  }
  
  return (
    <>
      {/* {definitions.map((definition, index) => (
        <div className="api-docs-definition">
          { definition.entries?.length > 0 && (
            <PropertyTable entries={definition.entries} />
          )}
        </div>
      ))} */}
    </>
  );
}

/**
 * Parse the JSON data if it's a string
 */
function parseData(data) {
  if (!data) return null;
  
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Error parsing API data:', error);
      return null;
    }
  }
  
  return parsedData;
}

/**
 * Render a table of properties
 */
function PropertyTable({ entries }) {
  return (
    <div className="api-docs-properties">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <PropertyRow key={index} entry={entry} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Render a single property row
 */
function PropertyRow({ entry }) {
  return (
    <tr>
      <td>
        <code>
          {entry.name}{entry.optional ? '?' : ''}
        </code>
      </td>
      <td>
        <div className="type-cell">
          <TypeDisplay type={entry.type} />
          {entry.description && (
            <div className="type-description">{entry.description}</div>
          )}
        </div>
      </td>
      <td>
        <code>{entry.defaultValue || '-'}</code>
      </td>
    </tr>
  );
}

/**
 * Render type information with proper linking
 * Supports both simple types and union types with individual links
 */
function TypeDisplay({ type }) {
  if (!type) {
    return <code>unknown</code>;
  }
  
  // New format: { displayName, types: [{ name, url }, ...] }
  if (type.displayName && type.types) {
    return <UnionType displayName={type.displayName} types={type.types} />;
  }
  
  // Old/simple format: { name, url }
  return <SimpleType name={type.name || 'unknown'} url={type.url} />;
}

/**
 * Render a union type with individual links for each member
 */
function UnionType({ displayName, types }) {
  // If no linkable types, just show the display name
  if (!types.some(t => t.url)) {
    return <code>{displayName}</code>;
  }
  
  const parts = displayName.split(/\s*\|\s*/);
  
  return (
    <code>
      {parts.map((part, index) => {
        const trimmedPart = part.trim();
        const matchingType = types.find(t => t.name === trimmedPart);
        
        return (
          <React.Fragment key={index}>
            {index > 0 && ' | '}
            {matchingType?.url ? (
              <a href={matchingType.url} target="_blank" rel="noopener noreferrer">
                {trimmedPart}
              </a>
            ) : (
              trimmedPart
            )}
          </React.Fragment>
        );
      })}
    </code>
  );
}

/**
 * Render a simple type with optional link
 */
function SimpleType({ name, url }) {
  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        <code>{name}</code>
      </a>
    );
  }
  
  return <code>{name}</code>;
}
