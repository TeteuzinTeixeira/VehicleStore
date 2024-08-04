import axios, { AxiosInstance, AxiosResponse } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const httpClient: AxiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

class ApiService {
    private apiurl: string;

    constructor(apiurl: string) {
        this.apiurl = apiurl;
    }

    post<T>(url: string, objeto: T): Promise<AxiosResponse<T>> {
        const requestUrl = `${this.apiurl}${url}`;
        return httpClient.post<T>(requestUrl, objeto);
    }

    put<T>(url: string, objeto: T): Promise<AxiosResponse<T>> {
        const requestUrl = `${this.apiurl}${url}`;
        return httpClient.put<T>(requestUrl, objeto);
    }

    delete<T>(url: string): Promise<AxiosResponse<T>> {
        const requestUrl = `${this.apiurl}${url}`;
        return httpClient.delete<T>(requestUrl);
    }

    get<T>(url: string): Promise<AxiosResponse<T>> {
        const requestUrl = `${this.apiurl}${url}`;
        return httpClient.get<T>(requestUrl);
    }
}

export default ApiService;
