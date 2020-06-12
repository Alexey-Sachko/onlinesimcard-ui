import Axios, { AxiosInstance } from "axios";
import { SignupDto } from "./dto/signup.dto";

// const apiBaseUrl = "https://onlinesimcard.ru/api";
const apiBaseUrl = "http://localhost:4500";

class ApiServiceCls {
  private Api: AxiosInstance;
  constructor() {
    this.Api = Axios.create({
      baseURL: apiBaseUrl,
    });
  }

  async signup(signupDto: SignupDto) {
    const res = await this.Api.post("/users/signup", signupDto);
    return res;
  }

  async signin(signinDto: SignupDto) {
    const res = await this.Api.post("/users/signin", signinDto);
    return res;
  }
}

export const ApiService = new ApiServiceCls();
