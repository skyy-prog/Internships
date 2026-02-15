import React, { createContext, useState } from "react";

export const AllContexts = createContext();

const AllContext = ({ children }) => {
  const [ishow, setshow] = useState(false);

  const value = {
    ishow,
    setshow
  };

  return (
    <AllContexts.Provider value={value}>
      {children}
    </AllContexts.Provider>
  );
};

export default AllContext;
