import { createContext, useContext } from "react";

export const loginContext = createContext({
  isLoggedIn: false,
  changeStatus: ()=>{}
});

export const LoginContextProvider = loginContext.Provider;

export default function useLoginContext() {
  return useContext(loginContext);
}
