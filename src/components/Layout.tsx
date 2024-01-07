import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useGlobalContext } from "../context/languageContext";
import { motion } from "framer-motion";
import { useWindowSize } from "react-use";
import Footer from "./Footer";
import Header from "./Header";
import { GatsbyImage } from "gatsby-plugin-image";
import styled from "styled-components";

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

interface LinkStyleProps {
  isDropdownOpen: boolean;
  palette?: boolean;
  footerHeight: number;
}

const StyledDiv = styled.div<LinkStyleProps>`
  background: ${(props: any) =>
    props.isDropdownOpen ? "transparent" : "#e8e9e1"};
  height: calc(100vh - ${(props: any) => props.footerHeight}px - 44px);
  ${(props: any) =>
    props.palette &&
    `filter: brightness(50%);

      @media only screen and (min-width: 900px) {
        height: 100vh;
      }
    `}
`;

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
    ? { backgroundColor: "rgba(85, 88, 83, 0.9)" }
    : { backgroundColor: "#e8e9e1" };

  const displayedImage = hoveredProjectTitle
    ? getFeaturedImage(hoveredProjectTitle)
    : null;

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
        <StyledDiv
          footerHeight={footerHeight}
          isDropdownOpen={isDropdownOpen}
          palette
          className="roster-image-motion-container"
        >
          <motion.div
            className="roster-image-container"
            key={displayedImage.id}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3, ease: "easeIn" }}
          >
            <GatsbyImage
              style={{ height: "100%" }}
              imgStyle={{ height: "100%" }}
              className="roster-image"
              image={displayedImage.gatsbyImageData}
              alt="Featured image"
              objectFit="cover"
            />
          </motion.div>
        </StyledDiv>
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
        hoveredProjectTitle={hoveredProjectTitle}
      />
    </motion.div>
  );
};

export default Layout;
