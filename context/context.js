import React, { createContext, useState } from "react";
import axios from "axios";
const IndexContext = createContext();

const IndexProvider = ({ children }) => {
  const [state, setState] = useState({
    title: "ACTUELLEMENT",
  });

  // config axios
  axios.defaults.baseURL = "https://api.tv7guide.com/api";

  return (
    <IndexContext.Provider value={[state, setState]}>
      {children}
    </IndexContext.Provider>
  );
};

export { IndexContext, IndexProvider };
