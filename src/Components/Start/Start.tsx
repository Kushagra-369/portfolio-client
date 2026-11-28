
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent, RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Stars } from "@react-three/drei";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Orbit,
  Sparkles as SparkleIcon,
  MousePointer2,
} from "lucide-react";
import type { Group, Mesh } from "three";
import { useTheme } from "../../Context/ThemeContext";
import "./Start.css";

interface StartProps {
  onStart: () => void;
}

interface PointerData {
  x: number;
  y: number;
}

interface ThemeColors {
  primary: string;
  secondary: string;
  glow: string;
  planet: string;
  atmosphere: string;
  background: string;
  text: string;
}

const THEME_COLORS: Record<"light" | "love" | "horror" | "dark", ThemeColors> = {
  light: {
    primary: "#38bdf8",
    secondary: "#93c5fd",
    glow: "#0ea5e9",
    planet: "#102c45",
    atmosphere: "#7dd3fc",
    background: "#06111d",
    text: "#effaff",
  },
  love: {
    primary: "#ff5ca8",
    secondary: "#f9a8d4",
    glow: "#ec4899",
    planet: "#3b102c",
    atmosphere: "#fb7185",
    background: "#170713",
    text: "#fff0f7",
  },
  horror: {
    primary: "#ff2929",
    secondary: "#991b1b",
    glow: "#dc2626",
    planet: "#250505",
    atmosphere: "#ef4444",
    background: "#090000",
    text: "#fff0f0",
  },
  dark: {
    primary: "#00D6A0",
    secondary: "#8FFFE0",
    glow: "#00F0B5",
    planet: "#06251D",
    atmosphere: "#20E6B2",
    background: "#020907",
    text: "#E8FFF7",
  },
};

