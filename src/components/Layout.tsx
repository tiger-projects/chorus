import React, { useRef } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Logo from "../images/logo.svg";
import { Link } from "gatsby";
import { useGlobalContext } from "../context/languageContext";
import LanguageToggle from "./LanguageToggle";
import Dropdown from "./Dropdown";
import { GatsbyImage } from "gatsby-plugin-image";
import { motion } from "framer-motion";

interface LayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  location?: Location;
}

const Layout: React.FC<LayoutProps> = ({ location, children }) => {
  const currentPath = location?.pathname;

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

  const data = useStaticQuery(
    graphql`
      query HeaderQuery {
        allSanityRoster(sort: { orderRank: ASC }) {
          edges {
            node {
              id
              englishProjectTitle
              japaneseProjectTitle
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

  const handleDropdownClose = () => {
    setDropdownOpen(false);
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

  const extractedRosterItems = rosterItems.map((item: any) => {
    const { id, englishProjectTitle, japaneseProjectTitle, featuredImage } =
      item.node;
    return {
      id,
      englishProjectTitle,
      japaneseProjectTitle,
      featuredImage,
    };
  });

  const getFeaturedImage = (title: string) => {
    const selectedItem = extractedRosterItems.find(
      language === "en"
        ? (item: any) => item.englishProjectTitle === title
        : (item: any) => item.japaneseProjectTitle === title
    );
    return selectedItem?.featuredImage?.asset.gatsbyImageData || null;
  };

  const displayedImage = hoveredProjectTitle
    ? getFeaturedImage(hoveredProjectTitle)
    : null;

  return (
    <div id="app">
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
                className="navbar-main--link"
                style={getLinkStyle("/mission/")}
                to="/mission"
                onClick={handleDropdownClose}
              >
                {getTranslation("nav_link_one")}
              </Link>

              <Dropdown
                currentPath={currentPath || ""}
                setDropdownOpen={setDropdownOpen}
                isDropdownOpen={isDropdownOpen}
                hoveredProjectTitle={hoveredProjectTitle}
                setHoveredProjectTitle={setHoveredProjectTitle}
                rosterItems={rosterItems}
              />

              <Link
                style={getLinkStyle("/contact/")}
                to="/contact"
                onClick={handleDropdownClose}
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
          <div className="roster-image-container">
            <GatsbyImage
              className="roster-image"
              image={displayedImage}
              alt="Featured image"
              objectFit="cover"
            />
          </div>
        )}
      </header>
      <motion.main
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          ease: "linear",
          duration: 0.3,
        }}
      >
        {!isDropdownOpen && children}
      </motion.main>
      <footer>
        <Link to="/">
          <Logo />
        </Link>
      </footer>
    </div>
  );
};

export default Layout;
