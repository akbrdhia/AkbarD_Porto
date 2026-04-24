import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree, extend, useLoader } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useScroll, useVelocity, useSpring } from 'framer-motion';

// Custom Shader Material
const LiquidMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uTime: 0,
    uStrength: 0,
    uResolution: new THREE.Vector2(0, 0),
    uTextureResolution: new THREE.Vector2(0, 0),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uStrength;
    uniform vec2 uResolution;
    uniform vec2 uTextureResolution;
    varying vec2 vUv;

    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
        dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      vec2 uvCorrected = uv;
      
      if (uTextureResolution.x > 0.0 && uResolution.x > 0.0) {
        float s = uResolution.x / uResolution.y;
        float rs = uTextureResolution.x / uTextureResolution.y;
        if (s > rs) {
          uvCorrected.y = uv.y * (rs / s) + (1.0 - rs / s) * 0.5;
        } else {
          uvCorrected.x = uv.x * (s / rs) + (1.0 - s / rs) * 0.5;
        }
      }

      float noise = snoise(uvCorrected * 2.0 + uTime * 0.2);
      float noise2 = snoise(uvCorrected * 4.0 - uTime * 0.1);
      vec2 displacement = vec2(noise, noise2) * uStrength * 0.1;
      
      vec4 color = texture2D(uTexture, uvCorrected + displacement);
      
      // Grayscale conversion
      float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      
      // Contrast
      gray = pow(gray, 1.2);

      gl_FragColor = vec4(vec3(gray), 1.0);
    }
  `
);

extend({ LiquidMaterial });

const Scene = ({ velocity }) => {
  const meshRef = useRef();
  const { viewport, size } = useThree();
  
  // Use standard TextureLoader for more control
  const texture = useLoader(THREE.TextureLoader, '/about-portrait.jpg');

  useEffect(() => {
    if (texture) {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.needsUpdate = true;
    }
  }, [texture]);

  useFrame((state) => {
    if (meshRef.current && meshRef.current.material) {
      const mat = meshRef.current.material;
      mat.uTime = state.clock.elapsedTime;
      mat.uStrength = Math.min(Math.abs(velocity.get()) / 2000, 0.4);
      mat.uResolution.set(size.width, size.height);
      mat.uTextureResolution.set(texture.image.width, texture.image.height);
      mat.uTexture = texture;
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <liquidMaterial ref={meshRef} transparent />
    </mesh>
  );
};

const LiquidHero = () => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  return (
    <div className="w-full h-full bg-black">
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Scene velocity={smoothVelocity} />
      </Canvas>
    </div>
  );
};

export default LiquidHero;
