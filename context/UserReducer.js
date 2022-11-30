export const initialState = {
  username: "",
  token: "",
  first_name: "",
  last_name: "",
  email: "",
};

export const UserReducer = (state, action) => {
  switch (action.type) {
    case "init_stored": {
      return action.value;
    }
    case "login": {
      return {
        ...state,
        ...action.value,
      };
    }
    case "logout": {
      return {
        username: "",
        token: "",
        first_name: "",
        last_name: "",
        email: "",
      };
    }
    case "update-user": {
      return {
        ...state,
        ...action.value,
      };
    }
  }
};
