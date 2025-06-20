import { useState, useCallback } from "react";

const BASE_URL = "http://localhost:8010";

export const useApiRequest = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(async ({
    url,
    method = "GET",
    params = null,
    body = null,
    customHeaders = {},
  }) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const query = params ? `?${new URLSearchParams(params).toString()}` : "";

      const token = sessionStorage.getItem("authToken");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...customHeaders,
      };

      const response = await fetch(`${BASE_URL}${url}${query}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const json = await response.json();
      setData(json);
      return { success: true, data: json };
    } catch (err) {
      setError(err.message || "Bilinmeyen hata");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, request };
};
