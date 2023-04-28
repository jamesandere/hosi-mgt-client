export const url = "http://localhost:5000";

export const setHeaders = () => {
  const token = localStorage.getItem("token");

  const headers = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };

  return headers;
};
