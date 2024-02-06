import axios from "axios";
export const baseURL = "https://mnvst2hc-4000.use2.devtunnels.ms/api/";
// export const baseURL = "https://fc54hzbr-8000.use2.devtunnels.ms/";
const Foot = axios.create({
  baseURL,
});

export default Foot;