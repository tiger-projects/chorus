import React, { useRef } from "react";
import { Link } from "gatsby";
import Logo from "../images/logo.svg";
import InvertedLogo from "../images/logo-white.svg";
import LogoJp from "../images/logo-jp.svg";
import InvertedLogoJp from "../images/logo-jp-white.svg";
import { useGlobalContext } from "../context/languageContext";
import { motion } from "framer-motion";

interface FooterProps {
  pallete: any;
  isDropdownOpen: boolean;
  currentPath?: string;
  footerHeight: number;
  setFooterHeight: (height: number) => void;
  hoveredProjectTitle: string | null;
}

interface FooterStyle {
  mixBlendMode?: string;
  filter?: string;
  // Add other properties as needed
}

const Footer: React.FC<FooterProps> = ({
  pallete,
  setFooterHeight,
  hoveredProjectTitle,
}) => {
  const { language } = useGlobalContext();

  const linkRef = useRef<HTMLAnchorElement | null>(null);

  let footerStyle: FooterStyle = {};

  if (hoveredProjectTitle != null) {
    footerStyle.mixBlendMode = "initial";
    // Add other styles to footerStyle if needed
  } else {
    footerStyle.mixBlendMode = "difference";
    footerStyle.filter = "invert(1)";
  }
  const darkFooterPalette = pallete
    ? {
        color: "#E8E9E1",

        filter: " invert(1) ",
      }
    : {
        color: "#FAFBF9",
      };

  React.useEffect(() => {
    const getLinkSize = () => {
      if (linkRef.current) {
        const linkSize = linkRef.current.getBoundingClientRect();
        setFooterHeight(linkSize.height);
      }
    };

    getLinkSize(); // Initial call

    // Create a ResizeObserver to observe changes in the link size
    const resizeObserver = new ResizeObserver(getLinkSize);

    // Attach the ResizeObserver to the link element
    if (linkRef.current) {
      resizeObserver.observe(linkRef.current);
    }

    // Cleanup: disconnect the ResizeObserver when the component is unmounted
    return () => {
      resizeObserver.disconnect();
    };
  }, [linkRef]);

  return (
    <motion.footer
      initial={{ opacity: 0, color: pallete ? "#E8E9E1" : "#FAFBF9" }}
      animate={{
        opacity: 1,
        color: pallete ? "#E8E9E1" : "#FAFBF9",
        filter: pallete ? "invert(1)" : "none",
        transition: { duration: 0.3, delay: 0.1 },
      }}
      exit={{ opacity: 1, transition: { duration: 0.3, delay: 0.1 } }}
    >
      <Link
        style={{ ...footerStyle }}
        ref={linkRef}
        className="footer-link"
        to="/"
      >
        {language === "en" ? (
          pallete ? (
            <InvertedLogo />
          ) : (
            <Logo />
          )
        ) : language === "jp" ? (
          pallete ? (
            <InvertedLogoJp />
          ) : (
            <LogoJp />
          )
        ) : null}
      </Link>
    </motion.footer>
  );
};

export default Footer;
