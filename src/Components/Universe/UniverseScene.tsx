import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Group, Mesh } from "three";
import type { ThemeColors } from "./themeColors";

const DS = THREE.DoubleSide;
const ADD = THREE.AdditiveBlending;

/* ============================================================
   PLANET — dark emerald body + additive glow shells (SHINY)
   ============================================================ */
export function Planet({
  colors,
  reducedMotion,
  position = [0, 0, 0],
  radius = 0.9,
  tilt = 0.3,
  ring = true,
}: {
  colors: ThemeColors;
  reducedMotion: boolean;
  position?: [number, number, number];
  radius?: number;
  tilt?: number;
  ring?: boolean;
}) {
  const bodyRef = useRef<Mesh>(null!);
  const ringRef = useRef<Group>(null!);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    if (bodyRef.current) bodyRef.current.rotation.y += delta * 0.08;
    if (ringRef.current) ringRef.current.rotation.z += delta * 0.03;
  });

  return (
    <group position={position} rotation={[tilt, tilt * 0.6, 0]}>
      {/* body — metallic, catches sunlight = highlight side shiny */}
      <mesh ref={bodyRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          color="#0a3d2a"
          roughness={0.32}
          metalness={0.82}
          emissive={colors.primary}
          emissiveIntensity={0.55}
          toneMapped={false}
        />
      </mesh>

      {/* inner bright rim (additive = pure glow that ignores lighting) */}
      <mesh>
        <sphereGeometry args={[radius * 1.03, 48, 48]} />
        <meshBasicMaterial
          color={colors.primary}
          toneMapped={false}
          transparent
          opacity={0.32}
          side={DS}
          blending={ADD}
          depthWrite={false}
        />
      </mesh>

      {/* outer soft halo */}
      <mesh>
        <sphereGeometry args={[radius * 1.32, 32, 32]} />
        <meshBasicMaterial
          color={colors.glow}
          toneMapped={false}
          transparent
          opacity={0.1}
          side={DS}
          blending={ADD}
          depthWrite={false}
        />
      </mesh>

      {/* rings */}
      {ring && (
        <group ref={ringRef} rotation={[1.15, 0, 0.2]}>
          {[radius * 1.4, radius * 1.55].map((r, i) => (
            <mesh key={r}>
              <torusGeometry args={[r, radius * 0.015, 8, 96]} />
              <meshBasicMaterial
                color={i === 0 ? colors.primary : colors.secondary}
                toneMapped={false}
                transparent
                opacity={i === 0 ? 0.75 : 0.35}
                blending={ADD}
                depthWrite={false}
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}

/* ============================================================
   SUN — fully self-illuminated, additive corona
   ============================================================ */
function SunBody({
  colors,
  reducedMotion,
}: {
  colors: ThemeColors;
  reducedMotion: boolean;
}) {
  const coreRef = useRef<Mesh>(null!);
  const coronaRef = useRef<Mesh>(null!);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    if (coreRef.current) coreRef.current.rotation.y += delta * 0.14;
    if (coronaRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.3) * 0.045;
      coronaRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      {/* white-hot core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.95, 48, 48]} />
        <meshBasicMaterial color={colors.sunCore} toneMapped={false} />
      </mesh>

      {/* bright yellow surface */}
      <mesh>
        <sphereGeometry args={[1.02, 48, 48]} />
        <meshBasicMaterial color={colors.sun} toneMapped={false} />
      </mesh>

      {/* orange fire layer */}
      <mesh>
        <sphereGeometry args={[1.13, 32, 32]} />
        <meshBasicMaterial
          color="#ff9900"
          toneMapped={false}
          transparent
          opacity={0.55}
          side={DS}
          blending={ADD}
          depthWrite={false}
        />
      </mesh>

      {/* orange-red glow */}
      <mesh>
        <sphereGeometry args={[1.33, 32, 32]} />
        <meshBasicMaterial
          color="#ff6600"
          toneMapped={false}
          transparent
          opacity={0.28}
          side={DS}
          blending={ADD}
          depthWrite={false}
        />
      </mesh>

      {/* red corona (pulsing) */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[1.62, 24, 24]} />
        <meshBasicMaterial
          color="#ff3300"
          toneMapped={false}
          transparent
          opacity={0.14}
          side={DS}
          blending={ADD}
          depthWrite={false}
        />
      </mesh>

      {/* ultimate outer glow */}
      <mesh>
        <sphereGeometry args={[2, 20, 20]} />
        <meshBasicMaterial
          color="#ff2200"
          toneMapped={false}
          transparent
          opacity={0.05}
          side={DS}
          blending={ADD}
          depthWrite={false}
        />
      </mesh>

      {/* strong warm light */}
      <pointLight color="#ffcc44" intensity={45} distance={30} decay={1.5} />
    </group>
  );
}

/* ============================================================
   MOON — whitish body with dark craters + cool glow
   ============================================================ */
const MOON_CRATERS = [
  { theta: 0.4, phi: 0.6, size: 0.2 },
  { theta: 1.5, phi: 0.9, size: 0.14 },
  { theta: 2.8, phi: 0.5, size: 0.18 },
  { theta: 4.0, phi: 1.2, size: 0.12 },
  { theta: 5.2, phi: 0.7, size: 0.16 },
  { theta: 0.9, phi: 2.1, size: 0.1 },
  { theta: 3.3, phi: 2.4, size: 0.13 },
  { theta: 5.7, phi: 1.8, size: 0.11 },
  { theta: 2.0, phi: 1.5, size: 0.15 },
  { theta: 4.6, phi: 2.0, size: 0.09 },
];

function sphericalToCartesian(theta: number, phi: number, r: number) {
  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  ] as [number, number, number];
}

function MoonBody({
  colors,
  reducedMotion,
}: {
  colors: ThemeColors;
  reducedMotion: boolean;
}) {
  const ref = useRef<Group>(null!);
  useFrame((_, delta) => {
    if (reducedMotion || !ref.current) return;
    ref.current.rotation.y += delta * 0.06;
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial
          color={colors.moon}
          roughness={0.92}
          metalness={0.02}
          emissive="#8a9aa8"
          emissiveIntensity={0.18}
          toneMapped={false}
        />
      </mesh>

      {/* cool glow halo */}
      <mesh>
        <sphereGeometry args={[1.08, 32, 32]} />
        <meshBasicMaterial
          color="#e0e8f0"
          toneMapped={false}
          transparent
          opacity={0.18}
          side={DS}
          blending={ADD}
          depthWrite={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.4, 24, 24]} />
        <meshBasicMaterial
          color="#c0d0e0"
          toneMapped={false}
          transparent
          opacity={0.06}
          side={DS}
          blending={ADD}
          depthWrite={false}
        />
      </mesh>

      {/* craters */}
      {MOON_CRATERS.map((c, i) => {
        const pos = sphericalToCartesian(c.theta, c.phi, 0.97);
        return (
          <mesh key={i} position={pos} scale={c.size}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
              color={colors.moonCrater}
              roughness={1}
              metalness={0}
            />
          </mesh>
        );
      })}

      <pointLight color="#ddeeff" intensity={30} distance={25} decay={1.5} />
    </group>
  );
}

/* ============================================================
   SUN / MOON TOGGLE WRAPPER
   ============================================================ */
export function SunMoon({
  colors,
  reducedMotion,
  isSun,
  onToggle,
  position = [0, 0, 0],
  scale = 2,
}: {
  colors: ThemeColors;
  reducedMotion: boolean;
  isSun: boolean;
  onToggle: () => void;
  position?: [number, number, number];
  scale?: number;
}) {
  const ref = useRef<Group>(null!);
  const scaleRef = useRef(1);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const target = hovered ? 1.06 : 1;
    scaleRef.current += (target - scaleRef.current) * Math.min(delta * 8, 1);
    ref.current.scale.setScalar(scale * scaleRef.current);
  });

  return (
    <group
      ref={ref}
      position={position}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {isSun ? (
        <SunBody colors={colors} reducedMotion={reducedMotion} />
      ) : (
        <MoonBody colors={colors} reducedMotion={reducedMotion} />
      )}
    </group>
  );
}

/* ============================================================
   BLACK HOLE — bright additive accretion + inward-sucking particles
   ============================================================ */
function SuckedParticles({
  colors,
  reducedMotion,
  count = 36,
}: {
  colors: ThemeColors;
  reducedMotion: boolean;
  count?: number;
}) {
  const refs = useRef<(Mesh | null)[]>([]);
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        offset: i / count + Math.random() * 0.04,
        speed: 0.08 + Math.random() * 0.04,
        yBias: (Math.random() - 0.5) * 1.1,
      })),
    [count]
  );

  useFrame((state) => {
    if (reducedMotion) return;
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const { offset, speed, yBias } = seeds[i];
      const t = (state.clock.elapsedTime * speed + offset) % 1;
      const angle = t * Math.PI * 10;
      const radius = 4.5 * (1 - t * 0.9);
      mesh.position.set(
        Math.cos(angle) * radius,
        yBias * (1 - t) * 1.0 + Math.sin(angle * 0.7) * 0.35 * (1 - t),
        Math.sin(angle) * radius * 0.65
      );
      const s = 0.06 * (1 - t * 0.9) + 0.004;
      mesh.scale.setScalar(s);
    });
  });

  return (
    <group>
      {seeds.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={colors.primary} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

export function BlackHole({
  colors,
  reducedMotion,
  position = [0, 0, 0],
  scale = 1,
}: {
  colors: ThemeColors;
  reducedMotion: boolean;
  position?: [number, number, number];
  scale?: number;
}) {
  const diskRef = useRef<Group>(null!);
  const innerRef = useRef<Group>(null!);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    if (diskRef.current) diskRef.current.rotation.z += delta * 0.24;
    if (innerRef.current) innerRef.current.rotation.z -= delta * 0.18;
  });

  return (
    <group position={position} scale={scale}>
      {/* pure black event horizon */}
      <mesh>
        <sphereGeometry args={[0.88, 64, 64]} />
        <meshBasicMaterial color="#000000" toneMapped={false} />
      </mesh>

      {/* bright emerald photon ring */}
      <mesh>
        <sphereGeometry args={[0.92, 48, 48]} />
        <meshBasicMaterial
          color={colors.primary}
          toneMapped={false}
          transparent
          opacity={0.85}
          side={DS}
          blending={ADD}
          depthWrite={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.08, 48, 48]} />
        <meshBasicMaterial
          color={colors.glow}
          toneMapped={false}
          transparent
          opacity={0.35}
          side={DS}
          blending={ADD}
          depthWrite={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.32, 32, 32]} />
        <meshBasicMaterial
          color={colors.glow}
          toneMapped={false}
          transparent
          opacity={0.1}
          side={DS}
          blending={ADD}
          depthWrite={false}
        />
      </mesh>

      {/* accretion disk — 5 bright rings */}
      <group ref={diskRef} rotation={[1.35, 0.15, 0]}>
        {[1.3, 1.62, 1.95, 2.3, 2.65].map((r, i) => (
          <mesh key={r}>
            <torusGeometry args={[r, 0.02 + i * 0.006, 8, 128]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? colors.primary : colors.glow}
              toneMapped={false}
              transparent
              opacity={0.85 - i * 0.12}
              blending={ADD}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      {/* inner hot ring */}
      <group ref={innerRef} rotation={[1.3, 0.2, 0.4]}>
        <mesh>
          <torusGeometry args={[1.18, 0.03, 8, 96]} />
          <meshBasicMaterial
            color="#ffffff"
            toneMapped={false}
            transparent
            opacity={0.6}
            blending={ADD}
            depthWrite={false}
          />
        </mesh>
      </group>

      <pointLight color={colors.primary} intensity={12} distance={14} />

      <SuckedParticles colors={colors} reducedMotion={reducedMotion} count={36} />
    </group>
  );
}

/* ============================================================
   ASTEROID BELT — brighter emissive
   ============================================================ */
export function Asteroids({
  colors,
  reducedMotion,
  count = 34,
  radiusInner = 6,
  radiusOuter = 10,
}: {
  colors: ThemeColors;
  reducedMotion: boolean;
  count?: number;
  radiusInner?: number;
  radiusOuter?: number;
}) {
  const ref = useRef<Group>(null!);

  const asteroids = useMemo(
    () =>
      Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const r = radiusInner + Math.random() * (radiusOuter - radiusInner);
        return {
          position: [
            Math.cos(angle) * r,
            (Math.random() - 0.5) * 3,
            Math.sin(angle) * r,
          ] as [number, number, number],
          scale: 0.06 + Math.random() * 0.08,
          rot: Math.random() * Math.PI * 2,
        };
      }),
    [count, radiusInner, radiusOuter]
  );

  useFrame((_, delta) => {
    if (reducedMotion) return;
    if (ref.current) ref.current.rotation.y += delta * 0.025;
  });

  return (
    <group ref={ref}>
      {asteroids.map((a, i) => (
        <mesh
          key={i}
          position={a.position}
          scale={a.scale}
          rotation={[a.rot, a.rot * 0.7, a.rot * 0.3]}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#0a2018"
            roughness={0.85}
            metalness={0.5}
            emissive={colors.glow}
            emissiveIntensity={0.9}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}