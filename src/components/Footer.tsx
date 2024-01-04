import React, { useRef } from "react";
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
  footerHeight: number;
  setFooterHeight: (height: number) => void;
}

const Footer: React.FC<FooterProps> = ({
  pallete,
  isDropdownOpen,
  setFooterHeight,
  footerHeight,
}) => {
  const { language } = useGlobalContext();

  const linkRef = useRef<HTMLAnchorElement | null>(null);

  const darkFooterPalette = pallete
    ? {
        color: "#FAFBF9",
        opacity: 0.8,
        filter: "invert(100%) brightness(100%)",
      }
    : {};

  React.useEffect(() => {
    const getLinkSize = () => {
      if (linkRef.current) {
        const linkSize = linkRef.current.getBoundingClientRect();
        console.log("Link height:", linkSize.height);
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
    <footer style={{ ...darkFooterPalette }}>
      <Link
        ref={linkRef}
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
