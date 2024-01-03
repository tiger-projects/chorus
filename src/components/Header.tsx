import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "gatsby";
import Dropdown from "./Dropdown";
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
}
interface FeaturedImage {
  id: string;
  gatsbyImageData: any;
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
  extractedRosterItems,
}) => {
  const { language, getTranslation } = useGlobalContext();
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
        ? "black"
        : "#c8c9c2",
    };
  };

  const getFeaturedImage = (title: string): FeaturedImage | null => {
    const selectedItem = extractedRosterItems.find(
      (item: any) =>
        (language === "en" && item.englishProjectTitle === title) ||
        (language === "jp" && item.japaneseProjectTitle === title)
    );

    if (selectedItem) {
      const { id, featuredImage } = selectedItem;
      const gatsbyImageData = featuredImage?.asset.gatsbyImageData;

      if (gatsbyImageData) {
        return { id, gatsbyImageData };
      }
    }

    return null;
  };

  const displayedImage = hoveredProjectTitle
    ? getFeaturedImage(hoveredProjectTitle)
    : null;

  const darkPaletteStyle = pallete ? { filter: "invert(100%)" } : {};

  const darkImage = pallete ? { filter: "brightness(50%)" } : {};

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
        <div className="navbar">
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

            <Dropdown
              darkPaletteStyle={darkPaletteStyle}
              currentPath={currentPath || ""}
              setDropdownOpen={setDropdownOpen}
              isDropdownOpen={isDropdownOpen}
              hoveredProjectTitle={hoveredProjectTitle}
              setHoveredProjectTitle={setHoveredProjectTitle}
              rosterItems={rosterItems}
            />

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
            <LanguageToggle />
          </div>
        </div>
      </div>
      {displayedImage && (
        <div className="roster-image-motion-container" style={darkImage}>
          <motion.div
            className="roster-image-container"
            key={displayedImage.id}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeIn" }}
          >
            <GatsbyImage
              className="roster-image"
              image={displayedImage.gatsbyImageData}
              alt="Featured image"
              objectFit="cover"
            />
          </motion.div>
        </div>
      )}
    </header>
  );
};

export default Header;
