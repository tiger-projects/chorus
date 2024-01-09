import React from "react";
import { useGlobalContext } from "../context/languageContext";
import { motion, AnimatePresence } from "framer-motion";

interface DropdownProps {
  rosterItems: { [key: string]: RosterItem };
  isDropdownOpen: boolean;
  setDropdownOpen: (isOpen: boolean) => void;
  hoveredProjectTitle: string | null;
  currentPath: string;
  setHoveredProjectTitle: (title: string | null) => void;
  darkPaletteStyle: any;
}

interface RosterItem {
  node: {
    englishProjectTitle: string;
  };
}

const Dropdown: React.FC<DropdownProps> = ({
  isDropdownOpen,
  setDropdownOpen,

  currentPath,
  darkPaletteStyle,
}) => {
  const { getTranslation } = useGlobalContext();

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  console.log(currentPath);
  return (
    <div className={`dropdown ${isDropdownOpen ? "open" : ""}`}>
      <motion.a
        key={isDropdownOpen ? "open" : "closed"}
        href="#"
        style={darkPaletteStyle}
        id="navbar-main--link"
        onClick={handleDropdownToggle}
        exit={{ color: "#c8c9c2" }}
        initial={{ color: "#c8c9c2" }}
        animate={{
          color: currentPath === "/" || isDropdownOpen ? "#fff" : "#c8c9c2",
          filter: isDropdownOpen
            ? "invert(1)"
            : currentPath === "/"
            ? "invert(0)"
            : "invert(1)",

          transition: { delay: 0.1, duration: 0.3, ease: "easeInOut" },
        }}
      >
        {getTranslation("nav_link_two")}
      </motion.a>
    </div>
  );
};

export default Dropdown;
