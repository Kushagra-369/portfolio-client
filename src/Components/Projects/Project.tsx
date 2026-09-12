import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import type { MotionValue, Variants } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Github, ExternalLink } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

// ==================== Types ====================
interface ProfilePhoto {
  _id: string;
  public_id: string;
  secure_url: string;
}

interface Project {
  _id: string;
  profilePhoto?: ProfilePhoto;
  name: string;
  description: string;
  tools: string[];
  githubLink: string;
  deploymentLink: string;
  category: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

type ShapeKind = "crystal" | "ring" | "diamond" | "hexagon" | "dot";

interface ShapeDef {
  id: number;
  x: string;
  y: string;
  size: number;
  depth: number;
  color: string;
  kind: ShapeKind;
  rotation: number;
  duration: number;
  delay: number;
}

// ==================== Static project data ====================
const staticProjects: Project[] = [
  {
    _id: "6910c9d084a2c11a9b7f6ab5",
    profilePhoto: {
      _id: "6910c9d084a2c11a9b7f6ab6",
      public_id: "course/j1ucqrbg3llkgmczxp76",
      secure_url: "https://res.cloudinary.com/dynodadq0/image/upload/v1762707919/course/j1ucqrbg3llkgmczxp76.jpg",
    },
    name: "Sekiro",
    description: "A cinematic landing page inspired by Sekiro: Shadows Die Twice — focusing on immersive design and smooth animations.",
    tools: ["Css", "JavaScipt", "Framer-Motion", "React"],
    githubLink: "https://github.com/Kushagra-369/Sekiro",
    deploymentLink: "https://sekiro.vercel.app/",
    category: "Frontend",
    isDeleted: false,
    createdAt: "2025-11-09T17:05:20.297+00:00",
    updatedAt: "2025-11-09T17:05:20.297+00:00",
    __v: 0,
  },
  {
    _id: "6910c9d084a2c11a9b7f6ab7",
    profilePhoto: {
      _id: "6910c9d084a2c11a9b7f6ab8",
      public_id: "projects/sentinelforgeai",
      secure_url: "https://res.cloudinary.com/dzrvibnxs/image/upload/v1781699306/Screenshot_From_2026-06-17_17-55-05_rpshyn.png",
    },
    name: "SentinelForge AI",
    description: "An AI-powered cybersecurity platform for Email Spam Detection, URL Phishing Detection, and File Malware Analysis with real-time threat intelligence, user analytics, subscription plans, and personalized security dashboards.",
    tools: ["React", "TypeScript", "Python", "FastAPI", "Machine Learning", "MongoDB", "Google OAuth", "Razorpay", "Recharts", "REST API"],
    githubLink: "https://github.com/Kushagra-369/SentinelForgeAI",
    deploymentLink: "https://sentinel-forge-ai.vercel.app",
    category: "Full Stack",
    isDeleted: false,
    createdAt: "2026-06-17T17:55:05.000+00:00",
    updatedAt: "2026-06-17T17:55:05.000+00:00",
    __v: 0,
  },
  {
    _id: "6910c9d084a2c11a9b7f6ab7",
    profilePhoto: {
      _id: "6910c9d084a2c11a9b7f6ab8",
      public_id: "projects/youtube-clone-internship",
      secure_url: "https://res.cloudinary.com/dzrvibnxs/image/upload/v1783576837/Screenshot_From_2026-07-09_11-29-22_icxjre.png",
    },
    name: "YouTube Clone",
    description: "A feature-rich full-stack YouTube Clone built using the MERN Stack with Google OAuth authentication, region-based Email & Mobile OTP verification, Razorpay premium subscriptions, watch-time restrictions, video downloading with daily limits, WebRTC voice/video calling, screen sharing, call recording, gesture-based video controls, comment translation, real-time online/offline user presence using Socket.IO, and Cloudinary media uploads.",
    tools: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "Socket.IO", "WebRTC", "Google OAuth", "Razorpay", "Cloudinary", "SendGrid", "Twilio", "REST API"],
    githubLink: "https://github.com/Kushagra-369/youtube-clone-internship",
    deploymentLink: "https://youtube-clone-internship-fm9z.vercel.app/",
    category: "Full Stack",
    isDeleted: false,
    createdAt: "2026-07-09T11:29:22.000+00:00",
    updatedAt: "2026-07-09T11:29:22.000+00:00",
    __v: 0,
  },
  {
    _id: "6910c9d084a2c11a9b7f6ac1",
    profilePhoto: {
      _id: "6910c9d084a2c11a9b7f6ac2",
      public_id: "course/aura-link-project",
      secure_url: "https://res.cloudinary.com/dzrvibnxs/image/upload/v1779253731/Screenshot_From_2026-05-20_10-38-41_u7qmc6.png",
    },
    name: "AuraLink",
    description: "A modern real-time messaging platform with sleek UI, responsive chat layouts, authentication, and smooth user interactions. Built for seamless communication with a focus on performance, clean design, and modern frontend experience.",
    tools: ["React", "JavaScript", "CSS", "Node.js", "Express", "MongoDB", "Socket.io", "JWT"],
    githubLink: "https://github.com/Kushagra-369/AuraLink",
    deploymentLink: "https://aura-link-bw7g.vercel.app/",
    category: "Full Stack",
    isDeleted: false,
    createdAt: "2025-11-09T17:05:20.297+00:00",
    updatedAt: "2025-11-09T17:05:20.297+00:00",
    __v: 0,
  },
  {
    _id: "6910c9d084a2c11a9b7f6ac3",
    profilePhoto: {
      _id: "6910c9d084a2c11a9b7f6ac4",
      public_id: "course/globex-travel-project",
      secure_url: "https://res.cloudinary.com/dzrvibnxs/image/upload/v1779253617/Screenshot_From_2026-05-20_10-36-31_do9glb.png",
    },
    name: "Globex",
    description: "A full-stack travel and destination platform featuring responsive UI, interactive travel exploration, and an AI-powered chatbot assistant for user guidance and trip-related interactions. Designed for smooth user experience and modern web accessibility.",
    tools: ["React", "JavaScript", "CSS", "Node.js", "Express", "MongoDB", "Chatbot", "JWT"],
    githubLink: "https://github.com/Kushagra-369/Travelling-Client",
    deploymentLink: "https://travelling-client-orcin.vercel.app/",
    category: "Full Stack",
    isDeleted: false,
    createdAt: "2025-11-09T17:05:20.297+00:00",
    updatedAt: "2025-11-09T17:05:20.297+00:00",
    __v: 0,
  },
  {
    _id: "6910c9d084a2c11a9b7f6ab5-2",
    profilePhoto: {
      _id: "6910c9d084a2c11a9b7f6ab6-2",
      public_id: "course/feel-special-project",
      secure_url: "https://res.cloudinary.com/dzrvibnxs/image/upload/v1779253105/Screenshot_From_2026-05-20_10-25-07_lwwtwu.png",
    },
    name: "Feel Special",
    description: "An immersive and visually rich frontend experience built with React and Framer Motion. Features cinematic transitions, smooth scroll animations, modern UI interactions, and responsive design focused on storytelling aesthetics.",
    tools: ["React", "JavaScript", "CSS", "Framer Motion"],
    githubLink: "https://github.com/Kushagra-369/Feel_Special",
    deploymentLink: "https://feel-special.vercel.app/",
    category: "Frontend",
    isDeleted: false,
    createdAt: "2025-11-09T17:05:20.297+00:00",
    updatedAt: "2025-11-09T17:05:20.297+00:00",
    __v: 0,
  },
  {
    _id: "6910c9d084a2c11a9b7f6ab7-jg",
    profilePhoto: {
      _id: "6910c9d084a2c11a9b7f6ab8-jg",
      public_id: "course/jg-university-project",
      secure_url: "https://res.cloudinary.com/dzrvibnxs/image/upload/v1779253177/Screenshot_From_2026-05-20_10-29-23_jjxu7q.png",
    },
    name: "JG University",
    description: "A modern university website redesign focused on clean UI, responsive layouts, smooth animations, and improved user experience. Built using React and Framer Motion with attention to accessibility and professional academic presentation.",
    tools: ["React", "JavaScript", "CSS", "Framer Motion"],
    githubLink: "https://github.com/Kushagra-369/jguni-redesign",
    deploymentLink: "https://jguni-redesign-kappa.vercel.app/",
    category: "Frontend",
    isDeleted: false,
    createdAt: "2025-11-09T17:05:20.297+00:00",
    updatedAt: "2025-11-09T17:05:20.297+00:00",
    __v: 0,
  },
  {
    _id: "6910ca6784a2c11a9b7f6ab8",
    profilePhoto: {
      _id: "6910ca6784a2c11a9b7f6ab9",
      public_id: "course/r0saxyqjivs8adhbcpmd",
      secure_url: "https://res.cloudinary.com/dynodadq0/image/upload/v1762708070/course/r0saxyqjivs8adhbcpmd.jpg",
    },
    name: "Life is Strange",
    description: "Interactive web experience with scroll-triggered animations and emotional storytelling through code.",
    tools: ["React", "Framer Motion", "CSS", "GSAP"],
    githubLink: "https://github.com/Kushagra-369/BEST-GAME",
    deploymentLink: "https://best-game.vercel.app/",
    category: "Frontend",
    isDeleted: false,
    createdAt: "2025-11-09T17:07:51.432+00:00",
    updatedAt: "2025-11-09T17:07:51.432+00:00",
    __v: 0,
  },
  {
    _id: "6910d56e84a2c11a9b7f6add",
    profilePhoto: {
      _id: "6910d56e84a2c11a9b7f6ade",
      public_id: "course/raqip9kg6sg1i5bh6sbm",
      secure_url: "https://res.cloudinary.com/dynodadq0/image/upload/v1762710893/course/raqip9kg6sg1i5bh6sbm.jpg",
    },
    name: "HCM",
    description: "A Monsterverse present in the novel Empty Spaces. Full-stack application with authentication and real-time features.",
    tools: ["React", "JavaScript", "MongoDB", "Postman", "express", "Nodejs", "JWT"],
    githubLink: "https://github.com/Kushagra-369/HCM",
    deploymentLink: "https://hcm-rho.vercel.app/",
    category: "Full Stack",
    isDeleted: false,
    createdAt: "2025-11-09T17:54:54.648+00:00",
    updatedAt: "2025-11-09T17:54:54.648+00:00",
    __v: 0,
  },
  {
    _id: "6910d5d584a2c11a9b7f6ae0",
    profilePhoto: {
      _id: "6910d5d584a2c11a9b7f6ae1",
      public_id: "course/fark0wcx2xk9d5bqaani",
      secure_url: "https://res.cloudinary.com/dynodadq0/image/upload/v1762710996/course/fark0wcx2xk9d5bqaani.jpg",
    },
    name: "Abandoned Places",
    description: "A photography showcase website with responsive grid layout and smooth transitions. Perfect for visual storytelling.",
    tools: ["TailwindCss", "JavaScript", "React", "Framer-Motion"],
    githubLink: "https://github.com/Kushagra-369/abondoned-client",
    deploymentLink: "https://abondoned-client.vercel.app/",
    category: "Frontend",
    isDeleted: false,
    createdAt: "2025-11-09T17:56:37.691+00:00",
    updatedAt: "2025-11-09T17:56:37.691+00:00",
    __v: 0,
  },
  {
    _id: "6910c8c884a2c11a9b7f6aaf",
    profilePhoto: {
      _id: "6910c8c884a2c11a9b7f6ab0",
      public_id: "course/nwvtys4iz1tzmfczglxp",
      secure_url: "https://res.cloudinary.com/dynodadq0/image/upload/v1762707655/course/nwvtys4iz1tzmfczglxp.jpg",
    },
    name: "My Portfolio",
    description: "A fully responsive and animated portfolio built with React, TypeScript, and Framer Motion. Showcasing projects and skills.",
    tools: ["React", "TypeScript", "Framer Motion", "TailwindCSS", "Node.js", "Express"],
    githubLink: "https://github.com/Kushagra-369/portfolio-client",
    deploymentLink: "https://portfolio-client-swart.vercel.app/",
    category: "Frontend",
    isDeleted: false,
    createdAt: "2025-11-09T17:00:56.538+00:00",
    updatedAt: "2025-11-09T17:00:56.538+00:00",
    __v: 0,
  },
  {
    _id: "6910c93584a2c11a9b7f6ab2",
    profilePhoto: {
      _id: "6910c93584a2c11a9b7f6ab3",
      public_id: "course/jjsbdelj7n1zg7hoejdd",
      secure_url: "https://res.cloudinary.com/dynodadq0/image/upload/v1762707764/course/jjsbdelj7n1zg7hoejdd.jpg",
    },
    name: "Food King",
    description: "A full-stack food ordering app with user authentication, cart, and admin panel. Integrated real-time order tracking.",
    tools: ["React", "JavaScript", "Framer-Motion", "Express", "MongoDB", "Postman", "Nodejs", "JWT"],
    githubLink: "https://github.com/Kushagra-369/food_client",
    deploymentLink: "https://food-client-33mf.vercel.app/",
    category: "Full Stack",
    isDeleted: false,
    createdAt: "2025-11-09T17:02:45.184+00:00",
    updatedAt: "2025-11-09T17:02:45.184+00:00",
    __v: 0,
  },
];

