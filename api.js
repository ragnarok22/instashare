import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/" + "api/";

// set default values
axios.defaults.baseURL = baseURL;
axios.defaults.headers.common["Accept"] = "application/json";

// add a request interceptor
axios.interceptors.request.use(
  (config) => {
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
    // redirect to login when a request raises an Unauthorized error
    if (error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const apiSettings = {
  setToken: (token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },
  login: async (data) => {
    const response = await axios
      .post("login/", data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          return { status: error.code };
        }
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
  listFiles: async (token) => {
    const response = await axios
      .get("files/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response)
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          return { status: error.code };
        }
        return error.response;
      });

    return response;
  },
  createFile: async (data, token) => {
    let form_data = new FormData();
    if (data.file) {
      form_data.append("file", data.file, data.file.name);
      form_data.append("title", data.title);

      const newFile = await axios
        .post("files/", form_data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
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
  deleteFile: async (file_id, token) => {
    const response = await axios
      .delete(`files/${file_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
  updateFile: async (file_id, title, token) => {
    let form_data = new FormData();
    form_data.append("title", title);
    const response = await axios
      .patch(`files/${file_id}/`, form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
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
  downloadAll: async (token) => {
    const response = await axios
      .get("/files/compress/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response)
      .catch((error) => {
        return error.response;
      });
    return response;
  },
  checkDownload: async (token) => {
    const response = await axios
      .get("/files/compress/check/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response)
      .catch((error) => error.response);
    return response;
  },
  forceDownload: async (token) => {
    const response = await axios
      .get("/files/compress/force", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response)
      .catch((error) => error.response);
    return response;
  },
  getUser: async (token) => {
    const response = await axios
      .get("users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response)
      .catch((error) => error.response);
    return response;
  },
  updateUser: async (user_id, data, token) => {
    const response = await axios
      .patch(`/users/${user_id}/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response)
      .catch((error) => error.response);
    return response;
  },
};

export default apiSettings;
