export const handleApiResponse = async (response: Response) => {
  if (typeof response === "object" && response !== null) {
    try {
      const result = await response.json();
      if (response.ok) {
        return Promise.resolve(result);
      }
      return await Promise.reject(result);
    } catch (e) {
      return Promise.reject(new Error("InvalidJSON"));
    }
  }
  return Promise.reject(response);
};

