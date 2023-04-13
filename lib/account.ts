import { loginUser } from "./dataFetchHelpers";

export const handleLogin = async (email: any, password: any, onSuccess: () => void) => {
  try {
    // Replace the following line with your authentication logic:
    const isAuthenticated: any = await loginUser(email, password);

    if (isAuthenticated) {
      onSuccess();
      const { jwt } = isAuthenticated
      localStorage.setItem("jwt", jwt);
    } else {
      alert("Invalid email or password");
    }
  } catch (error) {
    console.error("Error occurred while logging in:", error);
    alert("An error occurred while logging in. Please try again.");
  }
};
import { createNewUser } from "./dataFetchHelpers";
  interface newUser {
        jwt: string;
      }
export const handleAccountCreation = async (email: any, password: any, onSuccess: () => void) => {
  try {
    // Replace the following line with your account creation logic:
    const newUser: any = await createNewUser(email, password);

    if (newUser) {
    
      onSuccess();
      const { jwt } = newUser
      localStorage.setItem("jwt", jwt);
      

    } else {
      alert("Account creation failed. Please try again.");
    }
  } catch (error) {
    console.error("Error occurred while creating an account:", error);
    alert("An error occurred while creating an account. Please try again.");
  }
};

