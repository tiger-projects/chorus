import * as React from "react";
import RootElement from "./src/components/RootElement";

export const wrapRootElement = ({ element }) => (
  <RootElement>{element}</RootElement>
);

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="preload"
      href="/fonts/ChromaST_Bold.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="chromas"
    />,
    <link
      rel="preload"
      href="/fonts/GaramondNarrowC.otf"
      as="font"
      type="font/otf"
      crossOrigin="anonymous"
      key="garamond"
    />,
  ]);
};
