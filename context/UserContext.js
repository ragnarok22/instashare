import {
  useEffect,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { initialState, UserReducer } from "./UserReducer";

const UserContext = createContext();

export function UserWrapper({ children }) {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  console.log(state);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("state"))) {
      // cheching if there already is a state in localstorage
      // if yes, update the current state with the stored one
      dispatch({
        type: "init_stored",
        value: JSON.parse(localStorage.getItem("state")),
      });
    }
  }, []);

  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem("state", JSON.stringify(state));
    }
    //create and/or set a new localstorage variable called "state"
  }, [state]);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
export function useUserContext() {
  return useContext(UserContext);
}
