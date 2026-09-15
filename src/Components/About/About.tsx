import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { Variants } from "framer-motion";
import { useState } from "react";

export default function About() {
  // =========================================
  // 3D PHOTO TILT
  // =========================================

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 200,
    damping: 20,
  });

  const springY = useSpring(mouseY, {
    stiffness: 200,
    damping: 20,
  });

  const rotateX = useTransform(
    springY,
    [-0.5, 0.5],
    [12, -12]
  );

  const rotateY = useTransform(
    springX,
    [-0.5, 0.5],
    [-12, 12]
  );

  const glareX = useTransform(
    mouseX,
    [-0.5, 0.5],
    ["0%", "100%"]
  );

  const glareY = useTransform(
    mouseY,
    [-0.5, 0.5],
    ["0%", "100%"]
  );

  const glareBg = useMotionTemplate`
    radial-gradient(
      circle at ${glareX} ${glareY},
      rgba(255,255,255,0.28),
      transparent 60%
    )
  `;

  const [isHoveringImg, setIsHoveringImg] =
    useState(false);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect =
      e.currentTarget.getBoundingClientRect();

    const x =
      (e.clientX - rect.left) / rect.width - 0.5;

    const y =
      (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHoveringImg(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // =========================================
  // ANIMATIONS
  // =========================================

  const fadeUp: Variants = {
    hidden: {
      opacity: 0,
      y: 35,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: "easeOut",
      },
    },
  };

  const itemAnimation: Variants = {
    hidden: {
      opacity: 0,
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
  <main
  className="
    relative min-h-screen overflow-hidden
    bg-transparent
    px-6 pb-20 pt-28
    text-gray-900 dark:text-white
    sm:px-10
    md:px-14
    lg:px-16
    xl:px-20
  "
>
      {/* =========================================
          BACKGROUND
      ========================================= */}


      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.3,
        }}
        variants={fadeUp}
        className="relative z-10 mx-auto mb-12 max-w-[1450px]"
      >
        <div className="mb-3 flex items-center gap-3">
          <span
            className="
              h-px w-10
              bg-cyan-500
              dark:bg-cyan-400
            "
          />

          <span
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-cyan-600
              dark:text-cyan-400
            "
          >
            Professional Journey
          </span>
        </div>

        <h1
          className="
            text-5xl
            font-bold
            tracking-tight
            text-gray-900
            dark:text-white
            sm:text-6xl
          "
        >
          Experience
          <span className="text-cyan-500 dark:text-cyan-400">
            .
          </span>
        </h1>

        <p
          className="
            mt-3
            max-w-xl
            text-xs
            leading-6
            text-gray-500
            dark:text-gray-500
            sm:text-sm
          "
        >
          A quick look at what I built and learned
          during my internship.
        </p>
      </motion.div>

      {/* =========================================
          MAIN TWO COLUMN LAYOUT
      ========================================= */}

      <div
        className="
          relative z-10
          mx-auto
          grid
          max-w-[1450px]
          items-start
          gap-10
          lg:grid-cols-[500px_minmax(0,1fr)]
          xl:grid-cols-[560px_minmax(0,1fr)]
        "
      >
        {/* =======================================
            LEFT — PHOTO
        ======================================= */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          variants={fadeUp}
          className="
            lg:sticky
            lg:top-28
          "
        >
          <div
            className="relative perspective-[1400px]"
            onMouseMove={handleMouseMove}
            onMouseEnter={() =>
              setIsHoveringImg(true)
            }
            onMouseLeave={handleMouseLeave}
          >
            {/* -----------------------------------
                3D BACK RING
            ----------------------------------- */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[88%]
                w-[82%]
                -translate-x-1/2
                -translate-y-1/2
                rounded-[45%]
                border
                border-cyan-400/25
                dark:border-cyan-400/20
              "
            />

            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[96%]
                w-[68%]
                -translate-x-1/2
                -translate-y-1/2
                rounded-[50%]
                border
                border-blue-400/20
                dark:border-blue-400/10
              "
            />

            {/* -----------------------------------
                PHOTO GLOW
            ----------------------------------- */}

            <motion.div
              animate={{
                opacity: [0.25, 0.5, 0.25],
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                inset-10
                rounded-[40px]
                bg-cyan-400/20
                dark:bg-cyan-400/15
                blur-[65px]
              "
            />

            {/* -----------------------------------
                3D PHOTO
            ----------------------------------- */}

            <motion.div
              style={{
                rotateX: isHoveringImg
                  ? rotateX
                  : 0,
                rotateY: isHoveringImg
                  ? rotateY
                  : 0,
                transformStyle:
                  "preserve-3d",
              }}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                y: {
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="
                relative
                z-10
                w-full
              "
            >
              {/* Depth */}
              <div
                className="
                  absolute
                  inset-0
                  translate-x-4
                  translate-y-5
                  rounded-4xl
                  border
                  border-cyan-400/10
                  bg-cyan-400/4
                  dark:bg-cyan-400/2.5
                "
                style={{
                  transform:
                    "translateZ(-40px)",
                }}
              />

              {/* Wall shadow */}
              <div
                className="
                  absolute
                  inset-0
                  rounded-4xl
                  bg-black/10
                  dark:bg-black/40
                  blur-2xl
                "
                style={{
                  transform:
                    "translateX(-24px) translateZ(-60px)",
                  opacity: 0.6,
                }}
              />

              {/* Frame */}
              <motion.div
                animate={{
                  scale: isHoveringImg
                    ? 1.015
                    : 1,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="
                  relative
                  overflow-hidden
                  rounded-4xl
                  border
                  border-cyan-400/20
                  bg-white/40
                  dark:border-cyan-400/10
                  dark:bg-white/5
                  p-2
                  shadow-2xl
                  dark:shadow-[0_35px_100px_rgba(0,0,0,0.7)]
                  backdrop-blur-md
                "
                style={{
                  transformStyle:
                    "preserve-3d",
                }}
              >
                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-[25px]
                  "
                  style={{
                    transform:
                      "translateZ(30px)",
                  }}
                >
                  <motion.img
                    src="https://res.cloudinary.com/dzrvibnxs/image/upload/v1789411883/a97c9fbb-b286-4464-8a62-89ad1a38adaf_clbkqy.png"
                    alt="Kushagra Chhabra"
                    className="
                      relative
                      z-10
                      block
                      aspect-4/5
                      w-full
                      rounded-[25px]
                      object-cover
                      object-center
                      shadow-2xl
                    "
                    animate={{
                      scale: isHoveringImg
                        ? 1.03
                        : 1,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                  />

                  {/* Cursor glare */}
                  <motion.div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      z-20
                      rounded-[25px]
                    "
                    style={{
                      background: glareBg,
                    }}
                    animate={{
                      opacity: isHoveringImg
                        ? 1
                        : 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                  />

                  {/* Bottom fade */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-x-0
                      bottom-0
                      z-20
                      h-1/3
                      bg-linear-to-t
                      from-black/45
                      to-transparent
                      dark:from-black/60
                    "
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* -----------------------------------
                COMPLETED BADGE
            ----------------------------------- */}

            <motion.div
              animate={{
                y: [0, -7, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                -bottom-4
                right-3
                z-30
                rounded-xl
                border
                border-cyan-400/20
                bg-white/90
                dark:border-white/10
                dark:bg-[#07111f]/95
                px-4
                py-2.5
                shadow-xl
                backdrop-blur-xl
              "
            >
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span
                    className="
                      absolute
                      inline-flex
                      h-full
                      w-full
                      animate-ping
                      rounded-full
                      bg-cyan-500
                      opacity-70
                    "
                  />

                  <span
                    className="
                      relative
                      inline-flex
                      h-2
                      w-2
                      rounded-full
                      bg-cyan-500
                    "
                  />
                </span>

                <div>
                  <p
                    className="
                      text-[10px]
                      font-semibold
                      text-gray-800
                      dark:text-white
                    "
                  >
                    Internship Completed
                  </p>

                  <p
                    className="
                      text-[9px]
                      text-gray-500
                      dark:text-gray-500
                    "
                  >
                    10 July 2026
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* =====================================
              ABOUT ME
          ===================================== */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeUp}
            className="mt-10"
          >
            <div className="mb-2 flex items-center gap-2">
              <span
                className="
                  h-px w-6
                  bg-cyan-500
                  dark:bg-cyan-400
                "
              />

              <h2
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-cyan-600
                  dark:text-cyan-400
                "
              >
                About Me
              </h2>
            </div>

            <p
              className="
                max-w-md
                text-xs
                leading-5
                text-gray-600
                dark:text-gray-500
              "
            >
              MERN-stack developer who enjoys
              turning ideas into clean,
              interactive and user-focused web
              experiences.
            </p>
          </motion.div>
        </motion.div>

        {/* =======================================
            RIGHT — EXPERIENCE
        ======================================= */}

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="min-w-0"
        >
          {/* -----------------------------------
              INTERNSHIP
          ----------------------------------- */}

          <motion.div variants={itemAnimation}>
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span
                className="
                  rounded-full
                  border
                  border-cyan-400/30
                  bg-cyan-400/10
                  px-3
                  py-1
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-wider
                  text-cyan-600
                  dark:border-cyan-400/20
                  dark:text-cyan-300
                "
              >
                Internship
              </span>

              <span
                className="
                  text-[10px]
                  text-gray-500
                  dark:text-gray-600
                "
              >
                10/07/2026 — Completed
              </span>
            </div>

            <h2
              className="
                text-2xl
                font-bold
                tracking-tight
                text-gray-900
                dark:text-white
                sm:text-3xl
              "
            >
              YouTube Clone Development
            </h2>

            <p
              className="
                mt-3
                max-w-3xl
                text-xs
                leading-6
                text-gray-600
                dark:text-gray-500
                sm:text-sm
              "
            >
              Developed a full-stack YouTube-style
              platform with advanced comments,
              video downloads, premium
              subscriptions, payments,
              authentication, gesture controls
              and real-time video communication.
            </p>
          </motion.div>

          {/* -----------------------------------
              LINKS
          ----------------------------------- */}

          <motion.div
            variants={itemAnimation}
            className="mt-5 flex flex-wrap gap-2"
          >
            {/* Live */}
            <a
              href="https://youtube-clone-internship-fm9z.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                rounded-lg
                border
                border-cyan-400/30
                bg-cyan-400/10
                px-3
                py-2
                text-[10px]
                font-semibold
                text-cyan-600
                transition-all
                duration-300
                hover:bg-cyan-400/20
                dark:text-cyan-300
              "
            >
              Live Demo ↗
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Kushagra-369/youtube-clone-internship"
              target="_blank"
              rel="noopener noreferrer"
              className="
                rounded-lg
                border
                border-gray-200
                bg-gray-50
                px-3
                py-2
                text-[10px]
                font-semibold
                text-gray-600
                transition-all
                duration-300
                hover:bg-gray-100
                dark:border-white/10
                dark:bg-white/3
                dark:text-gray-400
                dark:hover:bg-white/6
                dark:hover:text-white
              "
            >
              GitHub ↗
            </a>

            {/* Training Certificate */}
            <a
              href="https://res.cloudinary.com/dzrvibnxs/image/upload/v1789414970/elevanceskills-Full-Stack-Web-Development-Training-Certificate_1_wlm21a.png"
              target="_blank"
              rel="noopener noreferrer"
              className="
                rounded-lg
                border
                border-gray-200
                bg-gray-50
                px-3
                py-2
                text-[10px]
                font-semibold
                text-gray-600
                transition-all
                duration-300
                hover:border-cyan-300
                hover:bg-cyan-50
                hover:text-cyan-700
                dark:border-white/10
                dark:bg-white/3
                dark:text-gray-400
                dark:hover:border-cyan-400/20
                dark:hover:bg-cyan-400/6
                dark:hover:text-cyan-300
              "
            >
              Training Certificate ↗
            </a>

            {/* Completion Certificate */}
            <a
              href="https://res.cloudinary.com/dzrvibnxs/image/upload/v1789414998/elevanceskills-Full-Stack-Web-Development-Internship-Certificate_ondoml.png"
              target="_blank"
              rel="noopener noreferrer"
              className="
                rounded-lg
                border
                border-gray-200
                bg-gray-50
                px-3
                py-2
                text-[10px]
                font-semibold
                text-gray-600
                transition-all
                duration-300
                hover:border-cyan-300
                hover:bg-cyan-50
                hover:text-cyan-700
                dark:border-white/10
                dark:bg-white/3
                dark:text-gray-400
                dark:hover:border-cyan-400/20
                dark:hover:bg-cyan-400/6
                dark:hover:text-cyan-300
              "
            >
              Completion Certificate ↗
            </a>
          </motion.div>

          {/* -----------------------------------
              4 PROJECT SCREENSHOTS
          ----------------------------------- */}

          <motion.div
            variants={itemAnimation}
            className="mt-6 grid grid-cols-2 gap-3"
          >
            {/* Screenshot 1 */}
            <motion.a
              href="https://res.cloudinary.com/dzrvibnxs/image/upload/v1789414769/Screenshot_From_2026-09-15_01-06-57_dt9xhc.png"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                y: -4,
                scale: 1.015,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                group
                overflow-hidden
                rounded-xl
                border
                border-gray-200
                bg-white/50
                p-1.5
                shadow-sm
                transition-colors
                dark:border-white/10
                dark:bg-white/2.5
                dark:shadow-none
              "
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://res.cloudinary.com/dzrvibnxs/image/upload/v1789414769/Screenshot_From_2026-09-15_01-06-57_dt9xhc.png"
                  alt="YouTube Clone Screenshot 1"
                  className="
                    block
                    aspect-video
                    w-full
                    object-cover
                    object-top
                    transition
                    duration-500
                    group-hover:scale-[1.03]
                  "
                />
              </div>
            </motion.a>

            {/* Screenshot 2 */}
            <motion.a
              href="https://res.cloudinary.com/dzrvibnxs/image/upload/v1789414742/Screenshot_From_2026-09-15_01-07-09_fr75gv.png"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                y: -4,
                scale: 1.015,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                group
                overflow-hidden
                rounded-xl
                border
                border-gray-200
                bg-white/50
                p-1.5
                shadow-sm
                dark:border-white/10
                dark:bg-white/2.5
                dark:shadow-none
              "
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://res.cloudinary.com/dzrvibnxs/image/upload/v1789414742/Screenshot_From_2026-09-15_01-07-09_fr75gv.png"
                  alt="YouTube Clone Screenshot 2"
                  className="
                    block
                    aspect-video
                    w-full
                    object-cover
                    object-top
                    transition
                    duration-500
                    group-hover:scale-[1.03]
                  "
                />
              </div>
            </motion.a>

            {/* Screenshot 3 */}
            <motion.a
              href="https://res.cloudinary.com/dzrvibnxs/image/upload/v1789414750/Screenshot_From_2026-09-15_01-07-44_zl3kcm.png"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                y: -4,
                scale: 1.015,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                group
                overflow-hidden
                rounded-xl
                border
                border-gray-200
                bg-white/50
                p-1.5
                shadow-sm
                dark:border-white/10
                dark:bg-white/2.5
                dark:shadow-none
              "
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://res.cloudinary.com/dzrvibnxs/image/upload/v1789414750/Screenshot_From_2026-09-15_01-07-44_zl3kcm.png"
                  alt="YouTube Clone Screenshot 3"
                  className="
                    block
                    aspect-video
                    w-full
                    object-cover
                    object-top
                    transition
                    duration-500
                    group-hover:scale-[1.03]
                  "
                />
              </div>
            </motion.a>

            {/* Screenshot 4 */}
            <motion.a
              href="https://res.cloudinary.com/dzrvibnxs/image/upload/v1789414759/Screenshot_From_2026-09-15_01-07-32_fmzepv.png"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                y: -4,
                scale: 1.015,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                group
                overflow-hidden
                rounded-xl
                border
                border-gray-200
                bg-white/50
                p-1.5
                shadow-sm
                dark:border-white/10
                dark:bg-white/2.5
                dark:shadow-none
              "
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://res.cloudinary.com/dzrvibnxs/image/upload/v1789414759/Screenshot_From_2026-09-15_01-07-32_fmzepv.png"
                  alt="YouTube Clone Screenshot 4"
                  className="
                    block
                    aspect-video
                    w-full
                    object-cover
                    object-top
                    transition
                    duration-500
                    group-hover:scale-[1.03]
                  "
                />
              </div>
            </motion.a>
          </motion.div>

          {/* -----------------------------------
              WHAT I BUILT
          ----------------------------------- */}

          <motion.div
            variants={itemAnimation}
            className="mt-7"
          >
            <div className="mb-4 flex items-center gap-3">
              <span
                className="
                  h-px w-7
                  bg-cyan-500
                  dark:bg-cyan-400
                "
              />

              <h3
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-cyan-600
                  dark:text-cyan-400
                "
              >
                What I Built
              </h3>
            </div>

            <div
              className="
                grid
                gap-x-8
                gap-y-5
                sm:grid-cols-2
              "
            >
              {/* 01 */}
              <motion.div
                whileHover={{ x: 4 }}
                className="flex gap-3"
              >
                <span
                  className="
                    mt-1
                    text-cyan-500
                    dark:text-cyan-400
                  "
                >
                  ✦
                </span>

                <div>
                  <h4
                    className="
                      text-xs
                      font-semibold
                      text-gray-800
                      dark:text-gray-200
                    "
                  >
                    Comments & Moderation
                  </h4>

                  <p
                    className="
                      mt-1
                      text-[10px]
                      leading-5
                      text-gray-500
                      dark:text-gray-600
                    "
                  >
                    Translation, reactions, city
                    display, filtering and automatic
                    moderation.
                  </p>
                </div>
              </motion.div>

              {/* 02 */}
              <motion.div
                whileHover={{ x: 4 }}
                className="flex gap-3"
              >
                <span
                  className="
                    mt-1
                    text-cyan-500
                    dark:text-cyan-400
                  "
                >
                  ✦
                </span>

                <div>
                  <h4
                    className="
                      text-xs
                      font-semibold
                      text-gray-800
                      dark:text-gray-200
                    "
                  >
                    Downloads & Premium
                  </h4>

                  <p
                    className="
                      mt-1
                      text-[10px]
                      leading-5
                      text-gray-500
                      dark:text-gray-600
                    "
                  >
                    Video downloads, daily limits,
                    premium access and Razorpay
                    payments.
                  </p>
                </div>
              </motion.div>

              {/* 03 */}
              <motion.div
                whileHover={{ x: 4 }}
                className="flex gap-3"
              >
                <span
                  className="
                    mt-1
                    text-cyan-500
                    dark:text-cyan-400
                  "
                >
                  ✦
                </span>

                <div>
                  <h4
                    className="
                      text-xs
                      font-semibold
                      text-gray-800
                      dark:text-gray-200
                    "
                  >
                    Subscription Plans
                  </h4>

                  <p
                    className="
                      mt-1
                      text-[10px]
                      leading-5
                      text-gray-500
                      dark:text-gray-600
                    "
                  >
                    Free, Bronze, Silver and Gold
                    plans with watch limits and
                    invoice emails.
                  </p>
                </div>
              </motion.div>

              {/* 04 */}
              <motion.div
                whileHover={{ x: 4 }}
                className="flex gap-3"
              >
                <span
                  className="
                    mt-1
                    text-cyan-500
                    dark:text-cyan-400
                  "
                >
                  ✦
                </span>

                <div>
                  <h4
                    className="
                      text-xs
                      font-semibold
                      text-gray-800
                      dark:text-gray-200
                    "
                  >
                    Authentication & Theme
                  </h4>

                  <p
                    className="
                      mt-1
                      text-[10px]
                      leading-5
                      text-gray-500
                      dark:text-gray-600
                    "
                  >
                    Location/time based theme
                    behaviour with state-based OTP
                    authentication.
                  </p>
                </div>
              </motion.div>

              {/* 05 */}
              <motion.div
                whileHover={{ x: 4 }}
                className="flex gap-3"
              >
                <span
                  className="
                    mt-1
                    text-cyan-500
                    dark:text-cyan-400
                  "
                >
                  ✦
                </span>

                <div>
                  <h4
                    className="
                      text-xs
                      font-semibold
                      text-gray-800
                      dark:text-gray-200
                    "
                  >
                    Gesture Video Controls
                  </h4>

                  <p
                    className="
                      mt-1
                      text-[10px]
                      leading-5
                      text-gray-500
                      dark:text-gray-600
                    "
                  >
                    Tap gestures for seeking, pause,
                    next video, comments and website
                    controls.
                  </p>
                </div>
              </motion.div>

              {/* 06 */}
              <motion.div
                whileHover={{ x: 4 }}
                className="flex gap-3"
              >
                <span
                  className="
                    mt-1
                    text-cyan-500
                    dark:text-cyan-400
                  "
                >
                  ✦
                </span>

                <div>
                  <h4
                    className="
                      text-xs
                      font-semibold
                      text-gray-800
                      dark:text-gray-200
                    "
                  >
                    Real-Time Communication
                  </h4>

                  <p
                    className="
                      mt-1
                      text-[10px]
                      leading-5
                      text-gray-500
                      dark:text-gray-600
                    "
                  >
                    Video calls, YouTube screen
                    sharing and local call recording.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* -----------------------------------
              FINAL TAKEAWAY
          ----------------------------------- */}

          <motion.div
            variants={itemAnimation}
            className="
              mt-7
              border-t
              border-gray-200
              pt-5
              dark:border-white/[0.07]
            "
          >
            <p
              className="
                text-xs
                leading-6
                text-gray-500
                dark:text-gray-500
              "
            >
              <span
                className="
                  font-medium
                  text-gray-700
                  dark:text-gray-300
                "
              >
                Internship takeaway —
              </span>{" "}
              strengthened my full-stack development
              skills through real-world payments,
              authentication, UX interactions and
              real-time features.
            </p>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}