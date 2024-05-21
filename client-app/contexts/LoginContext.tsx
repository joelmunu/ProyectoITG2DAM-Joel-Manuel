import React from 'react'

type LoginContextType = {
  isUserLogged: boolean;
  toggleIsUserLogged: Function;
  email: string;
  setEmail: Function;
}

const LoginContext = React.createContext({} as LoginContextType)

export {LoginContext, LoginContextType as LoginContextType};