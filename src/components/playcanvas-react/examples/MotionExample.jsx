import { useEffect, useRef, useState } from 'react';
import { Application, Entity } from '@playcanvas/react';
import { Camera, Environment, Light, Render, Script } from '@playcanvas/react/components';
import { useApp, useEnvAtlas } from '@playcanvas/react/hooks';
import { animate, useMotionValue, useMotionValueEvent, useSpring, useTransform } from 'motion/react';
import { EVENT_MOUSEMOVE, Script as PcScript, Vec2 } from 'playcanvas';
import StaticPostEffects from '../PostEffects';

// ↑ imports hidden

/**
 * Three spring values that animate together as an [x, y, z] array.
 */
const useMotionVec3 = (initial, defaultValue = 0) => {
  const x = useSpring(initial?.[0] ?? defaultValue);
  const y = useSpring(initial?.[1] ?? defaultValue);
  const z = useSpring(initial?.[2] ?? defaultValue);

  const array = useTransform([x, y, z], ([xVal, yVal, zVal]) => [xVal, yVal, zVal]);

  const animateArray = (target) => {
    if (!target) return;
    x.set(target[0] ?? x.get());
    y.set(target[1] ?? y.get());
    z.set(target[2] ?? z.get());
  };

  return { array, animateArray };
};

/**
 * An Entity whose position, rotation and scale spring toward the values
 * passed in the `animate` prop, driven by Motion spring values.
 */
const MotionEntity = ({ children, animate: animateProps, ...props }) => {
  const position = useMotionVec3(props.position, 0);
  const rotation = useMotionVec3(props.rotation, 0);
  const scale = useMotionVec3(props.scale, 1);

  const entityRef = useRef(null);

  useEffect(() => {
    if (animateProps) {
      position.animateArray(animateProps.position);
      rotation.animateArray(animateProps.rotation);
      scale.animateArray(animateProps.scale);
    }
  }, [animateProps]);

  useMotionValueEvent(position.array, 'change', ([x, y, z]) => {
    entityRef.current?.setLocalPosition(x, y, z);
  });

  useMotionValueEvent(rotation.array, 'change', ([x, y, z]) => {
    entityRef.current?.setLocalEulerAngles(x, y, z);
  });

  useMotionValueEvent(scale.array, 'change', ([x, y, z]) => {
    entityRef.current?.setLocalScale(x, y, z);
  });

  return (
    <Entity
      ref={entityRef}
      {...props}
      position={position.array.get()}
      rotation={rotation.array.get()}
      scale={scale.array.get()}
    >
      {children}
    </Entity>
  );
};

/**
 * Applies an animated motion value to the light's intensity every frame.
 */
class LightIntensityScript extends PcScript {
  static scriptName = 'lightIntensity';

  intensityMV = null;

  update() {
    if (this.entity.light && this.intensityMV) {
      this.entity.light.intensity = this.intensityMV.get();
    }
  }
}

/**
 * A light whose intensity animates toward the `intensity` prop. A motion
 * value tweens the intensity and a script applies it to the light every frame.
 */
const MotionLight = ({ intensity = 1, type = 'directional', transition = { duration: 0.2 }, ...props }) => {
  const intensityMV = useMotionValue(intensity);

  useEffect(() => {
    animate(intensityMV, intensity, transition);
  }, [intensity]);

  return (
    <>
      <Script script={LightIntensityScript} intensityMV={intensityMV} />
      <Light {...props} type={type} />
    </>
  );
};

/**
 * Rotates the entity toward the pointer position.
 */
class MouseRotatesEntity extends PcScript {
  static scriptName = 'mouseRotatesEntity';

  initialize() {
    this.target = new Vec2();
    this.current = new Vec2();
    this.handleMouseMove = (e) => {
      // Normalize the pointer position to [-1, 1] and map it to degrees
      const canvas = this.app.graphicsDevice.canvas;
      this.target.set(
        (e.x / canvas.clientWidth) * 2 - 1,
        (e.y / canvas.clientHeight) * 2 - 1
      ).mulScalar(15);
    };
    this.app.mouse?.on(EVENT_MOUSEMOVE, this.handleMouseMove);
  }

