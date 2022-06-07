import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';


const instance: AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(function (response: AxiosResponse) {
  return response.data;
}, function (error) {
  const highLevelMsg = error.message;
  const message = error?.response?.data?.message;
  toast.error(message || highLevelMsg);
  if (error?.response?.data) {
    return Promise.reject(error?.response?.data);
  }
  return Promise.reject(null);
});

export default class API {

  static get(url: string, params = {}): Promise<any> {
    return instance({
      method: 'GET',
      url,
      params
    })
  }

  static post(url: string, data = {}, params = {}): Promise<any> {
    return instance({
      method: 'POST',
      url,
      data,
      params
    })
  }

  static put(url: string, data = {}, params = {}): Promise<any> {
    return instance({
      method: 'PUT',
      url,
      data,
      params
    });
  }

  static delete(url: string, params = {}, data = {}): Promise<any> {
    return instance({
      method: 'DELETE',
      url,
      data,
      params
    })
  }
}