const gradientColors: string[] = [
  "from-purple-900 to-blue-900",
  "from-emerald-900 to-cyan-900",
  "from-orange-900 to-red-900",
  "from-pink-900 to-rose-900",
  "from-indigo-900 to-violet-900",
];

interface SectionProps {
  title: string;
  projects: Project[];
  fadeIn: Variants;
}

// ==================== Ambient 3D shape definitions ====================
// Split evenly between left and right so empty sides get filled.
const AMBIENT_SHAPES: ShapeDef[] = [
  // LEFT SIDE
  { id: 1,  x: "3%",  y: "12%", size: 70, depth: 0.9, color: "#22d3ee", kind: "crystal", rotation: 45, duration: 6.5, delay: 0 },
  { id: 2,  x: "7%",  y: "32%", size: 46, depth: 0.5, color: "#60a5fa", kind: "ring",    rotation: 0,  duration: 5.2, delay: 1.1 },
  { id: 3,  x: "2%",  y: "58%", size: 58, depth: 0.75, color: "#a78bfa", kind: "diamond", rotation: 45, duration: 7.3, delay: 0.6 },
  { id: 4,  x: "9%",  y: "78%", size: 38, depth: 0.45, color: "#22d3ee", kind: "hexagon", rotation: 15, duration: 6.0, delay: 1.8 },
  { id: 5,  x: "5%",  y: "92%", size: 14, depth: 0.35, color: "#67e8f9", kind: "dot",     rotation: 0,  duration: 4.2, delay: 0.4 },

  // RIGHT SIDE
  { id: 6,  x: "94%", y: "18%", size: 62, depth: 0.85, color: "#60a5fa", kind: "crystal", rotation: 20, duration: 6.8, delay: 0.9 },
  { id: 7,  x: "90%", y: "42%", size: 50, depth: 0.55, color: "#22d3ee", kind: "ring",    rotation: 0,  duration: 5.8, delay: 2.1 },
  { id: 8,  x: "95%", y: "66%", size: 68, depth: 0.8, color: "#818cf8", kind: "diamond", rotation: 45, duration: 7.6, delay: 0.3 },
  { id: 9,  x: "88%", y: "86%", size: 42, depth: 0.5, color: "#67e8f9", kind: "hexagon", rotation: 30, duration: 6.2, delay: 1.4 },
  { id: 10, x: "96%", y: "96%", size: 12, depth: 0.3, color: "#a78bfa", kind: "dot",     rotation: 0,  duration: 4.6, delay: 0.7 },
];

