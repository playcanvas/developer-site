
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import './CodeExample.css';
import CodeBlock from '@theme/CodeBlock';
import { useState, useMemo, useCallback, useEffect, createContext, useContext } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { Leva } from 'leva'

// playcanvas-react
import { Entity } from '@playcanvas/react';
import { Camera,  Environment, Script, Light } from '@playcanvas/react/components';
import { useEnvAtlas, useApp } from '@playcanvas/react/hooks';

// playcanvas
import { CameraControls } from 'playcanvas/scripts/esm/camera-controls.mjs';
import { Grid } from 'playcanvas/scripts/esm/grid.mjs';
import { ShadowCatcher } from 'playcanvas/scripts/esm/shadow-catcher.mjs';
import { Vec2, Vec3, SHADOW_VSM_16F, SHADOWUPDATE_REALTIME } from 'playcanvas';

// If the code contains this regex, only display the code after it, otherwise display the entire code
const CODE_SPLIT = '// ↑ imports hidden';

export const CodeExample = ({ 
    code, 
    label, 
    filename, 
    language = 'jsx', 
    showDemo = false, 
    showViewSourceButton = true,
    showControls = true,
    children, 
}) => {
    const [renderKey, setRenderKey] = useState(0);

    if (!children || !code) {
        console.error('CodeExample: code and children are required');
        return null;
    }

    const handleViewCode = () => setRenderKey(prev => prev + 1);

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
                    <div className="code-example-controls">
                        <Leva fill hidden={showControls === false}/>
                    </div>
                </div>
            </TabItem>
            <TabItem value="Code">
                <CodeBlock language={language} title={filename}>
                    {code.includes(CODE_SPLIT) ? CODE_SPLIT + code.split(CODE_SPLIT)[1] : code}
                </CodeBlock>
            </TabItem>
        </Tabs>
    )
}

const ShadowCatcherComponent = (props) => {
    const { width = 8, depth = 8, intensity = 0.75 } = props;
    const scale = useMemo(() => new Vec3(width, 1, depth), [width, depth]);
    return <Entity>
        <Light type='directional' 
            castShadows={true} 
            normalOffsetBias={0} 
            shadowas={0} 
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
    useShadow = false,
    camera = [0, 0, 10], 
    sceneOffset = [0, -0.501, 0],
    exposure = 1.0
}) => {
    const { colorMode } = useColorMode();
    
    const app = useApp();
    const { asset: envAtlas } = useEnvAtlas('/assets/helipad.png');
    const cameraColor = colorMode === 'dark' ? '#2a2a2a' : '#e4e0e0';

     const [isPointerDown, setIsPointerDown] = useState(false);
    const [isOverEntity, setIsOverEntity] = useState(false);

    const onPointerDown = useCallback(() => setIsPointerDown(true), []);
    const onPointerUp = useCallback(() => setIsPointerDown(false), []);
    const onPointerOver = useCallback(() => setIsOverEntity(true), []);
    const onPointerOut = useCallback(() => setIsOverEntity(false), []);

    // Single effect that reacts to state changes
    useEffect(() => {
        const canvas = app.graphicsDevice.canvas;
        if (isPointerDown) {
            canvas.style.cursor = 'grabbing';
        } else if (isOverEntity) {
            canvas.style.cursor = 'grab';
        } else {
            canvas.style.cursor = 'default';
        }
    }, [isPointerDown, isOverEntity, app]);

    useEffect(() => {
        const onPointerUp = () => setIsPointerDown(false);
        app.graphicsDevice.canvas.addEventListener('pointerup', onPointerUp);
        return () => app.graphicsDevice?.canvas.removeEventListener('pointerup', onPointerUp);
    }, [app]);

    return (
        <Entity>
            <Entity name="camera" position={camera} >
                <Camera clearColor={cameraColor} renderSceneColorMap={true}/>
                { useControls && <Script script={CameraControls} enableFly={false} pitchRange={new Vec2(-90, -5)} /> }
            </Entity>
            { useLight && (
                <Environment envAtlas={envAtlas} showSkybox={false} exposure={exposure}/>
            )}
            { useGrid && (
                <Entity name="grid" scale={[1000, 1, 1000]} position={[0, -0.5, 0]}>
                    <Script script={Grid} />
                </Entity>
            )}
            { useShadow && (
                <Entity position={sceneOffset}>
                    <ShadowCatcherComponent />
                </Entity>
            )}
            <Entity 
                onPointerOver={onPointerOver} 
                onPointerOut={onPointerOut} 
                onPointerDown={onPointerDown} 
                onPointerUp={onPointerUp}>
                { children }
            </Entity>
        </Entity>
    )
}