import React, { SetStateAction } from "react";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import MobileHeader from "./MobileHeader";

import Header from "./Header";
import { RaceDay } from "../../lib/types";

const ResponsiveHeader = (props: any) => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  return isLargerThan768 ? (
    <Header {...props} />
  ) : (
    <div
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 100,
      }}
    >
      <MobileHeader {...props} />
    </div>
  );
};

export default ResponsiveHeader;