function CelestialSystem({
  colors,
  reducedMotion,
  celestialMode,
  onToggleCelestial,
  entering,
}: {
  colors: ThemeColors;
  reducedMotion: boolean;
  celestialMode: "sun" | "moon";
  onToggleCelestial: () => void;
  entering: boolean;
}) {
  const sunGroupRef = useRef<Group>(null!);
  const planetNodesRef = useRef<Group[]>([]);
  const planetsRef = useRef<Group>(null!);
  const asteroidRef = useRef<Group>(null!);
  const blackHoleRef = useRef<Group>(null!);
  const sunRef = useRef<Mesh>(null!);
  const moonRef = useRef<Mesh>(null!);
  const isSun = celestialMode === "sun";
  const keyLight = isSun ? "#FFD36A" : "#EAF4FF";

  useFrame((_, delta) => {
    if (!reducedMotion) {
      if (planetsRef.current) planetsRef.current.rotation.y += delta * 0.045;
      if (asteroidRef.current) asteroidRef.current.rotation.y -= delta * 0.025;
      if (blackHoleRef.current) blackHoleRef.current.rotation.z += delta * 0.09;
      if (sunRef.current) sunRef.current.rotation.y += delta * 0.07;
      if (moonRef.current) moonRef.current.rotation.y += delta * 0.035;
    }

    // During entry, every celestial body converges toward the screen centre.
    if (entering) {
      const pull = 1 - Math.exp(-delta * 2.9);
      const converge = (group: Group | null) => {
        if (!group) return;
        group.position.x += (0 - group.position.x) * pull;
        group.position.y += (0 - group.position.y) * pull;
        group.position.z += (2.2 - group.position.z) * pull;
        group.scale.multiplyScalar(1 - Math.min(delta * 0.22, 0.12));
      };
      converge(sunGroupRef.current);
      converge(asteroidRef.current);
      converge(blackHoleRef.current);
      planetNodesRef.current.forEach(converge);
    }
  });

  const planets = [
    { p: [-3.65, 2.05, -1.2] as [number, number, number], r: 0.43, c: "#B98A62", rough: 0.9 },
    { p: [-2.65, -2.05, -0.8] as [number, number, number], r: 0.56, c: "#D5A06B", rough: 0.82 },
    { p: [-0.65, 2.72, -1.6] as [number, number, number], r: 0.68, c: "#397FB8", rough: 0.55 },
    { p: [2.45, 2.35, -1.3] as [number, number, number], r: 0.48, c: "#C46F4D", rough: 0.92 },
    { p: [3.25, -2.45, -1.1] as [number, number, number], r: 0.72, c: "#C9B58C", rough: 0.72 },
    { p: [0.2, -3.0, -1.8] as [number, number, number], r: 0.34, c: "#77A7C9", rough: 0.6 },
  ];

  return (
    <group>
      {/* One large star/moon at the left. Clicking transforms the same body. */}
      <group ref={sunGroupRef} position={[-5.05, 0.12, 0.15]}>
        {isSun ? (
          <>
            <mesh ref={sunRef} onPointerDown={(e) => { e.stopPropagation(); }} onClick={(e) => { e.stopPropagation(); onToggleCelestial(); }}>
              <sphereGeometry args={[1.48, 96, 96]} />
              <meshStandardMaterial color="#FFF2A6" emissive="#FF8A00" emissiveIntensity={5.8} roughness={0.22} metalness={0.02} toneMapped={false} />
            </mesh>
            {/* Hot solar corona layers */}
            <mesh scale={1.055}>
              <sphereGeometry args={[1.48, 64, 64]} />
              <meshBasicMaterial color="#FFF1A8" transparent opacity={0.24} side={2} toneMapped={false} />
            </mesh>
            <mesh scale={1.18}>
              <sphereGeometry args={[1.48, 64, 64]} />
              <meshBasicMaterial color="#FF7A00" transparent opacity={0.2} side={2} toneMapped={false} />
            </mesh>
            <mesh scale={1.34}>
              <sphereGeometry args={[1.48, 48, 48]} />
              <meshBasicMaterial color="#FFD35A" transparent opacity={0.1} side={2} toneMapped={false} />
            </mesh>
            <group rotation={[0.7, 0.25, -0.35]}>
              <mesh>
                <torusGeometry args={[1.62, 0.035, 12, 160]} />
                <meshBasicMaterial color="#FFB21C" transparent opacity={0.9} toneMapped={false} />
              </mesh>
              <mesh rotation={[0.2, 0.55, 0.4]}>
                <torusGeometry args={[1.72, 0.018, 8, 160]} />
                <meshBasicMaterial color="#FFF0A0" transparent opacity={0.72} toneMapped={false} />
              </mesh>
            </group>
            <pointLight color="#FFB52E" intensity={240} distance={34} decay={1.25} />
          </>
        ) : (
          <>
            <mesh ref={moonRef} onPointerDown={(e) => { e.stopPropagation(); }} onClick={(e) => { e.stopPropagation(); onToggleCelestial(); }}>
              <sphereGeometry args={[1.48, 96, 96]} />
              <meshStandardMaterial color="#E8EDF2" roughness={1} metalness={0.015} />
            </mesh>
            {[
              [-0.42, 0.36, 1.36, 0.24], [0.48, -0.26, 1.38, 0.19],
              [0.05, 0.68, 1.31, 0.14], [-0.62, -0.42, 1.30, 0.12],
              [0.66, 0.52, 1.30, 0.10], [-0.08, -0.72, 1.30, 0.16],
              [0.78, -0.62, 1.25, 0.08],
            ].map(([x,y,z,r], i) => (
              <mesh key={i} position={[x,y,z]}>
                <circleGeometry args={[r, 32]} />
                <meshStandardMaterial color="#AAB4BF" roughness={1} />
              </mesh>
            ))}
            <mesh scale={1.12}>
              <sphereGeometry args={[1.48, 64, 64]} />
              <meshBasicMaterial color="#DCEBFF" transparent opacity={0.09} side={2} />
            </mesh>
            <pointLight color="#DCEBFF" intensity={78} distance={22} decay={1.7} />
          </>
        )}
      </group>

      {/* Large, varied planets spread across the full viewport */}
      <group ref={planetsRef}>
        {planets.map((planet, i) => (
          <group
            key={i}
            ref={(node) => { if (node) planetNodesRef.current[i] = node; }}
            position={planet.p}
          >
            <mesh>
              <sphereGeometry args={[planet.r, 64, 64]} />
              <meshPhysicalMaterial
                color={planet.c}
                roughness={isSun ? planet.rough : Math.max(0.18, planet.rough - 0.28)}
                metalness={0.28}
                clearcoat={0.9}
                clearcoatRoughness={0.16}
                emissive={colors.glow}
                emissiveIntensity={colors.background === "#020907" ? (isSun ? 0.22 : 0.3) : (isSun ? 0.11 : 0.19)}
              />
            </mesh>
            <mesh scale={1.045}>
              <sphereGeometry args={[planet.r, 48, 48]} />
              <meshBasicMaterial color={isSun ? "#FFD99A" : "#DDEBFF"} transparent opacity={0.075} side={2} />
            </mesh>
            {(i === 2 || i === 4) && (
              <group rotation={[0.85, 0.18, 0.32]}>
                <mesh>
                  <torusGeometry args={[planet.r * 1.48, planet.r * 0.12, 12, 100]} />
                  <meshStandardMaterial color={i === 2 ? "#A9D7E8" : "#D8C39B"} roughness={0.72} metalness={0.18} />
                </mesh>
                <mesh>
                  <torusGeometry args={[planet.r * 1.68, 0.018, 8, 100]} />
                  <meshBasicMaterial color={isSun ? "#FFE0A0" : "#E7F1FF"} transparent opacity={0.62} />
                </mesh>
              </group>
            )}
          </group>
        ))}
      </group>

      {/* Broad asteroid belt, with individually modelled irregular rocks */}
      <group ref={asteroidRef} position={[0, -0.05, -2.5]} rotation={[0.52, 0.08, -0.18]}>
        {Array.from({ length: 150 }, (_, i) => {
          const a = (i / 150) * Math.PI * 2;
          const radius = 4.15 + Math.sin(i * 8.31) * 0.42;
          const size = 0.035 + ((i * 13) % 8) * 0.012;
          return (
            <mesh key={i} position={[Math.cos(a) * radius, Math.sin(i * 1.9) * 0.32, Math.sin(a) * radius * 0.48]} rotation={[i * 0.41, i * 0.73, i * 0.23]}>
              <dodecahedronGeometry args={[size, 1]} />
              <meshStandardMaterial color={i % 4 === 0 ? "#B49A7B" : "#77716B"} roughness={1} emissive={keyLight} emissiveIntensity={0.025} />
            </mesh>
          );
        })}
      </group>

      {/* The largest feature: a massive black hole with a deep event horizon */}
      <group ref={blackHoleRef} position={[5.15, -0.55, -2.0]} rotation={[0.92, 0.18, -0.12]}>
        <mesh>
          <sphereGeometry args={[1.28, 96, 96]} />
          <meshBasicMaterial color="#010104" />
        </mesh>
        <mesh scale={1.035}>
          <sphereGeometry args={[1.28, 64, 64]} />
          <meshBasicMaterial color="#080A12" transparent opacity={0.55} />
        </mesh>
        <mesh>
          <torusGeometry args={[1.83, 0.25, 24, 180]} />
          <meshStandardMaterial color={isSun ? "#F5A13C" : "#B9D8FF"} emissive={isSun ? "#FF6B1A" : "#7CAEFF"} emissiveIntensity={isSun ? 2.8 : 2.1} metalness={0.82} roughness={0.2} />
        </mesh>
        <mesh scale={[1.12, 1.12, 1.12]}>
          <torusGeometry args={[1.83, 0.075, 16, 180]} />
          <meshBasicMaterial color={isSun ? "#FFD78A" : "#E8F3FF"} transparent opacity={0.82} />
        </mesh>
        <mesh scale={[0.82, 0.82, 0.82]}>
          <torusGeometry args={[1.83, 0.12, 16, 180]} />
          <meshBasicMaterial color={isSun ? "#C95A24" : "#668BC7"} transparent opacity={0.8} />
        </mesh>
        <pointLight color={isSun ? "#FF8C32" : "#B7D4FF"} intensity={24} distance={10} />
      </group>
    </group>
  );
}

