import React from "react";
import { useGlobalContext } from "../context/languageContext";
import { motion, AnimatePresence } from "framer-motion";

interface Translation {
  en: Record<string, string>;
  jp: Record<string, string>;
}

interface DropdownProps {
  rosterItems: any;
  isDropdownOpen: boolean;
  setDropdownOpen: (isOpen: boolean) => void;
  hoveredProjectTitle: string | null;
  currentPath: string;
  setHoveredProjectTitle: (title: string | null) => void;
  darkPaletteStyle: any;
}

const Dropdown: React.FC<DropdownProps> = ({
  rosterItems,
  isDropdownOpen,
  setDropdownOpen,
  setHoveredProjectTitle,
  currentPath,
  darkPaletteStyle,
}) => {
  const { language, getTranslation } = useGlobalContext();

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  //Create translation object for all roster items
  const translation: Translation = Object.values(
    rosterItems
  ).reduce<Translation>(
    (result, item: any, index: number) => {
      const { englishProjectTitle, japaneseProjectTitle } = item.node;

      // Add English translation
      result.en = result.en || {};
      result.en[`item${index + 1}`] = englishProjectTitle;

      // Add Japanese translation
      if (japaneseProjectTitle !== null) {
        result.jp = result.jp || {};
        result.jp[`item${index + 1}`] = japaneseProjectTitle;
      }

      return result;
    },
    { en: {}, jp: {} }
  );

  const handleMouseEnter = (title: string) => {
    setHoveredProjectTitle(title);
  };

  const handleMouseLeave = () => {
    setHoveredProjectTitle(null);
  };

  const rosterItemsSelectedLang = translation[language];

  const itemList = Object.entries(rosterItemsSelectedLang).map(
    ([key, value], index) => {
      return (
        <motion.li
          whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
          whileTap={{ scale: 0.9 }}
          key={index}
          onMouseEnter={() => handleMouseEnter(value)}
          onMouseLeave={() => handleMouseLeave()}
        >
          <a href="#">{value}</a>
        </motion.li>
      );
    }
  );

  return (
    <div className={`dropdown ${isDropdownOpen ? "open" : ""}`}>
      <motion.a
        href="#"
        style={darkPaletteStyle}
        id="navbar-main--link"
        onClick={handleDropdownToggle}
        exit={{ opacity: "#c8c9c2" }}
        initial={{ color: "#c8c9c2" }}
        animate={{
          color: currentPath === "/" || isDropdownOpen ? "#000" : "#c8c9c2",
          transition: { delay: 0, duration: 0.3, ease: "easeInOut" },
        }}
      >
        {getTranslation("nav_link_two")}
      </motion.a>
      {isDropdownOpen && (
        <motion.div
          key="dropdown"
          exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
          initial={{ opacity: 0, y: -10, filter: "blur(0px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            type: "spring",
            delay: 0.1,
            duration: 0.3,
            ease: "easeIn",
          }}
        >
          <div
            className="dropdown-content"
            style={{
              background: isDropdownOpen ? "transparent" : "#c8c9c2",
            }}
          >
            <ul
              style={darkPaletteStyle}
              className={`${language}-font roterItemsList`}
            >
              {itemList}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dropdown;
