import { usePlayerStore } from "@/stores/playerStore";
import { useThemeStore } from "@/stores/themeStore";

import AnimatedLogo from "./AnimatedLogo";
import ThemeToggle from "./ThemeToggle";
import UserIcon from "./UserIcon";

const Navbar = () => {
  const { player, setIsPlayerModalOpen } = usePlayerStore((state) => state);
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="top-0 z-20 pb-2 md:px-0">
      <div className="flex">
        <div className="flex items-center">
          <a
            href="https://www.danielcoles.dev"
            target="_blank"
            rel="noreferrer"
            className="flex focus:shadow-none"
          >
            <AnimatedLogo theme={theme} />
          </a>
          <span className="hidden px-2 md:flex">|</span>
          <img
            className="mr-2 hidden h-10 w-10 md:flex"
            src="/assets/estimator-logo.png"
            alt="logo"
            loading="lazy"
          />
          <div className="hidden font-bold md:flex">STORY ESTIMATOR</div>
        </div>
        <div className="ml-auto flex space-x-4">
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <UserIcon
            player={player}
            onEdit={() => setIsPlayerModalOpen(true)}
            theme={theme}
            setTheme={setTheme}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
