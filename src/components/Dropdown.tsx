import React from "react";
import { useGlobalContext } from "../context/languageContext";
import { Link } from "gatsby";
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
}

const Dropdown: React.FC<DropdownProps> = ({
  rosterItems,
  isDropdownOpen,
  setDropdownOpen,
  setHoveredProjectTitle,
  currentPath,
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
        <li
          key={index}
          onMouseEnter={() => handleMouseEnter(value)}
          onMouseLeave={() => handleMouseLeave()}
        >
          <a href="#">{value}</a>
        </li>
      );
    }
  );

  return (
    <div className={`dropdown ${isDropdownOpen ? "open" : ""}`}>
      <a
        href="#"
        onClick={handleDropdownToggle}
        style={{
          color:
            currentPath === "/"
              ? "black"
              : isDropdownOpen
              ? "black"
              : "#c8c9c2",

          transition: " color 0.3s ease",
        }}
      >
        {getTranslation("nav_link_two")}
      </a>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="dropdown-content"
            style={{
              background: isDropdownOpen ? "transparent" : "#c8c9c2",
              transition: "background 0.3s ease",
            }}
          >
            <ul className="roterItemsList">{itemList}</ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
