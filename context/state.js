import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);


export function AppWrapper({ children }) {
  const [results, setResults] = useState({});

  useEffect(() => {
    axios.get('/api/userpage/varunGod')
      .then((res) => setResults(res.data))
      .catch((err) => console.log(err));
  },[])

  return (
    <AppContext.Provider value={results}>
      {children}
    </AppContext.Provider>
  );
}