function Universe({
  pointer,
  dragRotation,
  reducedMotion,
  colors,
  celestialMode,
  onToggleCelestial,
  entering,
}: {
  pointer: RefObject<PointerData>;
  dragRotation: RefObject<PointerData>;
  reducedMotion: boolean;
  colors: ThemeColors;
  celestialMode: "sun" | "moon";
  onToggleCelestial: () => void;
  entering: boolean;
}) {
  const worldRef = useRef<Group>(null!);

  useFrame((state, delta) => {
    const targetX = pointer.current.x * 0.45;
    const targetY = pointer.current.y * 0.3;

    state.camera.position.x +=
      (targetX - state.camera.position.x) * 0.035;

    state.camera.position.y +=
      (targetY - state.camera.position.y) * 0.035;

    state.camera.lookAt(0, 0, 0);

    if (worldRef.current) {
      worldRef.current.rotation.y +=
        (dragRotation.current.x * 0.35 -
          worldRef.current.rotation.y) * 0.035;

      worldRef.current.rotation.x +=
        (dragRotation.current.y * 0.2 -
          worldRef.current.rotation.x) * 0.035;

      if (!reducedMotion) {
        worldRef.current.rotation.y += delta * 0.008;
      }
    }
  });

  return (
    <>
      <color attach="background" args={[colors.background]} />
      <fog attach="fog" args={[colors.background, 8, 19]} />

      <ambientLight intensity={0.22} />

      <Stars
        radius={90}
        depth={55}
        count={1400}
        factor={3}
        saturation={0.15}
        fade
        speed={reducedMotion ? 0 : 0.35}
      />

      <Sparkles
        count={100}
        scale={13}
        size={2.2}
        speed={reducedMotion ? 0 : 0.25}
        opacity={0.65}
        color={colors.primary}
      />

      <Sparkles
        count={50}
        scale={8}
        size={1.5}
        speed={reducedMotion ? 0 : 0.15}
        opacity={0.35}
        color={colors.secondary}
      />

      <group ref={worldRef}>
        <CelestialSystem
          colors={colors}
          reducedMotion={reducedMotion}
          celestialMode={celestialMode}
          onToggleCelestial={onToggleCelestial}
          entering={entering}
        />
      </group>
    </>
  );
}

