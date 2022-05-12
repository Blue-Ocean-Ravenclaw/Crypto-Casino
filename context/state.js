import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.js";

import axios from "axios";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export function AppWrapper({ children }) {
  const [results, setResults] = useState({});
  const [renderWallet, setRenderWallet] = useState(false);
  const { currentUser } = useAuth();

  let contextObj = {
    stateResults: results,
    stateRenderWallet: setRenderWallet
  }

  useEffect(() => {
    axios
    .get(`/api/userpage/${currentUser && currentUser.email}`)
    // axios
    //   .get(`/api/userpage/varun@varun.com`)
      .then((res) => setResults(res.data))
      .catch((err) => console.log(err));
  }, [renderWallet]);

  return <AppContext.Provider value={contextObj}>{children}</AppContext.Provider>;
}
