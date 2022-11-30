export const initialState = {
  username: "",
  token: "",
  first_name: "",
  last_name: "",
  email: "",
};

const base_url = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

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
      let picture;
      if (action.value?.picture) {
        picture = base_url + action.value.picture;
      }
      return {
        ...state,
        ...action.value,
        picture,
      };
    }
  }
};
