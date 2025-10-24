import { projectId, publicAnonKey } from '../utils/supabase/info';

/**
 * Base API client for making requests to the Supabase Edge Function server
 */
class APIClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;

  constructor() {
    this.baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-07d6ee5a`;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
    };
  }

  /**
   * Make a GET request
   */
  async get<T>(endpoint: string, accessToken?: string): Promise<T> {
    const headers = { ...this.defaultHeaders };
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`GET ${endpoint} failed:`, error);
      throw new Error(`API Error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  /**
   * Make a POST request
   */
  async post<T>(endpoint: string, data?: any, accessToken?: string): Promise<T> {
    const headers = { ...this.defaultHeaders };
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`POST ${endpoint} failed:`, error);
      throw new Error(`API Error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  /**
   * Make a PUT request
   */
  async put<T>(endpoint: string, data?: any, accessToken?: string): Promise<T> {
    const headers = { ...this.defaultHeaders };
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`PUT ${endpoint} failed:`, error);
      throw new Error(`API Error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  /**
   * Make a DELETE request
   */
  async delete<T>(endpoint: string, accessToken?: string): Promise<T> {
    const headers = { ...this.defaultHeaders };
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`DELETE ${endpoint} failed:`, error);
      throw new Error(`API Error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  /**
   * Get base URL for manual requests
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }
}

// Export singleton instance
export const apiClient = new APIClient();
