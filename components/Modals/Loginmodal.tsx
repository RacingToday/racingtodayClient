import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
} from "@chakra-ui/react";
import { handleAuth } from "../../lib/account";
import AlertComponent from "../Alerts/Alert";
import { useLogin } from "../../contexts/LoginContext";

const LoginModal = (props: any) => {
  const { isOpen, onClose, setAlert, alert } = props;

  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [registerPassword, setRegisterPassword] = React.useState("");

  const { loggedIn, setLoggedIn } = useLogin();

  async function initiateAuth(isLogin: boolean) {
    await handleAuth(
      isLogin ? loginEmail : registerEmail,
      isLogin ? loginPassword : registerPassword,
      isLogin,
      setLoggedIn,
      onClose,
      setAlert
    );

    if (loggedIn) {
      setLoginEmail("");
      setLoginPassword("");
      setRegisterEmail("");
      setRegisterPassword("");
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {alert && !loggedIn && (
          <AlertComponent
            type="error"
            message="Incorrect email or password"
            setState={setAlert}
          />
        )}
        <Tabs>
          <TabList>
            <Tab>Login</Tab>
            <Tab>Create Account</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ModalHeader>Login</ModalHeader>
              <ModalBody
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    initiateAuth(true);
                  }
                }}
              >
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type={"email"}
                    value={loginEmail}
                    placeholder="Enter your email here"
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type={"password"}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    value={loginPassword}
                    placeholder="password"
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => initiateAuth(true)}
                  type="submit"
                  colorScheme="blue"
                  mr={3}
                >
                  Login
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </TabPanel>
            <TabPanel>
              <ModalHeader>Create Account</ModalHeader>
              <ModalBody
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    initiateAuth(false);
                  }
                }}
              >
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type={"email"}
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    name="lEmail"
                    placeholder="Enter your email here"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Account Password</FormLabel>
                  <Input
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    value={registerPassword}
                    placeholder="password"
                    type={"password"}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => initiateAuth(false)}
                  colorScheme="blue"
                  mr={3}
                >
                  Create Account
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
