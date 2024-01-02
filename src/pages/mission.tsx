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
    <title>Chorus </title>{" "}
    <meta
      name="description"
      content={
        "CHORUS is a new ecosystem dedicated to uplifting and connecting Asian music and culture with the world.Founded by renowned Asian executives, CHORUS strives to support Asian artists and their teams to achieve true resonance worldwide. Our vision is to advance the representation and celebration of Asian music from across the continent and diaspora, and elevate its place on the global stage."
      }
    />
    <meta property="og:image" content={"/src/images/Share.png"} />{" "}
  </>
);
