import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:3004" });

export const get = async (endpoint: string) => {
  return await instance.get(`${endpoint}`);
};

export const put = async (
  endpoint: string,
  id: string,
  payload: any,
  config?: any
) => {
  await instance.put(`${endpoint}/${id}`, payload, config);
};

export const post = async (endpoint: string, payload: any, config?: any) => {
  await instance.post(`${endpoint}`, payload, config);
};
