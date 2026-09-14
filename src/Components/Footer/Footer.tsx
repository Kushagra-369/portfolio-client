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
  const [visitors, setVisitors] = useState<number>(0);
  const [githubUser, setGithubUser] = useState<GitHubUser | null>(null);
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const [leetcodeStats, setLeetcodeStats] = useState<LeetCodeStats | null>(null);
  const [loadingGithub, setLoadingGithub] = useState<boolean>(true);
  const [loadingLeetcode, setLoadingLeetcode] = useState<boolean>(true);

  // ==================== Visitor tracking ====================
  useEffect(() => {
    axios
      .post(
        `${APIURL}/track_visitor`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setVisitors(res.data.totalVisitors);
      })
      .catch((error) => {
        console.error("❌ Visitor tracking failed:", error);
      });
  }, []);

  useEffect(() => {
    const fetchLeetcode = async () => {
      try {
        const res = await axios.get(
          "https://leetinfo-api.vercel.app/api/user?username=Kushagra-369"
        );

        console.log("✅ LeetCode API:", res.data);

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

  // ==================== Fetch GitHub live data ====================
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



  // ==================== Computed stats ====================
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
      {/* Animated Background */}
      <div className="absolute inset-0 bg-linear-to-t from-gray-100 via-gray-50 to-white dark:from-slate-950 dark:via-blue-950/30 dark:to-cyan-950/20" />

      {/* Animated Orbs */}
      <motion.div
        className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
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
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-linear-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 backdrop-blur-md shadow-lg">
                <Sparkles className="w-4 h-4 text-cyan-500 animate-pulse" />
                <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 tracking-wider">
                  PORTFOLIO
                </span>
                <Sparkles className="w-4 h-4 text-cyan-500 animate-pulse" />
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
            >
              <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-linear-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 backdrop-blur-md shadow-lg">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Eye className="text-cyan-500" />
                </motion.div>
                <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                  {visitors.toLocaleString()} Visitors
                </span>
              </div>
            </motion.div>
          </div>

          {/* ==================== Main Grid: 3 Columns ==================== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 mb-14 items-stretch">
            {/* ========== Column 1: Profile & Contact ========== */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col"
            >
              <div className="p-6 rounded-2xl border border-cyan-400/20 bg-white/40 dark:bg-white/5 backdrop-blur-md shadow-lg h-full">
                {/* Avatar + Name */}
                <div className="flex items-center gap-4 mb-4">
                  {githubUser?.avatar_url && (
                    <img
                      src={githubUser.avatar_url}
                      alt="Kushagra Chhabra"
                      className="w-14 h-14 rounded-full border-2 border-cyan-400/40 shadow-md"
                      loading="lazy"
                    />
                  )}
                  <div>
                    <h2 className="text-xl font-bold bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                      Kushagra Chhabra
                    </h2>
                    <p className="text-cyan-600 dark:text-cyan-400 text-xs font-semibold">
                      Full Stack Developer | MERN Stack
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5">
                  Full Stack Developer specializing in MERN stack with strong
                  expertise in backend engineering, scalable system design, and
                  API development.
                </p>

                {/* Contact */}
                <div className="space-y-2 mb-5">
                  {contactInfo.map((info, idx) => (
                    <motion.a
                      key={idx}
                      href={info.href}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm hover:text-cyan-500 transition-colors"
                    >
                      <span className="text-cyan-500">{info.icon}</span>
                      <span className="truncate">{info.text}</span>
                    </motion.a>
                  ))}
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                    Open for opportunities
                  </span>
                </div>
              </div>
            </motion.div>

            {/* ========== Column 2: GitHub Activity (LIVE) ========== */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col"
            >
              <div className="p-6 rounded-2xl border border-cyan-400/20 bg-white/40 dark:bg-white/5 backdrop-blur-md shadow-lg h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-semibold bg-linear-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent flex items-center gap-2">
                    <Github className="w-5 h-5 text-cyan-500" /> GitHub Activity
                  </h3>
                  <motion.a
                    href="https://github.com/Kushagra-369"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="text-cyan-500 hover:text-cyan-400 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                </div>

                {/* Stats Grid */}
                {loadingGithub ? (
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-400/10 animate-pulse"
                      >
                        <div className="h-3 w-16 bg-cyan-400/20 rounded mb-2" />
                        <div className="h-2 w-10 bg-cyan-400/10 rounded" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {[
                      {
                        label: "Followers",
                        value: githubUser?.followers ?? 0,
                        icon: <Users className="w-3.5 h-3.5" />,
                      },
                      {
                        label: "Following",
                        value: githubUser?.following ?? 0,
                        icon: <Users className="w-3.5 h-3.5" />,
                      },
                      {
                        label: "Repositories",
                        value: githubUser?.public_repos ?? 0,
                        icon: <GitBranch className="w-3.5 h-3.5" />,
                      },
                      {
                        label: "Total Stars",
                        value: totalStars,
                        icon: <Star className="w-3.5 h-3.5" />,
                      },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.03, y: -2 }}
                        className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-400/20 text-center"
                      >
                        <div className="flex items-center justify-center gap-1.5 mb-1 text-cyan-500">
                          {stat.icon}
                          <span className="text-base font-bold text-cyan-600 dark:text-cyan-400">
                            {stat.value}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">
                          {stat.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Contribution Graph (LIVE) */}
                <div className="rounded-xl bg-white/60 dark:bg-gray-900/40 border border-cyan-400/15 p-3 mb-4 overflow-hidden">
                  <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1">
                    <GitBranch className="w-3 h-3 text-cyan-500" /> Contributions (Last Year)
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

            {/* ========== Column 3: LeetCode Activity (LIVE) ========== */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col"
            >
              <div className="p-6 rounded-2xl border border-cyan-400/20 bg-white/40 dark:bg-white/5 backdrop-blur-md shadow-lg h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-semibold bg-linear-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent flex items-center gap-2">
                    <Code className="w-5 h-5 text-orange-500" /> LeetCode Activity
                  </h3>
                  <motion.a
                    href="https://leetcode.com/u/Kushagra-369/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="text-cyan-500 hover:text-cyan-400 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                </div>

                {/* Stats Grid (LIVE) */}
                {loadingLeetcode ? (
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-400/10 animate-pulse"
                      >
                        <div className="h-3 w-16 bg-cyan-400/20 rounded mb-2" />
                        <div className="h-2 w-10 bg-cyan-400/10 rounded" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {[
                      {
                        label: "Total Solved",
                        value: leetcodeStats?.totalSolved ?? 0,
                        icon: <Trophy className="w-3.5 h-3.5" />,
                        color: "text-cyan-500",
                      },
                      {
                        label: "Easy",
                        value: leetcodeStats?.easySolved ?? 0,
                        icon: <BookOpen className="w-3.5 h-3.5" />,
                        color: "text-green-500",
                      },
                      {
                        label: "Medium",
                        value: leetcodeStats?.mediumSolved ?? 0,
                        icon: <BookOpen className="w-3.5 h-3.5" />,
                        color: "text-yellow-500",
                      },
                      {
                        label: "Hard",
                        value: leetcodeStats?.hardSolved ?? 0,
                        icon: <Flame className="w-3.5 h-3.5" />,
                        color: "text-red-500",
                      },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.03, y: -2 }}
                        className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-400/20 text-center"
                      >
                        <div
                          className={`flex items-center justify-center gap-1.5 mb-1 ${stat.color}`}
                        >
                          {stat.icon}
                          <span className="text-base font-bold">{stat.value}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">
                          {stat.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* LeetCode Heatmap (LIVE) */}
                <div className="rounded-xl bg-white/60 dark:bg-gray-900/40 border border-cyan-400/15 p-3 overflow-hidden mt-auto">
                  <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-500" /> Submission Heatmap
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
                    className={`absolute -inset-2 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300 ${social.bgColor}`}
                  />
                  <div className="relative p-3 bg-white/10 dark:bg-gray-900/50 rounded-full border border-cyan-400/30 group-hover:border-cyan-400 transition-all duration-300">
                    <social.icon
                      className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-colors ${social.color}`}
                    />
                  </div>
                  <span className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs text-cyan-500 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
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
            className="h-px bg-linear-to-r from-transparent via-cyan-400/50 to-transparent"
          />

          {/* ==================== Bottom ==================== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {currentYear} Kushagra Chhabra. All Rights Reserved.
            </p>
            <motion.p
              whileHover={{ scale: 1.02 }}
              className="text-xs text-gray-400 dark:text-gray-500 mt-2 flex items-center justify-center gap-1 flex-wrap"
            >
              Built with{" "}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              </motion.span>{" "}
              using React, TypeScript, Tailwind CSS & Framer Motion
            </motion.p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}