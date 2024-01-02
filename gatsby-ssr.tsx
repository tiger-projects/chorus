import * as React from "react";

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="preload"
      href="/fonts/ChromaSTTrial-Bold.woff"
      as="font"
      type="font/woff"
      crossOrigin="anonymous"
      key="chromas"
    />,
    <link
      rel="preload"
      href="/fonts/GaramondNarrowC.woff"
      as="font"
      type="font/woff"
      crossOrigin="anonymous"
      key="garamond"
    />,
  ]);
};
