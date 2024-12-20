import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export interface ICommunication {
  get(url: string, config?: any): Promise<any>;
  put(url: string, data: any, config?: any): Promise<any>;
  post(url: string, data: any, config?: any): Promise<any>;
  delete(url: string, config?: any): Promise<any>;
}

export class Http implements ICommunication {
  httpClient: AxiosInstance;

  constructor() {
    const baseURL =
      process.env.NODE_ENV === 'production'
        ? window.location.origin // 배포 환경에서 Netlify 도메인 사용
        : 'http://localhost:3000'; // 로컬 환경에서는 localhost 사용

    const axiosConfig = {
      baseURL,
      // withCredentials: true, // 필요 없다면 주석 처리
    };
    
    this.httpClient = axios.create(axiosConfig);
  }

  async get(url: string, config?: AxiosRequestConfig<any>) {
    return this.httpClient.get(url, {
      ...config,
    });
  }

  async post(url: string, data: any, config?: AxiosRequestConfig<any>) {
    return this.httpClient.post(url, data, {
      ...config,
    });
  }

  async put(url: string, data: any, config?: AxiosRequestConfig<any>) {
    return this.httpClient.put(url, data, {
      ...config,
    });
  }

  async delete(url: string, config?: AxiosRequestConfig<any>) {
    return this.httpClient.delete(url, {
      ...config,
    });
  }
}