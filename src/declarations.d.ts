// For logo.svg
declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "./src/components/RootElement" {
  import { FunctionComponent, ReactNode } from "react";

  const RootElement: FunctionComponent<{ children: ReactNode }>;

  export default RootElement;
}
