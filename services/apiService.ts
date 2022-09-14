import axios, { AxiosResponse } from "axios";
import { UserCredentials } from "./../types/userCredentials";

class ApiClient {
  instance;

  constructor() {
    this.instance = axios.create({
      baseURL: "https://mazanski-workout.herokuapp.com/",
    });

    this.instance.interceptors.response.use(this.handleSuccess);
  }

  handleSuccess(response: AxiosResponse) {
    return response;
  }

  async login(userData: UserCredentials) {
    const response = await this.instance.post("auth/login", userData);
    return response;
  }

  async register(userData: UserCredentials) {
    const response = await this.instance.post("auth/register", userData);
    return response;
  }
}

export default ApiClient;
