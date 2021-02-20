import axios from "axios";
import { api } from "../urlConfig";

const accessToken = window.localStorage.getItem("access-token");

const axiosInstance = axios.create({
    baseURL: api,
    headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => {
        console.log("from axios interceptor response");
        return response;
    },
    (error) => {
        const ogReq = error.config;

        if (
            error.response.status === 400 &&
            ogReq.url === "https://api.tilakshringar.com//api/refresh"
        ) {
            window.location.replace("https://tilakshringar.com//loginSign");
            return Promise.reject(error);
        }

        if (error.response.status === 403 && !ogReq._retry) {
            ogReq._retry = true;
            console.log("from axios interceptor err");

            // console.log("old accessToken", accessToken);

            return axiosInstance
                .patch("refresh", {
                    accessToken: window.localStorage.getItem("access-token"),
                })
                .then((response) => {
                    if (response.status === 200) {
                        localStorage.setItem(
                            "access-token",
                            response.data.accessToken
                        );

                        // console.log(
                        //     "new accessToken",
                        //     response.data.accessToken
                        // );

                        ogReq.headers[
                            "Authorization"
                        ] = `Bearer ${response.data.accessToken}`;

                        axiosInstance.defaults.headers.common[
                            "Authorization"
                        ] = `Bearer ${response.data.accessToken}`;

                        // console.log(ogReq);

                        // window.location.reload();

                        return axios(ogReq);
                    }
                });
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
