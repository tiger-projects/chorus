import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "../components/Layout";
import "../styles/global.css";
import { useGlobalContext } from "../context/languageContext";

const MissionPage: React.FC<PageProps> = ({ location }) => {
  const { getTranslation } = useGlobalContext();
  const text = getTranslation("mission_text");

  return (
    <Layout
      location={location}
      title={"Chorus Mission Page"}
      description="Chorus description"
    >
      <div className="page-container">
        {typeof text === "string" && <p>{text}</p>}
        {typeof text === "object" && (
          <>
            {Object.keys(text).map(function (key: any) {
              return (
                <p className="mission-text" key={key}>
                  {text[key]}
                </p>
              );
            })}
          </>
        )}
      </div>
    </Layout>
  );
};

export default MissionPage;

export const Head: HeadFC = () => (
  <>
    <title>Chorus Mission</title>
    <meta
      name="description"
      content={
        "CHORUS is a ecosystem dedicated to uplifting and connecting Asian music and culture with the world. Founded by renowned Asian executives, CHORUS strives to support Asian artists and their teams to achieve true resonance worldwide."
      }
    />
    <meta property="og:title" content="Chorus" />{" "}
    <meta
      property="og:description"
      content="CHORUS is a ecosystem dedicated to uplifting and connecting Asian music and culture with the world. Founded by renowned Asian executives, CHORUS strives to support Asian artists and their teams to achieve true resonance worldwide."
    />
    <meta
      property="og:image"
      content={"https://venerable-blini-d2f5ee.netlify.app/Share.png"}
    />
    <meta
      property="og:image"
      content={"https://venerable-blini-d2f5ee.netlify.app/Share.png"}
    />
    <meta name="pinterest-rich-pin" content="false" />
  </>
);
