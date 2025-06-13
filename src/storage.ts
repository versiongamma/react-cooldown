import { md5 } from "js-md5";

export type Timer = {
  /** Start time of the timer as unix epoch time */
  time: number,
  /** Duration of the timer, in milliseconds */
  duration: number
}

const encodeJson = (json: object): string => {
  const jsonString = JSON.stringify(json);
  const base64json = btoa(jsonString);
  const reversedBase64json = base64json.split("").reverse().join("");
  return reversedBase64json;
}

const decodeJson = (encodedJson: string): object => {
 const base64json = encodedJson.split("").reverse().join("");
 const jsonString = atob(base64json);
 const json = JSON.parse(jsonString);
 return json;
}

export const setTimer = (key: string, duration: number): Timer => {
  const timer = { time: new Date().getTime(), duration }
  localStorage.setItem(md5(key), encodeJson(timer));
  return timer;
}

export const getTimer = (key: string): Timer | null => {
  const timer = localStorage.getItem(md5(key));
  if (timer) {
    return decodeJson(timer) as Timer;
  }

  return null;
}

export const clearTimer = (key: string) => {
  localStorage.removeItem(md5(key));
}
