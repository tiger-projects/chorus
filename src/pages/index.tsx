import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "../components/Layout";
import "../styles/global.css";
import { useGlobalContext } from "../context/languageContext";

const IndexPage: React.FC<PageProps> = ({ data, location }) => {
  const { getTranslation } = useGlobalContext();

  return (
    <Layout
      location={location}
      title={"Chorus Homepage"}
      description="Chorus description"
    >
      <div className="page-container__home">
        <p>{getTranslation("home_text")}</p>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>Chorus </title>{" "}
    <meta
      name="description"
      content={
        "CHORUS is a ecosystem dedicated to uplifting and connecting Asian music and culture with the world. Founded by renowned Asian executives, CHORUS strives to support Asian artists and their teams to achieve true resonance worldwide."
      }
    />
    <link rel="apple-touch-icon" sizes="200x200" href="/apple-touch-icon.png" />
    <link
      rel="apple-touch-icon-precomposed"
      href="https://venerable-blini-d2f5ee.netlify.app/Thumbnail.png"
    />
    <meta property="og:title" content="Chorus" />
    <meta
      property="og:description"
      content="CHORUS is a ecosystem dedicated to uplifting and connecting Asian music and culture with the world. Founded by renowned Asian executives, CHORUS strives to support Asian artists and their teams to achieve true resonance worldwide."
    />
    <meta
      property="og:image"
      content={"https://venerable-blini-d2f5ee.netlify.app/Share.png"}
    />
    <meta name="pinterest-rich-pin" content="false" />
  </>
);
