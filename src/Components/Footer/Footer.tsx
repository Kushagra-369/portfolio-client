import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Eye,
  Heart,
  Sparkles,
  MapPin,
  Phone,
  Code,
  ExternalLink,
  Users,
  GitBranch,
  Star,
  BookOpen,
  Trophy,
  Flame,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { APIURL } from "../../GlobalAPIURL";
import { useTheme } from "../../Context/ThemeContext";

// ==================== Types ====================
interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
}

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  acceptanceRate: number;
}

export default function Footer() {
  const { theme } = useTheme();
  const isLove = theme === "love";
  const isHorror = theme === "horror";

  const [visitors, setVisitors] = useState<number>(0);
  const [githubUser, setGithubUser] = useState<GitHubUser | null>(null);
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const [leetcodeStats, setLeetcodeStats] = useState<LeetCodeStats | null>(null);
  const [loadingGithub, setLoadingGithub] = useState<boolean>(true);
  const [loadingLeetcode, setLoadingLeetcode] = useState<boolean>(true);

  // ==================== Visitor tracking ====================
  useEffect(() => {
    axios
      .post(`${APIURL}/track_visitor`, {}, { withCredentials: true })
      .then((res) => {
        console.log("👀 Total visitors:", res.data.totalVisitors);
        setVisitors(res.data.totalVisitors);
      })
      .catch((error) => {
        console.error("❌ Visitor tracking failed:", error);
      });
  }, []);

  // ==================== LeetCode live data ====================
  useEffect(() => {
    const fetchLeetcode = async () => {
      try {
        const res = await axios.get(
          "https://leetinfo-api.vercel.app/api/user?username=Kushagra-369"
        );
        const stats = res.data?.matchedUser?.submitStats?.acSubmissionNum;
        if (stats) {
          const all = stats.find((x: any) => x.difficulty === "All");
          const easy = stats.find((x: any) => x.difficulty === "Easy");
          const medium = stats.find((x: any) => x.difficulty === "Medium");
          const hard = stats.find((x: any) => x.difficulty === "Hard");
          setLeetcodeStats({
            totalSolved: all?.count ?? 0,
            easySolved: easy?.count ?? 0,
            mediumSolved: medium?.count ?? 0,
            hardSolved: hard?.count ?? 0,
            ranking: res.data?.matchedUser?.profile?.ranking ?? 0,
            acceptanceRate: 0,
          });
        }
      } catch (err) {
        console.error("❌ LeetCode fetch failed:", err);
      } finally {
        setLoadingLeetcode(false);
      }
    };
    fetchLeetcode();
  }, []);

  // ==================== GitHub live data ====================
  useEffect(() => {
    const fetchGithub = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          axios.get("https://api.github.com/users/Kushagra-369"),
          axios.get(
            "https://api.github.com/users/Kushagra-369/repos?per_page=100&type=owner&sort=updated"
          ),
        ]);
        setGithubUser(userRes.data);
        setGithubRepos(reposRes.data);
      } catch (err) {
        console.error("❌ GitHub fetch failed:", err);
      } finally {
        setLoadingGithub(false);
      }
    };
    fetchGithub();
  }, []);

  const totalStars = githubRepos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );

  const currentYear = new Date().getFullYear();

  const contactInfo = [
    {
      icon: <Phone className="w-4 h-4" />,
      text: "+91 9468436924",
      href: "tel:+919468436924",
    },
    {
      icon: <Mail className="w-4 h-4" />,
      text: "kushagra369chhabra@gmail.com",
      href: "mailto:kushagra369chhabra@gmail.com",
    },
    {
      icon: <MapPin className="w-4 h-4" />,
      text: "India",
      href: "#",
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/Kushagra-369",
      icon: Github,
      color: "hover:text-gray-900 dark:hover:text-white",
      bgColor: "hover:bg-gray-900",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/kushagra-chhabra-83b215355/",
      icon: Linkedin,
      color: "hover:text-blue-600",
      bgColor: "hover:bg-blue-600",
    },
    {
      name: "LeetCode",
      url: "https://leetcode.com/u/Kushagra-369/",
      icon: Code,
      color: "hover:text-orange-500",
      bgColor: "hover:bg-orange-500",
    },
    {
      name: "Email",
      url: "mailto:kushagra369chhabra@gmail.com",
      icon: Mail,
      color: "hover:text-red-500",
      bgColor: "hover:bg-red-500",
    },
  ];

  return (
    <footer className="relative w-full mt-20 overflow-hidden">
      {/* ============ THEME FONTS + TEXT GLOW ============ */}
      <style>
        {`
          /* HORROR — glowing white-red text */
          .footer-horror-text,
          .footer-horror-text * {
            font-family: 'Creepster', 'Nosifer', 'Eater', 'Butcherman', cursive !important;
            letter-spacing: 0.08em !important;
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
            text-shadow:
              0 0 4px #ffdddd,
              0 0 10px #ff3333,
              0 0 20px #ff0000,
              0 0 40px #cc0000,
              0 0 80px #8b0000,
              0 4px 2px #000 !important;
          }
          .footer-horror-text-soft,
          .footer-horror-text-soft * {
            font-family: 'Creepster', 'Nosifer', cursive !important;
            color: #ffdddd !important;
            -webkit-text-fill-color: #ffdddd !important;
            text-shadow:
              0 0 6px #ff3333,
              0 0 16px #cc0000,
              0 0 32px #8b0000,
              0 2px 2px #000 !important;
          }

          /* LOVE — dark rose text + pink glow */
          .footer-love-text,
          .footer-love-text * {
            font-family: 'Dancing Script', 'Great Vibes', cursive !important;
            letter-spacing: 0.02em !important;
            color: #7a0038 !important;
            -webkit-text-fill-color: #7a0038 !important;
            text-shadow:
              0 0 6px rgba(255, 182, 213, 0.9),
              0 0 14px rgba(244, 114, 182, 0.7),
              0 1px 0 rgba(255, 255, 255, 0.6) !important;
          }
          .footer-love-text-soft,
          .footer-love-text-soft * {
            font-family: 'Dancing Script', cursive !important;
            color: #8b0040 !important;
            -webkit-text-fill-color: #8b0040 !important;
            text-shadow:
              0 0 6px rgba(244, 114, 182, 0.55),
              0 1px 0 rgba(255, 255, 255, 0.55) !important;
          }
        `}
      </style>

      {/* Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Creepster&family=Nosifer&family=Eater&family=Butcherman&family=Dancing+Script:wght@400;700&family=Great+Vibes&display=swap"
      />

      {/* Animated Background */}
      <div
        className="
          absolute inset-0
          bg-linear-to-t from-gray-100 via-gray-50 to-white
          dark:from-slate-950 dark:via-blue-950/30 dark:to-cyan-950/20
          love:from-pink-100 love:via-rose-50 love:to-pink-50
          horror:from-zinc-900 horror:via-neutral-900 horror:to-black
        "
      />

      {/* Animated Orbs */}
      <motion.div
        className="
          absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl
          bg-cyan-400/20
          love:bg-pink-400/30
          horror:bg-red-800/40
        "
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="
          absolute -bottom-20 -right-20 w-72 h-72 rounded-full blur-3xl
          bg-blue-500/20
          love:bg-rose-500/30
          horror:bg-red-950/50
        "
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 py-16 px-4 sm:px-8 font-['Outfit']">
        <div className="max-w-7xl mx-auto">
          {/* ==================== Top Bar ==================== */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-14">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="
                  inline-flex items-center gap-3 px-6 py-2 rounded-full backdrop-blur-md shadow-lg border
                  bg-linear-to-r from-cyan-500/10 to-blue-500/10 border-cyan-400/30
                  love:from-pink-500/20 love:to-rose-500/20 love:border-pink-400/50
                  horror:from-red-900/50 horror:to-black/60 horror:border-red-700/80
                  horror:shadow-[0_0_22px_rgba(255,20,20,0.55)]
                "
              >
                <Sparkles
                  className="
                    w-4 h-4 animate-pulse
                    text-cyan-500
                    love:text-pink-400
                    horror:text-red-400
                  "
                />
                <span
                  className={`
                    text-sm font-semibold tracking-wider
                    text-cyan-600 dark:text-cyan-400
                    love:text-pink-800
                    horror:text-red-200
                    ${isHorror ? "footer-horror-text-soft" : ""}
                    ${isLove ? "footer-love-text-soft" : ""}
                  `}
                >
                  PORTFOLIO
                </span>
                <Sparkles
                  className="
                    w-4 h-4 animate-pulse
                    text-cyan-500
                    love:text-pink-400
                    horror:text-red-400
                  "
                />
              </div>
            </motion.div>

            {/* Visitor Counter */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
            >
              <div
                className="
                  flex items-center gap-3 px-6 py-2 rounded-full backdrop-blur-md shadow-lg border
                  bg-linear-to-r from-cyan-500/10 to-blue-500/10 border-cyan-400/30
                  love:from-pink-500/20 love:to-rose-500/20 love:border-pink-400/50
                  horror:from-red-900/50 horror:to-black/60 horror:border-red-700/80
                  horror:shadow-[0_0_22px_rgba(255,20,20,0.55)]
                "
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Eye
                    className="
                      text-cyan-500
                      love:text-pink-400
                      horror:text-red-400
                    "
                  />
                </motion.div>
                <span
                  className={`
                    text-sm font-semibold
                    text-cyan-600 dark:text-cyan-400
                    love:text-pink-800
                    horror:text-red-200
                    ${isHorror ? "footer-horror-text-soft" : ""}
                    ${isLove ? "footer-love-text-soft" : ""}
                  `}
                >
                  {visitors.toLocaleString()} Visitors
                </span>
              </div>
            </motion.div>
          </div>

          {/* ==================== Main Grid ==================== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 mb-14 items-stretch">
            {/* === Column 1: Profile & Contact === */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col"
            >
              <div
                className="
                  p-6 rounded-2xl border backdrop-blur-md shadow-lg h-full
                  border-cyan-400/20 bg-white/40 dark:bg-white/5
                  love:border-pink-400/50 love:bg-pink-50/60
                  horror:border-red-700/70 horror:bg-black/60
                  horror:shadow-[0_0_25px_rgba(255,20,20,0.4)]
                "
              >
                <div className="flex items-center gap-4 mb-4">
                  {githubUser?.avatar_url && (
                    <img
                      src={githubUser.avatar_url}
                      alt="Kushagra Chhabra"
                      className="
                        w-14 h-14 rounded-full border-2 shadow-md
                        border-cyan-400/40
                        love:border-pink-400/70
                        horror:border-red-500/80
                      "
                      loading="lazy"
                    />
                  )}
                  <div>
                    <h2
                      className={`
                        text-xl font-bold
                        bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent
                        ${isHorror ? "footer-horror-text" : ""}
                        ${isLove ? "footer-love-text" : ""}
                      `}
                    >
                      Kushagra Chhabra
                    </h2>
                    <p
                      className={`
                        text-xs font-semibold
                        text-cyan-600 dark:text-cyan-400
                        love:text-pink-700
                        horror:text-red-300
                        ${isHorror ? "footer-horror-text-soft" : ""}
                        ${isLove ? "footer-love-text-soft" : ""}
                      `}
                    >
                      Full Stack Developer | MERN Stack
                    </p>
                  </div>
                </div>

                <p
                  className={`
                    text-sm leading-relaxed mb-5
                    text-gray-600 dark:text-gray-400
                    love:text-pink-800
                    horror:text-red-200
                    ${isHorror ? "footer-horror-text-soft" : ""}
                    ${isLove ? "footer-love-text-soft" : ""}
                  `}
                >
                  Full Stack Developer specializing in MERN stack with strong
                  expertise in backend engineering, scalable system design, and
                  API development.
                </p>

                <div className="space-y-2 mb-5">
                  {contactInfo.map((info, idx) => (
                    <motion.a
                      key={idx}
                      href={info.href}
                      whileHover={{ x: 4 }}
                      className={`
                        flex items-center gap-2 text-sm transition-colors
                        text-gray-600 dark:text-gray-400 hover:text-cyan-500
                        love:text-pink-800 love:hover:text-pink-500
                        horror:text-red-200 horror:hover:text-red-400
                      `}
                    >
                      <span
                        className="
                          text-cyan-500
                          love:text-pink-500
                          horror:text-red-500
                        "
                      >
                        {info.icon}
                      </span>
                      <span className="truncate">{info.text}</span>
                    </motion.a>
                  ))}
                </div>

                <div
                  className="
                    inline-flex items-center gap-2 px-3 py-1.5 rounded-full border
                    bg-green-500/10 border-green-500/30
                    love:bg-pink-500/15 love:border-pink-500/50
                    horror:bg-red-900/40 horror:border-red-700/70
                  "
                >
                  <div
                    className="
                      w-2 h-2 rounded-full animate-pulse
                      bg-green-500
                      love:bg-pink-500
                      horror:bg-red-500
                    "
                  />
                  <span
                    className={`
                      text-xs font-medium
                      text-green-600 dark:text-green-400
                      love:text-pink-700
                      horror:text-red-300
                      ${isHorror ? "footer-horror-text-soft" : ""}
                      ${isLove ? "footer-love-text-soft" : ""}
                    `}
                  >
                    Open for opportunities
                  </span>
                </div>
              </div>
            </motion.div>

            {/* === Column 2: GitHub === */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col"
            >
              <div
                className="
                  p-6 rounded-2xl border backdrop-blur-md shadow-lg h-full flex flex-col
                  border-cyan-400/20 bg-white/40 dark:bg-white/5
                  love:border-pink-400/50 love:bg-pink-50/60
                  horror:border-red-700/70 horror:bg-black/60
                  horror:shadow-[0_0_25px_rgba(255,20,20,0.4)]
                "
              >
                <div className="flex items-center justify-between mb-5">
                  <h3
                    className={`
                      text-lg font-semibold flex items-center gap-2
                      bg-linear-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent
                      ${isHorror ? "footer-horror-text" : ""}
                      ${isLove ? "footer-love-text" : ""}
                    `}
                  >
                    <Github
                      className="
                        w-5 h-5
                        text-cyan-500
                        love:text-pink-500
                        horror:text-red-500
                      "
                    />{" "}
                    GitHub Activity
                  </h3>
                  <motion.a
                    href="https://github.com/Kushagra-369"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="
                      transition-colors
                      text-cyan-500 hover:text-cyan-400
                      love:text-pink-500 love:hover:text-pink-400
                      horror:text-red-500 horror:hover:text-red-400
                    "
                  >
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                </div>

                {loadingGithub ? (
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="
                          p-3 rounded-xl animate-pulse border
                          bg-cyan-500/5 border-cyan-400/10
                          love:bg-pink-500/10 love:border-pink-400/20
                          horror:bg-red-900/30 horror:border-red-700/40
                        "
                      >
                        <div
                          className="
                            h-3 w-16 rounded mb-2
                            bg-cyan-400/20
                            love:bg-pink-400/30
                            horror:bg-red-700/40
                          "
                        />
                        <div
                          className="
                            h-2 w-10 rounded
                            bg-cyan-400/10
                            love:bg-pink-400/20
                            horror:bg-red-800/30
                          "
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {[
                      { label: "Followers", value: githubUser?.followers ?? 0, icon: <Users className="w-3.5 h-3.5" /> },
                      { label: "Following", value: githubUser?.following ?? 0, icon: <Users className="w-3.5 h-3.5" /> },
                      { label: "Repositories", value: githubUser?.public_repos ?? 0, icon: <GitBranch className="w-3.5 h-3.5" /> },
                      { label: "Total Stars", value: totalStars, icon: <Star className="w-3.5 h-3.5" /> },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.03, y: -2 }}
                        className="
                          p-3 rounded-xl border text-center
                          bg-cyan-500/5 border-cyan-400/20
                          love:bg-pink-500/10 love:border-pink-400/40
                          horror:bg-red-900/30 horror:border-red-700/60
                        "
                      >
                        <div
                          className="
                            flex items-center justify-center gap-1.5 mb-1
                            text-cyan-500
                            love:text-pink-500
                            horror:text-red-500
                          "
                        >
                          {stat.icon}
                          <span
                            className="
                              text-base font-bold
                              text-cyan-600 dark:text-cyan-400
                              love:text-pink-800
                              horror:text-red-200
                            "
                          >
                            {stat.value}
                          </span>
                        </div>
                        <p
                          className="
                            text-[11px]
                            text-gray-500 dark:text-gray-400
                            love:text-pink-700
                            horror:text-red-300
                          "
                        >
                          {stat.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}

                <div
                  className="
                    rounded-xl p-3 overflow-hidden mt-auto border
                    bg-white/60 dark:bg-gray-900/40 border-cyan-400/15
                    love:bg-pink-100/70 love:border-pink-400/40
                    horror:bg-black/60 horror:border-red-800/60
                  "
                >
                  <p
                    className="
                      text-[11px] font-semibold mb-2 flex items-center gap-1
                      text-gray-500 dark:text-gray-400
                      love:text-pink-700
                      horror:text-red-300
                    "
                  >
                    <GitBranch
                      className="
                        w-3 h-3
                        text-cyan-500
                        love:text-pink-500
                        horror:text-red-500
                      "
                    />{" "}
                    Contributions (Last Year)
                  </p>
                  <img
                    src="https://ghchart.rshah.org/06b6d4/Kushagra-369"
                    alt="Kushagra's GitHub Contribution Graph"
                    className="w-full h-auto rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>

            {/* === Column 3: LeetCode === */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col"
            >
              <div
                className="
                  p-6 rounded-2xl border backdrop-blur-md shadow-lg h-full flex flex-col
                  border-cyan-400/20 bg-white/40 dark:bg-white/5
                  love:border-pink-400/50 love:bg-pink-50/60
                  horror:border-red-700/70 horror:bg-black/60
                  horror:shadow-[0_0_25px_rgba(255,20,20,0.4)]
                "
              >
                <div className="flex items-center justify-between mb-5">
                  <h3
                    className={`
                      text-lg font-semibold flex items-center gap-2
                      bg-linear-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent
                      ${isHorror ? "footer-horror-text" : ""}
                      ${isLove ? "footer-love-text" : ""}
                    `}
                  >
                    <Code
                      className="
                        w-5 h-5
                        text-orange-500
                        love:text-pink-500
                        horror:text-red-500
                      "
                    />{" "}
                    LeetCode Activity
                  </h3>
                  <motion.a
                    href="https://leetcode.com/u/Kushagra-369/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="
                      transition-colors
                      text-cyan-500 hover:text-cyan-400
                      love:text-pink-500 love:hover:text-pink-400
                      horror:text-red-500 horror:hover:text-red-400
                    "
                  >
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                </div>

                {loadingLeetcode ? (
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="
                          p-3 rounded-xl animate-pulse border
                          bg-cyan-500/5 border-cyan-400/10
                          love:bg-pink-500/10 love:border-pink-400/20
                          horror:bg-red-900/30 horror:border-red-700/40
                        "
                      >
                        <div className="h-3 w-16 bg-cyan-400/20 rounded mb-2" />
                        <div className="h-2 w-10 bg-cyan-400/10 rounded" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {[
                      { label: "Total Solved", value: leetcodeStats?.totalSolved ?? 0, icon: <Trophy className="w-3.5 h-3.5" />, color: "text-cyan-500 love:text-pink-500 horror:text-red-500" },
                      { label: "Easy", value: leetcodeStats?.easySolved ?? 0, icon: <BookOpen className="w-3.5 h-3.5" />, color: "text-green-500 love:text-pink-400 horror:text-red-400" },
                      { label: "Medium", value: leetcodeStats?.mediumSolved ?? 0, icon: <BookOpen className="w-3.5 h-3.5" />, color: "text-yellow-500 love:text-rose-400 horror:text-red-300" },
                      { label: "Hard", value: leetcodeStats?.hardSolved ?? 0, icon: <Flame className="w-3.5 h-3.5" />, color: "text-red-500 love:text-pink-600 horror:text-red-600" },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.03, y: -2 }}
                        className="
                          p-3 rounded-xl border text-center
                          bg-cyan-500/5 border-cyan-400/20
                          love:bg-pink-500/10 love:border-pink-400/40
                          horror:bg-red-900/30 horror:border-red-700/60
                        "
                      >
                        <div className={`flex items-center justify-center gap-1.5 mb-1 ${stat.color}`}>
                          {stat.icon}
                          <span className="text-base font-bold">{stat.value}</span>
                        </div>
                        <p
                          className="
                            text-[11px]
                            text-gray-500 dark:text-gray-400
                            love:text-pink-700
                            horror:text-red-300
                          "
                        >
                          {stat.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}

                <div
                  className="
                    rounded-xl p-3 overflow-hidden mt-auto border
                    bg-white/60 dark:bg-gray-900/40 border-cyan-400/15
                    love:bg-pink-100/70 love:border-pink-400/40
                    horror:bg-black/60 horror:border-red-800/60
                  "
                >
                  <p
                    className="
                      text-[11px] font-semibold mb-2 flex items-center gap-1
                      text-gray-500 dark:text-gray-400
                      love:text-pink-700
                      horror:text-red-300
                    "
                  >
                    <Flame
                      className="
                        w-3 h-3
                        text-orange-500
                        love:text-pink-500
                        horror:text-red-500
                      "
                    />{" "}
                    Submission Heatmap
                  </p>
                  <img
                    src="https://leetcard.jacoblin.cool/Kushagra-369?theme=dark&font=Outfit&ext=heatmap&border=0&radius=12&width=500&height=180"
                    alt="Kushagra's LeetCode Heatmap"
                    className="w-full h-auto rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* ==================== Social Links ==================== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <div
                    className={`
                      absolute -inset-2 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300
                      bg-linear-to-r from-cyan-500 to-blue-500
                      love:from-pink-500 love:to-rose-500
                      horror:from-red-700 horror:to-red-900
                    `}
                  />
                  <div
                    className="
                      relative p-3 rounded-full border transition-all duration-300
                      bg-white/10 dark:bg-gray-900/50 border-cyan-400/30 group-hover:border-cyan-400
                      love:bg-pink-100/50 love:border-pink-400/50 love:group-hover:border-pink-500
                      horror:bg-black/60 horror:border-red-700/70 horror:group-hover:border-red-500
                    "
                  >
                    <social.icon
                      className={`
                        w-5 h-5 transition-colors
                        text-gray-600 dark:text-gray-400
                        love:text-pink-800
                        horror:text-red-200
                        ${social.color}
                      `}
                    />
                  </div>
                  <span
                    className="
                      absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity
                      text-cyan-500
                      love:text-pink-700
                      horror:text-red-400
                    "
                  >
                    {social.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ==================== Divider ==================== */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            className="
              h-px
              bg-linear-to-r from-transparent via-cyan-400/50 to-transparent
              love:via-pink-400/60
              horror:via-red-700/70
            "
          />

          {/* ==================== Bottom ==================== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-8 text-center"
          >
            <p
              className={`
                text-sm
                text-gray-500 dark:text-gray-400
                love:text-pink-800
                horror:text-red-200
                ${isHorror ? "footer-horror-text-soft" : ""}
                ${isLove ? "footer-love-text-soft" : ""}
              `}
            >
              © {currentYear} Kushagra Chhabra. All Rights Reserved.
            </p>
            <motion.p
              whileHover={{ scale: 1.02 }}
              className={`
                text-xs mt-2 flex items-center justify-center gap-1 flex-wrap
                text-gray-400 dark:text-gray-500
                love:text-pink-700
                horror:text-red-300
                ${isHorror ? "footer-horror-text-soft" : ""}
                ${isLove ? "footer-love-text-soft" : ""}
              `}
            >
              Built with{" "}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart
                  className="
                    w-3 h-3 fill-current
                    text-red-500
                    love:text-pink-500
                    horror:text-red-600
                  "
                />
              </motion.span>{" "}
              using React, TypeScript, Tailwind CSS & Framer Motion
            </motion.p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}