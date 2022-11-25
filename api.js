import axios from "axios";
import { useUserContext } from "./context/UserContext";

const axios_instance = axios.create({
  baseURL: "http://localhost:8000/api/",
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
        return error.response;
      });
    return response;
  },
  createFile: async (data) => {
    let form_data = new FormData();
    if (data.file) {
      form_data.append("file", data.file, data.file.name);
      form_data.append("title", data.title);

      const newFile = await axios_instance
        .post("files/", form_data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${state.token}`,
          },
        })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error.response;
        });

      if (newFile.status === 201) {
        return;
      }
      return newFile;
    }
  },
};

export default apiSettings;
