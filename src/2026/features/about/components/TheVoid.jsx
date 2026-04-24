import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleBackground = () => {
  const count = 2000;
  const meshRef = useRef();
  const mouse = useRef(new THREE.Vector2(0, 0));

  const [positions, sizes, opacities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const s = new Float32Array(count);
    const o = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2;
      s[i] = Math.random() * 2;
      o[i] = Math.random() * 0.5;
    }
    return [pos, s, o];
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.z = time * 0.05;
    
    // Mouse interaction logic
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, (state.mouse.x * state.viewport.width) / 2, 0.1);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, (state.mouse.y * state.viewport.height) / 2, 0.1);
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: mouse.current },
        }}
        vertexShader={`
          attribute float size;
          varying float vOpacity;
          uniform vec2 uMouse;
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            float dist = distance(position.xy, uMouse);
            float force = smoothstep(2.0, 0.0, dist);
            gl_PointSize = size * (30.0 / -mvPosition.z) * (1.0 + force * 2.0);
            gl_Position = projectionMatrix * mvPosition;
            vOpacity = 0.1 + force * 0.5;
          }
        `}
        fragmentShader={`
          varying float vOpacity;
          void main() {
            float d = distance(gl_PointCoord, vec2(0.5));
            if (d > 0.5) discard;
            gl_FragColor = vec4(1.0, 1.0, 1.0, vOpacity * (1.0 - d * 2.0));
          }
        `}
      />
    </points>
  );
};

const TheVoid = ({ children }) => {
  return (
    <div className="relative w-full min-h-screen bg-black">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ParticleBackground />
        </Canvas>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default TheVoid;
