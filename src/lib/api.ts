/* eslint-disable @typescript-eslint/no-explicit-any */
// API Configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  // "https://api-strat.othmanconstruction.com/api/v1";
  "http://localhost:4000/api/v1";

// API Response Types
export interface ApiResponse<T = any> {
  message: string;
  error: boolean;
  code: number;
  results: T;
}

export interface ApiError {
  message: string;
  error: boolean;
  code: number;
  details?: any;
}

// Request Configuration
interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
}

// API Helper Class
class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  // Set authorization token
  setAuthToken(token: string) {
    this.defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  // Remove authorization token
  removeAuthToken() {
    delete this.defaultHeaders["Authorization"];
  }

  // Build full URL
  private buildURL(endpoint: string): string {
    const cleanEndpoint = endpoint.startsWith("/")
      ? endpoint.slice(1)
      : endpoint;
    return `${this.baseURL}/${cleanEndpoint}`;
  }

  // Handle response
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: "Network error occurred",
        error: true,
        code: response.status,
      }));

      throw {
        message: errorData.message || "Request failed",
        error: true,
        code: response.status,
        details: errorData,
      } as ApiError;
    }

    return response.json();
  }

  // Generic request method
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const url = this.buildURL(endpoint);

    // Don't set Content-Type for FormData - let browser set it with boundary
    const isFormData = options.body instanceof FormData;
    const headers = isFormData
      ? {
          ...config.headers,
          ...options.headers,
        }
      : {
          ...this.defaultHeaders,
          ...config.headers,
          ...options.headers,
        };

    const requestOptions: RequestInit = {
      ...options,
      headers,
    };

    // Add timeout if specified
    if (config.timeout) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), config.timeout);
      requestOptions.signal = controller.signal;

      try {
        const response = await fetch(url, requestOptions);
        clearTimeout(timeoutId);
        return this.handleResponse<T>(response);
      } catch (error) {
        clearTimeout(timeoutId);
        if (error instanceof Error && error.name === "AbortError") {
          throw {
            message: "Request timeout",
            error: true,
            code: 408,
          } as ApiError;
        }
        throw error;
      }
    }

    const response = await fetch(url, requestOptions);
    return this.handleResponse<T>(response);
  }

  // GET request
  async get<T = any>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET" }, config);
  }

  // POST request
  async post<T = any>(
    endpoint: string,
    data?: any,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    // Handle FormData differently from regular JSON data
    const isFormData = data instanceof FormData;

    return this.request<T>(
      endpoint,
      {
        method: "POST",
        body: data ? (isFormData ? data : JSON.stringify(data)) : undefined,
        headers: isFormData ? {} : { "Content-Type": "application/json" },
      },
      config
    );
  }

  // PUT request
  async put<T = any>(
    endpoint: string,
    data?: any,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: "PUT",
        body: data ? JSON.stringify(data) : undefined,
      },
      config
    );
  }

  // PATCH request
  async patch<T = any>(
    endpoint: string,
    data?: any,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: "PATCH",
        body: data ? JSON.stringify(data) : undefined,
      },
      config
    );
  }

  // DELETE request
  async delete<T = any>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" }, config);
  }

  // Upload file
  async upload<T = any>(
    endpoint: string,
    file: File,
    additionalData?: Record<string, any>,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append("file", file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    const headers = {
      ...this.defaultHeaders,
      ...config.headers,
    };
    delete headers["Content-Type"]; // Let browser set it for FormData

    return this.request<T>(
      endpoint,
      {
        method: "POST",
        body: formData,
        headers,
      },
      config
    );
  }
}

// Create and export API instance
export const api = new ApiClient();

// Export the class for custom instances
export { ApiClient };

// Convenience functions for direct use
export const apiGet = <T = any>(endpoint: string, config?: RequestConfig) =>
  api.get<T>(endpoint, config);

export const apiPost = <T = any>(
  endpoint: string,
  data?: any,
  config?: RequestConfig
) => api.post<T>(endpoint, data, config);

export const apiPut = <T = any>(
  endpoint: string,
  data?: any,
  config?: RequestConfig
) => api.put<T>(endpoint, data, config);

export const apiPatch = <T = any>(
  endpoint: string,
  data?: any,
  config?: RequestConfig
) => api.patch<T>(endpoint, data, config);

export const apiDelete = <T = any>(endpoint: string, config?: RequestConfig) =>
  api.delete<T>(endpoint, config);

export const apiUpload = <T = any>(
  endpoint: string,
  file: File,
  additionalData?: Record<string, any>,
  config?: RequestConfig
) => api.upload<T>(endpoint, file, additionalData, config);
