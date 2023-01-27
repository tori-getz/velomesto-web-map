import axios from "axios";

export const httpClient = axios.create({
  baseURL: 'https://velomesto.com/api/v4'
});
