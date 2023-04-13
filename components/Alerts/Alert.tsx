/** @format */

import {
  Alert,
  AlertDescription,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";

interface AlertProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function AlertComponent(props: AlertProps) {
  const { type, message, setState } = props;

  return (
    <Alert
      mb={3}
      status={type}
      pos={"absolute"}
      top={"20"}
      zIndex={1}
      variant={"solid"}
    >
      <AlertIcon />
      <AlertDescription>{message}</AlertDescription>
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        onClick={() => setState(false)}
      />
    </Alert>
  );
}
