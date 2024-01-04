import React from "react";
import { Link } from "gatsby";
import Logo from "../images/logo.svg";
import InvertedLogo from "../images/logo-white.svg";
import LogoJp from "../images/logo-jp.svg";
import InvertedLogoJp from "../images/logo-jp-white.svg";
import { useGlobalContext } from "../context/languageContext";

interface FooterProps {
  pallete: any;
  isDropdownOpen: boolean;
  currentPath?: string;
}

const Footer: React.FC<FooterProps> = ({ pallete, isDropdownOpen }) => {
  const { language } = useGlobalContext();

  const darkFooterPalette = pallete
    ? {
        color: "#FAFBF9",
        opacity: 0.8,
        filter: "invert(100%) brightness(100%)",
      }
    : {};

  console.log(language);
  return (
    <footer style={{ ...darkFooterPalette }}>
      <Link
        style={{ background: isDropdownOpen ? "transparent" : "#e8e9e1" }}
        className="footer-link"
        to="/"
      >
        {language === "en" ? pallete ? <InvertedLogo /> : <Logo /> : null}
        {language === "jp" ? pallete ? <InvertedLogoJp /> : <LogoJp /> : null}
      </Link>
    </footer>
  );
};

export default Footer;
