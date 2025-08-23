import axios from "axios";

const Api = axios.create({
  baseURL: "https://vercel-backend-coral.vercel.app/",
});

export default Api