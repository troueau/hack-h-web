import { createContext, useState } from "react";
import { auth } from "./config/configFirebase";
export const UserContext = createContext(
  { email: '', 
    isAuth: false, 
    snack: {
      isOpen: false,
      message: '',
      action: ''
    } });
export const UserConsumer = UserContext.Consumer;

export const UserProvider = ({ children }) => {
    const [authenticatedUser, setAuthenticatedUser] = useState(() =>
            localStorage.getItem('authenticatedUser') ? 
                JSON.parse(localStorage.getItem('authenticatedUser')) :
                null
        );
    const successLogin = (email) => {
        let obj = {
            email,
            isAuth: true
        };
        setAuthenticatedUser(obj);
        
        // updae localstorage
        localStorage.setItem('authenticatedUser', JSON.stringify(obj));
    };
  
    // update context after success logout
    const successLogout = () => {
        auth.signOut().then(() => {
            setAuthenticatedUser({
                email: '',
                isAuth: false
              });
        });

        // clear localStorage
        localStorage.removeItem('authenticatedUser');
    };

    const successAddUpdate = (txt) => {
      setAuthenticatedUser({
        ...authenticatedUser,
        snack: {
          isOpen: true,
          message: txt,
          action: "success"
        }
      })

    }

    const afterClose = () => {
      setAuthenticatedUser({
        ...authenticatedUser,
        snack: {
          isOpen: false,
          message: '',
          action : ''
        }
      })
    }

    const errorAction = (txt) => {
      setAuthenticatedUser({
        ...authenticatedUser,
        snack: {
          isOpen: true,
          message: txt,
          action: "error"
        }
      })
    }
  
    return (
      <UserContext.Provider value={{ authenticatedUser, successLogin, successLogout, successAddUpdate, afterClose, errorAction }}>
        {children}
      </UserContext.Provider>
    );
  }