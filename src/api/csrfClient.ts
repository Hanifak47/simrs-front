
import axios from "axios";

const csrfClient = axios.create({
  baseURL: "https://mediato.site/simrs",  
  withCredentials: true,
  withXSRFToken: true,
});

export default csrfClient;
