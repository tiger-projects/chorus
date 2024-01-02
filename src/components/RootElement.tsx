import React from "react";
import { Provider } from "../context/languageContext";

const RootElement = ({ children }: { children: React.ReactNode }) => (
  <Provider>{children}</Provider>
);

export default RootElement;
