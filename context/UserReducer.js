export const initialState = {
  username: "",
  token: "",
};

export const UserReducer = (state, action) => {
  switch (action.type) {
    case "init_stored": {
      return action.value;
    }
    case "login": {
      return {
        ...state,
        token: action.value,
      };
    }
  }
};