/**
 * Mount this behind the routed pages in App.tsx to keep the same 3D universe
 * alive after the intro screen unmounts. Keep it inside the ThemeProvider.
 */
export function PersistentUniverseBackground() {
  const { theme } = useTheme();
  const colors = THEME_COLORS[theme];
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <div className="persistent-universe-background" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.35]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      >
        <color attach="background" args={[colors.background]} />
        <ambientLight intensity={0.42} />
        <pointLight position={[-1, 1, 2]} color="#ffb45e" intensity={7} distance={9} />
        <Stars radius={80} depth={45} count={950} factor={2.5} fade speed={reducedMotion ? 0 : 0.18} />
        <CelestialSystem
          colors={colors}
          reducedMotion={reducedMotion}
          celestialMode="sun"
          onToggleCelestial={() => {}}
          entering={false}
        />
      </Canvas>
    </div>
  );
}

export default function Start({ onStart }: StartProps) {
  const { theme } = useTheme();
  const colors = THEME_COLORS[theme];
  const reducedMotion = useReducedMotion() ?? false;

  const pointer = useRef<PointerData>({ x: 0, y: 0 });
  const dragRotation = useRef<PointerData>({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const previousPointer = useRef<PointerData>({ x: 0, y: 0 });

  const [celestialMode, setCelestialMode] = useState<"sun" | "moon">("sun");
  const [entering, setEntering] = useState(false);
  const [dragging, setDragging] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handlePointerMove = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();

    pointer.current = {
      x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      y: -(((event.clientY - rect.top) / rect.height) * 2 - 1),
    };

    if (isDragging.current) {
      const dx = event.clientX - previousPointer.current.x;
      const dy = event.clientY - previousPointer.current.y;

      dragRotation.current.x += dx * 0.003;
      dragRotation.current.y += dy * 0.003;

      previousPointer.current = {
        x: event.clientX,
        y: event.clientY,
      };
    }
  };

  const handlePointerDown = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    if (
      event.target instanceof HTMLElement &&
      event.target.closest("button")
    ) return;

    isDragging.current = true;
    setDragging(true);

    previousPointer.current = {
      x: event.clientX,
      y: event.clientY,
    };

  };

  const handlePointerUp = () => {
    isDragging.current = false;
    setDragging(false);
  };

  const enterPortfolio = () => {
    if (entering) return;

    setEntering(true);

    timerRef.current = setTimeout(() => {
      onStart();
    }, 1850);
  };

  useEffect(() => {
    const handleAutomaticStart = () => enterPortfolio();

    window.addEventListener("portfolio-start-request", handleAutomaticStart);
    return () => {
      window.removeEventListener("portfolio-start-request", handleAutomaticStart);
    };
  }, [entering]);

  return (
    <main
      className={`start-universe theme-${theme} ${
        entering ? "is-entering" : ""
      }`}
      style={{
        "--universe-primary": colors.primary,
        "--universe-secondary": colors.secondary,
        "--universe-glow": colors.glow,
        "--universe-background": colors.background,
        "--universe-text": colors.text,
      } as CSSProperties}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className="universe-canvas">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
          }}
        >
          <Universe
            pointer={pointer}
            dragRotation={dragRotation}
            reducedMotion={reducedMotion}
            colors={colors}
            celestialMode={celestialMode}
            onToggleCelestial={() => setCelestialMode((mode) => mode === "sun" ? "moon" : "sun")}
            entering={entering}
          />
        </Canvas>
      </div>

      <div className="universe-vignette" />
      <div className="universe-grid" />
      <motion.div className="universe-collision-flash" animate={entering ? { opacity: [0, 0.15, 1], scale: [0.2, 0.8, 2.8] } : { opacity: 0, scale: 0.2 }} transition={{ duration: reducedMotion ? 0.1 : 1.55, ease: "easeIn" }} />

      <header className="universe-header">
        <div className="universe-brand">
          <span className="brand-indicator" />
          KUSHAGRA.DEV
        </div>

        <div className="universe-status">
          <span className="status-dot" />
          SYSTEM ONLINE
        </div>
      </header>

      <section className="universe-content">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="universe-eyebrow"
        >
          <SparkleIcon size={15} />
          WELCOME TO MY DIGITAL UNIVERSE
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="universe-title"
        >
          KUSHAGRA
          <span>CHHABRA</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="universe-description"
        >
          Full Stack Developer · AI Enthusiast · Creative Engineer
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="universe-stats"
        >
          <div>
            <strong>10+</strong>
            <span>PROJECTS</span>
          </div>

          <div>
            <strong>15+</strong>
            <span>TECHNOLOGIES</span>
          </div>

          <div>
            <strong>∞</strong>
            <span>POSSIBILITIES</span>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          whileHover={reducedMotion ? {} : { scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={enterPortfolio}
          disabled={entering}
          className="universe-enter"
        >
          <span>
            {entering ? "ENTERING UNIVERSE..." : "ENTER UNIVERSE"}
          </span>
          <ArrowRight size={19} />
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="universe-hint"
        >
          <MousePointer2 size={14} />
          {dragging
            ? "ROTATING UNIVERSE..."
            : "DRAG TO EXPLORE · CLICK TO ENTER"}
        </motion.div>
      </section>

      <footer className="universe-footer">
        <div>
          <Orbit size={15} />
          <span>EXPLORING DIGITAL SPACE</span>
        </div>

        <div className="universe-coordinate">
          SECTOR 369 · EARTH
        </div>
      </footer>

      <motion.div
        className="universe-warp"
        initial={{
          opacity: 0,
          scale: 0.2,
          x: "-50%",
          y: "-50%",
        }}
        animate={
          entering
            ? {
                opacity: 1,
                scale: 2.5,
                x: "-50%",
                y: "-50%",
              }
            : {
                opacity: 0,
                scale: 0.2,
                x: "-50%",
                y: "-50%",
              }
        }
        transition={{
          duration: reducedMotion ? 0.1 : 1,
          ease: [0.7, 0, 0.2, 1],
        }}
      />

      {entering && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="universe-enter-message"
        >
          INITIALIZING PORTFOLIO
        </motion.div>
      )}
    </main>
  );
}
