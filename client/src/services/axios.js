import axios from "axios";

const Api = axios.create({
  baseURL: "https://dashboard.ebtechnologies.io/",
});
export default Api