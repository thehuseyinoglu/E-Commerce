import axios from "axios"
const axiosInstance = () => {
  let accessToken =  $cookies.get("tokenAdastra")
    const axiosInstance = axios.create({
      baseURL: "url",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, 
      },
    });
    return axiosInstance;
};
export default axiosInstance;