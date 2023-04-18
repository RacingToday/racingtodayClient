import { loginUser, createNewUser } from "./dataFetchHelpers";
type SetStateBoolean = React.Dispatch<React.SetStateAction<boolean>>;

export const handleAuth = async (
  email: string,
  password: string,
  loggedIn: boolean,
  setIsAuthenticated: any,
  onClose: () => void,
  setAlert: SetStateBoolean
) => {
  try {
    let userAuthResult: any;

    if (loggedIn) {
      userAuthResult = await loginUser(email, password);
    } else {
      userAuthResult = await createNewUser(email, password);
    }

    if (!userAuthResult.error && userAuthResult.jwt) {
      const { jwt } = userAuthResult;
      localStorage.setItem("jwt", jwt);
      setIsAuthenticated(true);
      if (setAlert) {
        setAlert(true);
        onClose();
      }
    } else {
      if (loggedIn) {
        setAlert(true);
      } else {
        alert("Invalid email or password");
      }
      setIsAuthenticated(false);
    }
  } catch (error) {
    console.error("Error occurred while handling authentication:", error);
    alert("An error occurred while handling authentication. Please try again.");
    if (setAlert) {
      setAlert(true);
    }
  }
};
