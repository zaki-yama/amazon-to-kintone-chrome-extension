import React from "react";
import { Text as ReactLDSText } from "react-lightning-design-system";

type Props = {
  type?: "error";
};

export const Text: React.FC<Props> = ({ type, children }) => {
  const className = type === "error" ? "slds-text-color_error" : "";
  return <ReactLDSText className={className}>{children}</ReactLDSText>;
};
