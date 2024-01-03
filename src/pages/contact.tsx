import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "../components/Layout";
import "../styles/global.css";

const ContactPage: React.FC<PageProps> = ({ location }) => {
  return (
    <Layout
      location={location}
      title={"Chorus Mission Page"}
      description="Chorus description"
    >
      <div className="page-container">
        <p>
          For further enquiries and to request additional details, please email:
          <br />
          <a className="contact_page__links" href="mailto:info@chorus.asia">
            info@chorus.asia
          </a>
        </p>
        <p>
          Follow us on{" "}
          <a className="contact_page__links" href="#">
            Instagram{" "}
          </a>{" "}
          and{" "}
          <a className="contact_page__links" href="#">
            LinkedIn
          </a>
        </p>
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
        "CHORUS is a new ecosystem dedicated to uplifting and connecting Asian music and culture with the world.Founded by renowned Asian executives, CHORUS strives to support Asian artists and their teams to achieve true resonance worldwide. Our vision is to advance the representation and celebration of Asian music from across the continent and diaspora, and elevate its place on the global stage."
      }
    />
    <meta
      property="og:image"
      content={"https://venerable-blini-d2f5ee.netlify.app/Share.png"}
    />
    <meta name="pinterest-rich-pin" content="false" />
  </>
);
