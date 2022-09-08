import React, { createContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const IndexContext = createContext();

const IndexProvider = ({ children }) => {
  const [state, setState] = useState({
    title: "ACTUELLEMENT",
    user: {},
    token: "",
  });
  const token = Cookies.get("token");
  // config axios
  axios.defaults.baseURL = "https://api.tv7guide.com/api";
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return (
    <IndexContext.Provider value={[state, setState]}>
      {children}
    </IndexContext.Provider>
  );
};

export { IndexContext, IndexProvider };
