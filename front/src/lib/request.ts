import { AggType, TopSpeed } from "../types/index";

const BACKEND_URL = "http://localhost:5550";

export function makeRequest(url: string, method: string, body?: any) {
  return fetch(BACKEND_URL + url, {
    method,
    ...(body ? { body: JSON.stringify(body) } : {}),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function getTopSpeed(): Promise<TopSpeed[]> {
  return makeRequest("/results/top-speed", "GET").then((res) => res.json());
}

export function getAggType(): Promise<AggType[]> {
  return makeRequest("/results/agg-type", "GET").then((res) => res.json());
}

export function getMeteors(): Promise<any[]> {
  return makeRequest("/meteors", "GET").then((res) => res.json());
}
