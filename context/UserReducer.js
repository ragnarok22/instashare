export const initialState = {
  username: "",
  name: "",
};

export const UserReducer = (state, action) => {
  switch (action.type) {
    case "init_stored": {
      return action.value;
    }
    case "login": {
      return {
        ...state,
        username: action.value,
      };
    }
  }
};
