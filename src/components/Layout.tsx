import React, { useRef, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Logo from "../images/logo.svg";
import InvertedLogo from "../images/logo-white.svg";
import { Link } from "gatsby";
import { useGlobalContext } from "../context/languageContext";
import LanguageToggle from "./LanguageToggle";
import Dropdown from "./Dropdown";
import { GatsbyImage } from "gatsby-plugin-image";
import { AnimatePresence, motion, Spring, Variants } from "framer-motion";

interface LayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  location?: Location;
}

interface FeaturedImage {
  id: string;
  gatsbyImageData: any;
}

const Layout: React.FC<LayoutProps> = ({ location, children }) => {
  const pageWrapRef = useRef<HTMLDivElement>(null);

  const handleMouseWheel = (event: any) => {
    if (pageWrapRef.current) {
      pageWrapRef.current.scrollLeft -= event.deltaY * 40;
    }
  };

  const [isDropdownOpen, setDropdownOpen] = React.useState(false);
  const { language, getTranslation } = useGlobalContext();
  const [hoveredProjectTitle, setHoveredProjectTitle] = React.useState<
    string | null
  >(null);
  const [activeLink, setActiveLink] = React.useState("");

  const data = useStaticQuery(
    graphql`
      query HeaderQuery {
        allSanityRoster(sort: { orderRank: ASC }) {
          edges {
            node {
              id
              englishProjectTitle
              japaneseProjectTitle
              darkPalette
              featuredImage {
                asset {
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
    `
  );

  const rosterItems = data.allSanityRoster.edges;

  if (!data || !data.allSanityRoster) {
    console.error("Data is undefined or empty");
    return null;
  }

  const currentPath = location?.pathname;

  const getLinkStyle = (path: string) => {
    return {
      color: isDropdownOpen
        ? "#c8c9c2"
        : currentPath === path || currentPath === "/"
        ? "black"
        : "#c8c9c2",
    };
  };

  const handleLinkClick = (link: string) => {
    if ((currentPath ?? "").includes(link)) {
      setDropdownOpen(false);
    }
    setActiveLink(link);
  };

  const extractedRosterItems = rosterItems.map((item: any) => {
    const {
      id,
      englishProjectTitle,
      japaneseProjectTitle,
      featuredImage,
      darkPalette,
    } = item.node;
    return {
      id,
      englishProjectTitle,
      japaneseProjectTitle,
      featuredImage,
      darkPalette,
    };
  });

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

  const getPalette = (title: string) => {
    const selectedItem = extractedRosterItems.find(
      language === "en"
        ? (item: any) =>
            item.darkPalette !== true && item.englishProjectTitle === title
        : (item: any) =>
            item.darkPalette !== true && item.japaneseProjectTitle === title
    );
    return selectedItem;
  };

  const pallete = hoveredProjectTitle ? getPalette(hoveredProjectTitle) : null;

  // console.log("pallete", pallete);

  const darkPaletteStyle = pallete ? { filter: "invert(100%)" } : {};
  const darkPaletteBackground = pallete
    ? { background: "rgba(107, 110, 105 .8) " }
    : {};

  const darkImage = pallete ? { filter: "brightness(50%)" } : {};

  const darkFooterPalette = pallete
    ? {
        color: "#FAFBF9",
        opacity: 0.8,
        filter: "invert(100%) brightness(100%)",
      }
    : {};

  return (
    <div style={darkPaletteBackground} className={`${language}-font app`}>
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
          <div className="roster-image-container" style={darkImage}>
            <motion.div
              className="roster-image"
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
      <motion.main
        key={currentPath}
        exit={{ opacity: 0, filter: "blur(0px)" }}
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{
          type: "Spring",
          duration: 0.3,
          ease: "easeIn",
        }}
      >
        {!isDropdownOpen && children}
      </motion.main>

      <motion.footer
        style={{ ...darkFooterPalette }}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3, ease: "easeIn" }}
      >
        <Link
          style={{ background: isDropdownOpen ? "transparent" : "#e8e9e1" }}
          className="footer-link"
          to="/"
        >
          {pallete ? <InvertedLogo /> : <Logo />}
        </Link>
      </motion.footer>
    </div>
  );
};

export default Layout;
