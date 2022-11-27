import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/";

const axios_instance = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
  },
});

const apiSettings = {
  login: async (data) => {
    const response = await axios_instance
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
    const response = await axios_instance
      .post("register/", data)
      .then((response) => response)
      .catch((error) => error.response);
    return response;
  },
  listFiles: async (token) => {
    const response = await axios_instance
      .get("files/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response)
      .catch((error) => error.response);

    return response;
  },
  createFile: async (data, token) => {
    let form_data = new FormData();
    if (data.file) {
      form_data.append("file", data.file, data.file.name);
      form_data.append("title", data.title);

      const newFile = await axios_instance
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
    const response = await axios_instance
      .delete(`/files/${file_id}`, {
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
};

export default apiSettings;
