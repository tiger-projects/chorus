import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "../components/Layout";
import "../styles/global.css";
import { useGlobalContext } from "../context/languageContext";

const ContactPage: React.FC<PageProps> = ({ location }) => {
  const { getTranslation, language } = useGlobalContext();

  const text = getTranslation("contact_text");

  return (
    <Layout
      location={location}
      title={"Chorus Mission Page"}
      description="Chorus description"
    >
      <div
        className={`${language === "jp" && "jp-text"} page-container contact`}
      >
        {typeof text === "string" && <p>{text}</p>}
        {typeof text === "object" && (
          <>
            {Object.keys(text).map(function (key: any) {
              const isEmail = text[key].includes("info@chorus.asia");

              return (
                <p className="contact-text" key={key}>
                  {isEmail ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: text[key].replace(
                          /info@chorus.asia/gi,
                          '<a class="contact_page__links"   href="mailto:info@chorus.asia" target="_blank" rel="noopener noreferrer">info@chorus.asia</a>'
                        ),
                      }}
                    ></span>
                  ) : (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: text[key]
                          .replace(
                            /Instagram/gi,
                            '<a class="contact_page__links" href="https://www.instagram.com/chorusasia/" target="_blank" rel="noopener noreferrer">Instagram</a>'
                          )
                          .replace(
                            /LinkedIn/gi,
                            '<a class="contact_page__links" href="https://www.linkedin.com/company/chorusasia/" target="_blank" rel="noopener noreferrer">LinkedIn</a>'
                          ),
                      }}
                    />
                  )}
                </p>
              );
            })}
          </>
        )}
      </div>
    </Layout>
  );
};

export default ContactPage;

export const Head: HeadFC = () => (
  <>
    <title>Chorus Contact</title>
    <meta
      name="description"
      content={
        "CHORUS is a new ecosystem dedicated to uplifting and connecting Asian music and culture with the world. Founded by renowned Asian executives, CHORUS strives to support Asian artists and their teams to achieve true resonance worldwide. Our vision is to advance the representation and celebration of Asian music from across the continent and diaspora, and elevate its place on the global stage."
      }
    />
    <link
      rel="apple-touch-icon"
      href="https://venerable-blini-d2f5ee.netlify.app/Thumbnail.png"
    />
    <meta
      property="og:image"
      content={"https://venerable-blini-d2f5ee.netlify.app/Thumbnail.png"}
    />
    <meta name="pinterest-rich-pin" content="false" />
    <link
      rel="apple-touch-icon"
      href="https://venerable-blini-d2f5ee.netlify.app/Thumbnail.png"
    />
  </>
);
