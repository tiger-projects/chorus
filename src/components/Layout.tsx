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
  height: number;
}

const StyledDiv = styled.div<LinkStyleProps>`
  background: ${(props: any) =>
    props.isDropdownOpen ? "transparent" : "#e8e9e1"};
  height: calc(
    ${(props: any) => props.height}px - ${(props: any) => props.footerHeight}px -
      44px
  );
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
    ? {
        backgroundColor: "#6B6E69",
      }
    : {
        backgroundColor: "#e8e9e1",
      };

  const displayedImage = hoveredProjectTitle
    ? getFeaturedImage(hoveredProjectTitle)
    : null;

  const handleMouseEnter = (title: string) => {
    setHoveredProjectTitle(title);
  };

  const handleMouseLeave = () => {
    setHoveredProjectTitle(null);
  };

  const itemList = Object.entries(rosterItems).map(([key, value], index) => {
    return (
      <motion.li
        whileHover={{
          color: pallete ? "#000" : "#000",
          transition: { duration: 0.5 },
        }}
        whileTap={{ color: pallete ? "#000" : "#000" }}
        initial={{ color: "#c8c9c2" }}
        key={index}
        onMouseEnter={() =>
          handleMouseEnter((value as any).node.englishProjectTitle)
        }
        onMouseLeave={() => handleMouseLeave()}
      >
        <a
          className={`${
            hoveredProjectTitle === (value as any).node.englishProjectTitle
              ? `roster-list-items-project-hovered ${
                  pallete ? "dark" : "light"
                }`
              : hoveredProjectTitle !== null
              ? `roster-list-items-hovered ${pallete ? "dark" : "light"}`
              : ""
          }`}
          href="#"
        >
          {(value as any).node.englishProjectTitle}
        </a>{" "}
      </motion.li>
    );
  });

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
          height={height}
          footerHeight={footerHeight}
          isDropdownOpen={isDropdownOpen}
          palette
          className="roster-image-motion-container"
        >
          <motion.div
            className="roster-image-container"
            key={displayedImage.id}
            exit={{ opacity: 0, filter: "blur(100px)" }}
            initial={{ opacity: 0, filter: "blur(100px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ ease: "circInOut", duration: 0.6 }}
          >
            <GatsbyImage
              key={displayedImage.id}
              style={{ height: "100%" }}
              imgStyle={{ height: "100%", mixBlendMode: "multiply" }}
              className={`roster-image ${pallete ? "dark" : "light"}`}
              image={displayedImage.gatsbyImageData}
              alt="Featured image"
              objectFit="contain"
            />
          </motion.div>
        </StyledDiv>
      )}
      <motion.main
        style={{
          height: `calc(100vh - ${footerHeight}px - 44px)`,
        }}
        key={(currentPath || "") + isDropdownOpen}
        exit={{ opacity: 0, filter: "blur(0px)" }}
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{
          type: "Spring",
          duration: 0.3,
          ease: "easeIn",
        }}
      >
        {isDropdownOpen && (
          <motion.div
            className="dropdown-content-container"
            key="dropdown"
            exit={{ opacity: 0, filter: "blur(10px)" }}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{
              type: "spring",
              duration: 0.3,
              ease: "easeIn",
            }}
          >
            <ul
              style={{
                background: isDropdownOpen ? "transparent" : "#c8c9c2",
              }}
              className={`${language}-font roterItemsList dropdown-content`}
            >
              {itemList}
            </ul>
          </motion.div>
        )}
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
