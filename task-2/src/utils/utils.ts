import dayjs from "dayjs";
import { get, put, post } from "../APIs/api";

export const splitToArr = (str: string) =>
  str
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

export const getVideo = async (id: string) => {
  const response = await get(`videos/${id}`);
  return response;
};

export const updateVideo = async (id: string, payload: any) => {
  const response = await put("videos", id, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response;
};

export const createVideo = async (payload: any) => {
  const response = await post("videos", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response;
};

export const isOlderThanDay = (timestamp: number) =>
  86400000 < dayjs().diff(dayjs(timestamp)).valueOf();
