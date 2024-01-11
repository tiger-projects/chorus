import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useGlobalContext } from "../context/languageContext";
import { motion } from "framer-motion";
import { useWindowSize } from "react-use";
import Footer from "./Footer";
import Header from "./Header";
import { GatsbyImage } from "gatsby-plugin-image";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";

interface LayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  location?: Location;
  overflow?: boolean;
  index?: boolean;
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
    `mix-blend-mode: multiply;

      @media only screen and (min-width: 900px) {
        height: 100vh;
      }
    `}
`;

const Layout: React.FC<LayoutProps> = ({
  location,
  children,
  overflow,
  index,
}) => {
  const [displayedImage, setDisplayedImage] = useState<any | null>(null);
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
        backgroundColor: "#555853",
      }
    : {
        backgroundColor: "#e8e9e1",
      };

  React.useEffect(() => {
    if (hoveredProjectTitle) {
      const selectedItem = extractedRosterItems.find(
        (item: any) => item.englishProjectTitle === hoveredProjectTitle
      );
      if (selectedItem) {
        const { id, featuredImage } = selectedItem;
        const gatsbyImageData = featuredImage?.asset.gatsbyImageData;

        if (gatsbyImageData) {
          setDisplayedImage(null);
          setTimeout(() => {
            setDisplayedImage({ id, gatsbyImageData });
          }, 300);
        }
      }
    }
  }, [hoveredProjectTitle]);

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
          transition: { duration: 0.4 },
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
        overflow && !isDropdownOpen ? "overflow-scroll" : ""
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
      <AnimatePresence>
        {displayedImage && (
          <StyledDiv
            as={motion.div}
            key={displayedImage.id}
            exit={{
              opacity: 1,
              filter: "blur(10px)",
              transition: {
                delay: 0,
                duration: 0.3,
                ease: "easeOut",
              },
            }}
            initial={{ opacity: 0.2, filter: "blur(10px)" }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              transition: {
                delay: 0,
                duration: 0.3,
                ease: "easeIn",
              },
            }}
            height={height}
            footerHeight={footerHeight}
            isDropdownOpen={isDropdownOpen}
            palette
            className="roster-image-motion-container"
          >
            <div className="roster-image-container" key={displayedImage.id}>
              <GatsbyImage
                key={displayedImage.id}
                style={{ height: "100%" }}
                imgStyle={{ height: "100%", mixBlendMode: "multiply" }}
                className={`roster-image ${pallete ? "dark" : "light"}`}
                image={displayedImage.gatsbyImageData}
                alt="Featured image"
                objectFit="contain"
              />
            </div>
          </StyledDiv>
        )}
      </AnimatePresence>

      <motion.main
        style={{
          height: index
            ? "100vh - 50px"
            : `calc(100vh - ${footerHeight}px - 44px - 1.5rem)`,
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
