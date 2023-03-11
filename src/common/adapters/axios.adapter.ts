import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@nestjs/common';
import { HttpAdapter } from '../interfaces/http-adapter.interface';

@Injectable()
export class AxiosAdapter implements HttpAdapter{
    
    private axios: AxiosInstance = axios; // se crea una dependencia
    
    async get<T>(url: string): Promise<T> {
       try {
        const {data} = await this.axios.get<T>(url)
        return data
       } catch (error) {
        throw new Error('This is a Error - Check logs');
       }
    }

}