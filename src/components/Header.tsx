import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "gatsby";
// import Dropdown from "./Dropdown";
import LanguageToggle from "./LanguageToggle";
import { useGlobalContext } from "../context/languageContext";
import { GatsbyImage } from "gatsby-plugin-image";

interface HeaderProps {
  pallete: any;
  isDropdownOpen: boolean;
  setDropdownOpen: (isOpen: boolean) => void;
  currentPath?: string;
  hoveredProjectTitle: string | null;
  setHoveredProjectTitle: (title: string | null) => void;
  activeLink: string;
  setActiveLink: (link: string) => void;
  rosterItems: any;
  extractedRosterItems: any;
  footerHeight: number;
}

const Header: React.FC<HeaderProps> = ({
  pallete,
  isDropdownOpen,
  setDropdownOpen,
  currentPath,
  hoveredProjectTitle,
  setHoveredProjectTitle,
  activeLink,
  setActiveLink,
  rosterItems,
}) => {
  const { getTranslation } = useGlobalContext();
  const pageWrapRef = useRef<HTMLDivElement>(null);

  const handleMouseWheel = (event: any) => {
    if (pageWrapRef.current) {
      pageWrapRef.current.scrollLeft -= event.deltaY * 40;
    }
  };

  const handleLinkClick = (link: string) => {
    if ((currentPath ?? "").includes(link)) {
      setDropdownOpen(false);
    }
    setActiveLink(link);
  };

  const getLinkStyle = (path: string) => {
    return {
      color: isDropdownOpen
        ? "#c8c9c2"
        : currentPath === path || currentPath === "/"
        ? "white"
        : "#c8c9c2",
      filter: isDropdownOpen
        ? "invert(0)"
        : currentPath === path || currentPath === "/"
        ? "invert(0)"
        : "invert(1)",
    };
  };

  const darkPaletteStyle = pallete ? {} : {};

  return (
    <header>
      <div
        id="page-wrap"
        style={{
          overflowX: isDropdownOpen ? "initial" : "auto",
          whiteSpace: "nowrap",
        }}
        ref={pageWrapRef}
        onWheel={handleMouseWheel}
      >
        <div
          className="navbar"
          style={{
            mixBlendMode: isDropdownOpen ? "initial" : "difference",
            filter: pallete ? "invert(1)" : "invert(0)",
          }}
        >
          <div className="center-links">
            <Link
              id="navbar-main--link"
              style={getLinkStyle("/mission/")}
              to="/mission"
              onClick={() => handleLinkClick("mission")}
              className={activeLink === "mission" ? "activeLink" : ""}
            >
              {getTranslation("nav_link_one")}
            </Link>

            {/* <Dropdown
              darkPaletteStyle={darkPaletteStyle}
              currentPath={currentPath || ""}
              setDropdownOpen={setDropdownOpen}
              isDropdownOpen={isDropdownOpen}
              hoveredProjectTitle={hoveredProjectTitle}
              setHoveredProjectTitle={setHoveredProjectTitle}
              rosterItems={rosterItems}
            /> */}

            <Link
              id="navbar-main--link"
              to="/contact"
              onClick={() => handleLinkClick("contact")}
              style={getLinkStyle("/contact/")}
              className={activeLink === "contact" ? "activeLink" : ""}
            >
              {getTranslation("nav_link_three")}
            </Link>
          </div>
          <div className="language-toggle">
            <LanguageToggle isDropdownOpen={isDropdownOpen} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
