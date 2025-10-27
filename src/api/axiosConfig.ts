
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://mediato.site/simrs/api",
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default apiClient;
