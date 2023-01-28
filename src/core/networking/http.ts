import axios from "axios";
import { EnvConfig } from "../env";

export const httpClient = axios.create({
  baseURL: EnvConfig.apiUrl
});