// ==================== Main component ====================
export default function Project() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Mouse tracking for ambient parallax
  const mouseX = useMotionValue<number>(0);
  const mouseY = useMotionValue<number>(0);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setProjects(staticProjects);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const fullStackProjects: Project[] = projects.filter((p) => p.category === "Full Stack");
  const frontendProjects: Project[] = projects.filter((p) => p.category === "Frontend");

  return (
    <div
      id="projects"
      className="relative pt-16 pb-24 px-6 sm:px-12 md:px-20 lg:px-32 font-[Outfit] overflow-hidden min-h-screen"
    >
      {/* ============================================================
          AMBIENT 3D FLOATING SHAPES (left + right)
          — subtle parallax with mouse
          — different depths → real 3D feel
          — hidden on small screens so they don't overlap content
          ============================================================ */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none overflow-hidden">
        {AMBIENT_SHAPES.map((s) => (
          <FloatingShape key={s.id} shape={s} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </div>

      {/* ============================================================
          3D PERSPECTIVE FLOOR GRID at bottom
          ============================================================ */}
      <div
        className="hidden md:block absolute bottom-0 left-0 right-0 h-80 pointer-events-none overflow-hidden"
        style={{ perspective: "900px", perspectiveOrigin: "50% 100%" }}
      >
        <div
          className="absolute inset-x-0 bottom-0 h-[120%]"
          style={{
            transform: "rotateX(72deg)",
            transformOrigin: "50% 100%",
            backgroundImage:
              "linear-gradient(rgba(34,211,238,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.22) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        {/* Fade the grid away from bottom edge so it blends into page */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-white dark:to-[#0b1220] opacity-90" />
      </div>

      {/* ============================================================
          Main content — everything original kept
          ============================================================ */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative z-10 max-w-6xl mx-auto text-center"
      >
        <motion.h1
          variants={fadeIn}
          custom={0}
          className="text-4xl md:text-5xl font-bold mb-8 bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          Projects
        </motion.h1>

        <motion.p
          variants={fadeIn}
          custom={1}
          className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto mb-12"
        >
          A showcase of my full-stack and frontend projects — combining design,
          logic, and performance.
        </motion.p>

        {fullStackProjects.length > 0 && (
          <Section title="⚙️ Full Stack Projects" projects={fullStackProjects} fadeIn={fadeIn} />
        )}

        {frontendProjects.length > 0 && (
          <Section title="🎨 Frontend Projects" projects={frontendProjects} fadeIn={fadeIn} />
        )}

        <motion.div
          variants={fadeIn}
          custom={10}
          className="mt-20 text-center text-lg italic text-gray-500 dark:text-gray-400"
        >
          "Every project is a story — told through code and creativity."
        </motion.div>
      </motion.div>
    </div>
  );
}

// ==================== FloatingShape ====================
function FloatingShape({
  shape,
  mouseX,
  mouseY,
}: {
  shape: ShapeDef;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  // Parallax: nearer shapes move more (depth factor)
  const tx = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-shape.depth * 45, shape.depth * 45]),
    { stiffness: 40, damping: 18 }
  );
  const ty = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [-shape.depth * 45, shape.depth * 45]),
    { stiffness: 40, damping: 18 }
  );

  const baseStyle: React.CSSProperties = {
    width: shape.size,
    height: shape.size,
    borderColor: shape.color,
    boxShadow: `0 0 20px ${shape.color}55, inset 0 0 12px ${shape.color}33`,
  };

  return (
    <motion.div
      className="absolute"
      style={{
        left: shape.x,
        top: shape.y,
        x: tx,
        y: ty,
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        // Gentle float + slow spin (not full revolution — just drift)
        y: [0, -14, 0],
        rotate: [shape.rotation, shape.rotation + 20, shape.rotation],
      }}
      transition={{
        duration: shape.duration,
        delay: shape.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {shape.kind === "crystal" && (
        <div className="rotate-45 rounded-lg border-2" style={baseStyle} />
      )}
      {shape.kind === "diamond" && (
        <div className="rotate-45 border-2" style={baseStyle} />
      )}
      {shape.kind === "ring" && (
        <div className="rounded-full border-2" style={baseStyle} />
      )}
      {shape.kind === "hexagon" && (
        <div
          className="border-2"
          style={{
            ...baseStyle,
            clipPath:
              "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)",
          }}
        />
      )}
      {shape.kind === "dot" && (
        <div
          className="rounded-full"
          style={{
            width: shape.size,
            height: shape.size,
            background: shape.color,
            boxShadow: `0 0 18px ${shape.color}, 0 0 36px ${shape.color}88`,
          }}
        />
      )}
    </motion.div>
  );
}

// ==================== Section (unchanged) ====================
function Section({ title, projects, fadeIn }: SectionProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <>
      <motion.h2 variants={fadeIn} className="text-2xl font-semibold text-cyan-400 mb-6">
        {title}
      </motion.h2>

      <motion.div
        variants={fadeIn}
        className="mb-16 select-none relative w-full overflow-hidden"
      >
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          coverflowEffect={{
            rotate: 12,
            stretch: 0,
            depth: 120,
            modifier: 2,
            scale: 0.9,
            slideShadows: false,
          }}
          watchOverflow={true}
          centeredSlides={true}
          simulateTouch={true}
          allowTouchMove={true}
          grabCursor={true}
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
          className="project-swiper"
        >
          {projects.map((project: Project, i: number) => {
            const gradientIndex = i % gradientColors.length;

            return (
              <SwiperSlide key={project._id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative group rounded-2xl border border-cyan-400/20 hover:border-cyan-400/50 shadow-lg overflow-hidden transition-all duration-300 h-full"
                >
                  {project.profilePhoto?.secure_url ? (
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-all duration-500"
                      style={{ backgroundImage: `url(${project.profilePhoto.secure_url})` }}
                    ></div>
                  ) : (
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${gradientColors[gradientIndex]} opacity-60 group-hover:opacity-80 transition-all duration-500`}
                    ></div>
                  )}

                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-500"></div>

                  <div className="relative z-10 p-6 backdrop-blur-[2px] min-h-[400px] flex flex-col">
                    <h3 className="text-xl font-semibold text-cyan-400 mb-3">{project.name}</h3>
                    <p className="text-gray-200 text-sm mb-4 leading-relaxed grow">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4 justify-center sm:justify-start">
                      {project.tools?.slice(0, 4).map((tech: string) => (
                        <span
                          key={tech}
                          className="text-xs bg-cyan-400/20 text-cyan-200 px-3 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tools?.length > 4 && (
                        <span className="text-xs bg-cyan-400/20 text-cyan-200 px-3 py-1 rounded-full">
                          +{project.tools.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-center sm:justify-start gap-4 mt-3">
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-100 transition-colors"
                        >
                          <Github className="w-4 h-4" /> GitHub
                        </a>
                      )}
                      {project.deploymentLink && (
                        <a
                          href={project.deploymentLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-100 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" /> Live
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-400 p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-400 p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </motion.div>

      <style>{`
        .project-swiper {
          padding: 20px 0 40px 0;
          overflow: hidden;
        }
        .project-swiper .swiper-wrapper {
          overflow: visible;
        }
        .project-swiper .swiper-slide {
          height: auto;
        }
        .project-swiper .swiper-pagination {
          bottom: 0px;
        }
        .project-swiper .swiper-pagination-bullet {
          background: #22d3ee;
          opacity: 0.5;
        }
        .project-swiper .swiper-pagination-bullet-active {
          background: #06b6d4;
          opacity: 1;
        }
        @media (max-width: 768px) {
          .project-swiper {
            padding: 10px 0 30px 0;
          }
        }
      `}</style>
    </>
  );
}