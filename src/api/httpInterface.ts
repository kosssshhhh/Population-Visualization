import { ICommunication } from './http';
import { Response } from 'http-proxy-middleware/dist/types';

export class HttpInterface {
  constructor(private apiClient: ICommunication) {
    this.apiClient = apiClient;
  }

  // TODO: Api 명세 대로 구현하기
  getPopulation(){
    const url = '';
    return this.apiClient.get(url);
  }
}
