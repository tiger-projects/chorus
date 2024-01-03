import React from "react";
import { motion } from "framer-motion";
import { Link } from "gatsby";
import Logo from "../images/logo.svg";
import InvertedLogo from "../images/logo-white.svg";

interface FooterProps {
  pallete: any;
  isDropdownOpen: boolean;
  currentPath?: string;
}

const Footer: React.FC<FooterProps> = ({ pallete, isDropdownOpen }) => {
  const darkFooterPalette = pallete
    ? {
        color: "#FAFBF9",
        opacity: 0.8,
        filter: "invert(100%) brightness(100%)",
      }
    : {};

  return (
    <footer style={{ ...darkFooterPalette }}>
      <Link
        style={{ background: isDropdownOpen ? "transparent" : "#e8e9e1" }}
        className="footer-link"
        to="/"
      >
        {pallete ? <InvertedLogo /> : <Logo />}
      </Link>
    </footer>
  );
};

export default Footer;