  destroy() {
    this.app.mouse?.off(EVENT_MOUSEMOVE, this.handleMouseMove);
  }

  update(dt) {
    this.current.lerp(this.current, this.target, 0.4 * dt);
    this.entity.setEulerAngles(this.current.y, this.current.x, 0);
  }
}

const MotionScene = () => {
  const app = useApp();
  const { asset: envAtlas } = useEnvAtlas('/assets/environment.png');

  const [hovered, setHovered] = useState(false);

  const setCursor = (cursor) => {
    app.graphicsDevice.canvas.style.cursor = cursor;
  };

  const onPointerOver = () => {
    setCursor('pointer');
    setHovered(true);
  };

  const onPointerOut = () => {
    setCursor('auto');
    setHovered(false);
  };

  if (!envAtlas) {
    return null;
  }

  const rotation = [0, 0, 90];
  const scale = hovered ? [1.2, 1.2, 1.2] : [1, 1, 1];

  return (
    <Entity>
      <Entity name="camera" position={[0, 0, 5]}>
        <Camera fov={45} />
        <StaticPostEffects />
        <MotionLight intensity={hovered ? 1.3 : 0.3} />
      </Entity>

      {/* Create some environment lighting */}
      <Environment envAtlas={envAtlas} showSkybox={false} skyboxIntensity={0.4} />

      {/* Create some additional lighting */}
      <Entity rotation={[0, -45, 23]}>
        <MotionLight intensity={hovered ? 1.3 : 0.3} color="red" />
      </Entity>
      <Entity rotation={[0, -45, -23]}>
        <MotionLight intensity={hovered ? 1.3 : 0.3} color="blue" />
      </Entity>

      {/* Create a capsule button that animates when hovered */}
      <MotionEntity
        name="button"
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        animate={{ rotation, scale }}
      >
        <Render type="capsule" />

        {/* Create a decoration that animates when hovered */}
        <MotionEntity
          name="decoration"
          scale={[0, 0, 0]}
          animate={{
            scale: hovered ? [0.5, 0.5, 0.5] : [0, 0, 0],
            position: hovered ? [0, 0, 0] : [0, 0, -1]
          }}
        >
          <Script script={MouseRotatesEntity} />
          <Entity position={[2, 1.9, -1]} rotation={[23, -34, 45]} scale={[0.8, 0.8, 0.8]}>
            <Render type="box" />
          </Entity>
          <Entity position={[-2, -1.8, -1]} rotation={[43, 34, 0]} scale={[0.8, 0.8, 0.8]}>
            <Render type="torus" />
          </Entity>
          <Entity position={[1.9, 0, -3]} scale={[0.8, 0.8, 0.8]}>
            <Render type="sphere" />
          </Entity>
          <Entity position={[-1.9, 0, -1]} scale={[0.8, 0.8, 0.8]}>
            <Render type="cone" />
          </Entity>
        </MotionEntity>
      </MotionEntity>

      {/* A soft gradient glow that fades in on hover */}
      <div
        style={{
          position: 'absolute',
          inset: '15%',
          pointerEvents: 'none',
          transition: 'opacity 0.5s',
          opacity: hovered ? 0.5 : 0,
          background: 'linear-gradient(to top right, #a855f7, #ec4899, #f97316)',
          filter: 'blur(100px)'
        }}
      />

      {/* The headline overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none'
        }}
      >
        <h1
          style={{
            color: '#fff',
            fontSize: '3.5rem',
            fontWeight: 700,
            margin: 0,
            transition: 'all 0.3s',
            transform: `scale(${hovered ? 1.2 : 1})`,
            opacity: hovered ? 0.8 : 1
          }}
        >
          Hover
        </h1>
      </div>
    </Entity>
  );
};

const MotionExample = () => (
  <Application>
    <MotionScene />
  </Application>
);

export default MotionExample;
