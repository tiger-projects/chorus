import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useGlobalContext } from "../context/languageContext";
import { motion } from "framer-motion";
import { useWindowSize } from "react-use";
import Footer from "./Footer";
import Header from "./Header";
import { GatsbyImage } from "gatsby-plugin-image";

interface LayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  location?: Location;
  overflow?: boolean;
}

interface FeaturedImage {
  id: string;
  gatsbyImageData: any;
}

const Layout: React.FC<LayoutProps> = ({ location, children, overflow }) => {
  const [footerHeight, setFooterHeight] = useState(0);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { language } = useGlobalContext();
  const [hoveredProjectTitle, setHoveredProjectTitle] = useState<string | null>(
    null
  );
  const [activeLink, setActiveLink] = useState("");
  const ref = React.useRef<HTMLDivElement>(null);
  const { height } = useWindowSize();

  React.useEffect(() => {
    if (ref.current) {
      if (currentPath === "/mission/") {
        ref.current.style.height = `100vh`;
      } else {
        ref.current.style.height = `${height}px`;
      }
    }
  }, [height]);

  const data = useStaticQuery(
    graphql`
      query HeaderQuery {
        allSanityRoster(sort: { orderRank: ASC }) {
          edges {
            node {
              id
              englishProjectTitle
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

  const extractedRosterItems = rosterItems.map((item: any) => {
    const { id, englishProjectTitle, featuredImage, darkPalette } = item.node;
    return {
      id,
      englishProjectTitle,
      featuredImage,
      darkPalette,
    };
  });

  const getFeaturedImage = (title: string): FeaturedImage | null => {
    const selectedItem = extractedRosterItems.find(
      (item: any) => item.englishProjectTitle === title
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

  const getPalette = (title: string) => {
    const selectedItem = extractedRosterItems.find(
      (item: any) =>
        item.darkPalette !== true && item.englishProjectTitle === title
    );
    return selectedItem;
  };

  const pallete = hoveredProjectTitle ? getPalette(hoveredProjectTitle) : null;

  const darkPaletteBackground = pallete
    ? { backgroundColor: "rgba(107, 110, 105, 0.7)" }
    : { backgroundColor: "#e8e9e1" };

  const displayedImage = hoveredProjectTitle
    ? getFeaturedImage(hoveredProjectTitle)
    : null;

  const darkImage = pallete ? { filter: "brightness(50%)" } : {};

  const linkStyle = {
    background: isDropdownOpen ? "transparent" : "#e8e9e1",
    height: `calc(100vh - ${footerHeight}px)`,
    ...darkImage,
  };
  return (
    <motion.div
      ref={ref}
      style={darkPaletteBackground}
      className={`${language}-font app ${
        overflow === true ? "overflow-scroll" : ""
      }`}
    >
      <Header
        footerHeight={footerHeight}
        rosterItems={rosterItems}
        extractedRosterItems={extractedRosterItems}
        activeLink={activeLink}
        setActiveLink={setActiveLink}
        isDropdownOpen={isDropdownOpen}
        setDropdownOpen={setDropdownOpen}
        pallete={pallete}
        setHoveredProjectTitle={setHoveredProjectTitle}
        hoveredProjectTitle={hoveredProjectTitle}
        currentPath={currentPath}
      />
      {displayedImage && (
        <div className="roster-image-motion-container" style={linkStyle}>
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
              objectFit="contain"
            />
          </motion.div>
        </div>
      )}
      <motion.main
        style={{ height: `calc(100vh - ${footerHeight}px - 44px)` }}
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
      <Footer
        footerHeight={footerHeight}
        setFooterHeight={setFooterHeight}
        currentPath={currentPath}
        pallete={pallete}
        isDropdownOpen={isDropdownOpen}
      />
    </motion.div>
  );
};

export default Layout;
