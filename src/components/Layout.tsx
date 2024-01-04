import React, { useRef, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useGlobalContext } from "../context/languageContext";
import { motion } from "framer-motion";
import { useWindowSize } from "react-use";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  location?: Location;
  overflow?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ location, children, overflow }) => {
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

  return (
    <motion.div
      ref={ref}
      style={darkPaletteBackground}
      className={`${language}-font app ${
        overflow === true ? "overflow-scroll" : ""
      }`}
    >
      <Header
        ref={ref}
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
      <Footer
        currentPath={currentPath}
        pallete={pallete}
        isDropdownOpen={isDropdownOpen}
      />
    </motion.div>
  );
};

export default Layout;
