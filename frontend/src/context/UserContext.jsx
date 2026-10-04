import React from "react";
import { createContext, useState } from "react";

export const UserDataContext = createContext();
const UserContext = ({ children }) => {
  const [User, setUser] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
  });
  return (
    <div>
      <UserDataContext.Provider value={{User,setUser}}>
        {children}
      </UserDataContext.Provider>
    </div>
  );
};

export default UserContext;
