import { getToken } from "./lib/auth";

// proxy.ts
export default class APIProxy {
  static async getHeaders(requiredAuth: boolean) {
    const token = await getToken();
    const headers: Record<string, string> = {};

    if (token && requiredAuth) {
      headers.Authorization = `Bearer ${token}`;
    }

    headers["Content-Type"] = "application/json";
    return headers;
  }

  static async handleFetch(endpoint: string, requestOptions: RequestInit) {
    let data = {};
    let status = 500
    try {
      const response = await fetch(endpoint, requestOptions);
      data = await response.json()
      status = response.status
    }
    catch (error) {
      data = {
        message: "Can`t reach API server", error: error,
        endpoint:endpoint,
        status: 500
      };
    }
    return { data, status }
  }

  static async post(endpoint: string, object: any, requiredAuth: any) {
    const headers = await this.getHeaders(requiredAuth);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(object),
      });
      const data = res.json()
      return { data, status: res.status }
    }
    catch (error) {
      return {
        data: {
          message: "Can`t reach API server", error
        },
        status: 500,

      }
    }

  }

  static async get(endpoint: string, requiredAuth: boolean) {
    const headers = await this.getHeaders(requiredAuth);

    const requestOptions: RequestInit = {
      method: "GET",
      headers: headers,
    };

    return await APIProxy.handleFetch(endpoint, requestOptions);
  }
}
