import Axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";
import { UnauthorizedException } from "../../exceptions/unauthorized.exception";
import { ForbiddenException } from "../../exceptions/forbidden.exception";
import { ServerException } from "../../exceptions/server.exception";
import { NetworkException } from "../../exceptions/network.exception";
import { ConflictException } from "../../exceptions/conflict.exception";

// const apiBaseUrl = "https://onlinesimcard.ru/api";
const apiBaseUrl = "http://localhost:4500";

class ApiServiceCls {
  private Api: AxiosInstance;

  constructor() {
    this.Api = Axios.create({
      baseURL: apiBaseUrl,
    });
    this.Api.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response) {
          this.matchErrorByStatus(error);
        } else if (error.request) {
          throw new NetworkException();
        } else {
          throw error;
        }
      }
    );
  }

  async get(url: string, config?: AxiosRequestConfig) {
    return this.Api.get(url, config);
  }

  async post(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.Api.post(url, data, config);
  }

  async delete(url: string, config?: AxiosRequestConfig) {
    return this.Api.delete(url, config);
  }

  private matchErrorByStatus(error: AxiosError) {
    const { status } = error.response;
    switch (status) {
      case 401:
        throw new UnauthorizedException();
      case 403:
        throw new ForbiddenException();
      case 409:
        throw new ConflictException();
      default:
        throw new ServerException();
    }
  }
}

export const ApiService = new ApiServiceCls();
