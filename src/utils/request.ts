import axios from "axios";
import globalConfig from "@/config/global";

const instance = axios.create({
  baseURL: globalConfig.BASE_URL,
  timeout: 10000,
});

export const get = (
  url: string,
  params: { [key: string]: any } = {}
): Promise<any> => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        console.log(err);
        reject(err);
      }
    );
  });
};
