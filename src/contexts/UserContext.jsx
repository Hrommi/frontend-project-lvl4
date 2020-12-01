import React from 'react';
import cookies from 'js-cookie';
import faker from 'faker';

const NICKNAME_COOCKIE = 'nickname';

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const nickname = cookies.get(NICKNAME_COOCKIE) || faker.internet.userName();
  cookies.set(NICKNAME_COOCKIE, nickname);

  return (
    <UserContext.Provider value={{ nickname }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("'useUser' must be within a 'UserProvider'");
  }
  return context;
};

export default UserProvider;
