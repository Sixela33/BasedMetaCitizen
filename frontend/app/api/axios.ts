import axios from "axios";
import { getConfig } from '../config';

const config = getConfig();

export const proxyAxois = axios.create({
    baseURL: config.apiUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-Frontend-Type': 'orgs'
    }
})