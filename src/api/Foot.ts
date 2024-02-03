import axios from "axios";
export const baseURL = "http://localhost:4000/api/";
// export const baseURL = "https://fc54hzbr-8000.use2.devtunnels.ms/";
const Foot = axios.create({
  baseURL,
});

export default Foot;