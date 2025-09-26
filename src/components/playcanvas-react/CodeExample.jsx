import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import './CodeExample.css';
import CodeBlock from '@theme/CodeBlock';
import { useState, useMemo } from 'react';
import { useColorMode } from '@docusaurus/theme-common';

// playcanvas-react
import { Entity } from '@playcanvas/react';
import { Camera,  Environment, Script, Light } from '@playcanvas/react/components';
import { useEnvAtlas } from '@playcanvas/react/hooks';

// playcanvas
import { CameraControls } from 'playcanvas/scripts/esm/camera-controls.mjs';
import { Grid } from 'playcanvas/scripts/esm/grid.mjs';
import { ShadowCatcher } from 'playcanvas/scripts/esm/shadow-catcher.mjs';
import { Vec3, SHADOW_VSM_16F, SHADOWUPDATE_REALTIME } from 'playcanvas';  

export const CodeExample = ({ code, label, filename, language = 'jsx', children, showDemo = false, showViewSourceButton = true }) => {
    const [renderKey, setRenderKey] = useState(0);

    if (!children || !code) {
        console.error('CodeExample: code and children are required');
        return null;
    }

    const handleViewCode = () => {
        // Force re-render with Code tab active
        setRenderKey(prev => prev + 1);
    };

    return (
        <Tabs defaultValue={renderKey > 0 ? 'Code' : (showDemo ? 'Demo' : 'Code')} key={renderKey}>
            <TabItem value="Demo">
                <div className="code-example-demo">
                    { children }
                    {showViewSourceButton && (
                        <div className="code-example-demo-footer">
                            { label } - <a href="#" onClick={(e) => {
                                e.preventDefault();
                                handleViewCode();
                            }}>View Code</a>
                        </div>
                    )}
                </div>
            </TabItem>
            <TabItem value="Code">
                <CodeBlock language={language} title={filename}>
                    {code}
                </CodeBlock>
            </TabItem>
        </Tabs>
    )
}

const ShadowCatcherComponent = (props) => {
    const { width = 2, depth = 2, intensity = 0.75 } = props;
    const scale = useMemo(() => new Vec3(width, 1, depth), [width, depth]);
    return <Entity position={[0, .001, 0]}>
        <Light type='directional' 
            castShadows={true} 
            normalOffsetBias={0} 
            shadowBias={0} 
            shadowDistance={16} 
            shadowResolution={1024} 
            shadowType={SHADOW_VSM_16F} 
            shadowUpdateMode={SHADOWUPDATE_REALTIME} 
            vsmBlurSize={8} 
            shadowIntensity={intensity} 
            intensity={0} />
        <Script script={ShadowCatcher} intensity={intensity} scale={scale} />
    </Entity>
}

export const Staging = ({ 
    children, 
    useLight = true, 
    useControls = false, 
    useGrid = false,
    camera = [0, 0, 10], 
}) => {
    
    const { colorMode } = useColorMode();
    const { asset: envAtlas } = useEnvAtlas('/assets/environment.png');
    const cameraColor = colorMode === 'dark' ? '#2a2a2a' : '#e4e0e0';

    return (
        <>
            <Entity name="camera" position={camera} >
                <Camera clearColor={cameraColor}/>
                { useControls && <Script script={CameraControls} /> }
            </Entity>
            { useLight && (
                <Environment envAtlas={envAtlas} showSkybox={false} />
            )}
            { useGrid && (
                <Entity name="grid" scale={[1000, 1, 1000]}>
                    <Script script={Grid} />
                    <Light type='directional' 
                        castShadows={true}
                        intensity={0.75}
                    />
                    <ShadowCatcherComponent />
                </Entity>
            )}
            { children }
        </>
    )
}