import axios from "axios";

const DEBUG = process.env.NODE_ENV === "development";
const baseURL =
  (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000") + "/api/";

// set default values
axios.defaults.baseURL = baseURL;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";

// add a request interceptor
axios.interceptors.request.use(
  (config) => {
    // get the Bearer token
    const state = JSON.parse(localStorage.getItem("state"));
    if (state?.token) {
      config.headers.Authorization = `Bearer ${state.token}`;
    }
    if (DEBUG) {
      console.info("✉️ ", config);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// add a response interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // return a message when a connection error is produced
    if (error.code === "ERR_NETWORK") {
      return Promise.reject({
        response: {
          status: "NETWORK_ERROR",
          type: "error",
          message: "Connection Error",
        },
      });
      // redirect to login when a request raises an Unauthorized error
    } else if (error.response.status === 401) {
      localStorage.removeItem("state");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      } else {
        return Promise.reject(error);
      }
      // return a message when a server error is produced
    } else if (error.response.status >= 500) {
      return Promise.reject({
        response: {
          status: "SERVER_ERROR",
          type: "error",
          message: "Internal server error",
        },
      });
      // return the current error
    } else {
      return Promise.reject(error);
    }
  }
);

const apiSettings = {
  login: async (data) => {
    const response = await axios
      .post("login/", data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return response;
  },
  signup: async (data) => {
    const response = await axios
      .post("register/", data)
      .then((response) => response)
      .catch((error) => error.response);
    return response;
  },
  logout: async () => {
    const response = await axios
      .post("logout/", {})
      .then((response) => response)
      .catch((error) => error.response);
    return response;
  },
  listFiles: async () => {
    const response = await axios
      .get("files/")
      .then((response) => response)
      .catch((error) => {
        return error.response;
      });

    return response;
  },
  createFile: async (data) => {
    let form_data = new FormData();
    if (data.file) {
      form_data.append("file", data.file, data.file.name);
      form_data.append("title", data.title);

      const newFile = await axios
        .post("files/", form_data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error.response;
        });

      if (newFile.status === 201) {
        return null;
      }
      return newFile;
    }
  },
  deleteFile: async (file_id) => {
    const response = await axios
      .delete(`files/${file_id}/`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return response;
  },
  updateFile: async (file_id, title) => {
    let form_data = new FormData();
    form_data.append("title", title);
    const response = await axios
      .patch(`files/${file_id}/`, form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return response;
  },
  downloadAll: async () => {
    const response = await axios
      .get("/files/compress/")
      .then((response) => response)
      .catch((error) => {
        return error.response;
      });
    return response;
  },
  checkDownload: async () => {
    const response = await axios
      .get("/files/compress/check/")
      .then((response) => response)
      .catch((error) => error.response);
    return response;
  },
  forceDownload: async () => {
    const response = await axios
      .get("/files/compress/force/")
      .then((response) => response)
      .catch((error) => error.response);
    return response;
  },
  getUser: async () => {
    const response = await axios
      .get("users/me/")
      .then((response) => response)
      .catch((error) => error.response);
    return response;
  },
  updateUser: async (user_id, data) => {
    let response;
    if (data.file) {
      let form_data = new FormData();
      form_data.append("picture", data.file, data.file.name);
      for (const item in data) {
        if (item !== "file") {
          form_data.append(item, data[item]);
        }
      }
      for (const talla of form_data) {
        console.log(talla);
      }
      response = await axios
        .patch(`/users/${user_id}/`, form_data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => response)
        .catch((error) => error.response);
    } else {
      response = await axios
        .patch(`/users/${user_id}/`, data)
        .then((response) => response)
        .catch((error) => error.response);
    }

    return response;
  },
};

export default apiSettings;
