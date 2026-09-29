import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "love" | "horror" | "dark";

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;

  // Cycles:
  // Light → Love → Horror → Dark → Light
  toggleTheme: (x: number, y: number) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

const themes: Theme[] = ["light", "love", "horror", "dark"];

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");

      if (
        saved === "light" ||
        saved === "love" ||
        saved === "horror" ||
        saved === "dark"
      ) {
        return saved;
      }
    }

    return "light";
  });

  /*
   * Apply current theme to <html>
   *
   * Examples:
   * Light  -> <html class="light">
   * Love   -> <html class="love">
   * Horror -> <html class="horror">
   * Dark   -> <html class="dark">
   */
  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("light", "love", "horror", "dark");
    root.classList.add(theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = (x: number, y: number) => {
    const root = document.documentElement;

    const changeTheme = () => {
      setTheme((currentTheme) => {
        const currentIndex = themes.indexOf(currentTheme);

        const nextIndex = (currentIndex + 1) % themes.length;

        return themes[nextIndex];
      });
    };

    /*
     * Browser does not support View Transition
     */
    if (!(document as any).startViewTransition) {
      changeTheme();
      return;
    }

    /*
     * Calculate radius for circular reveal
     */
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    /*
     * Start View Transition
     */
    const transition = (document as any).startViewTransition(() => {
      changeTheme();
    });

    transition.ready.then(() => {
      root.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 700,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === "dark",
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
};