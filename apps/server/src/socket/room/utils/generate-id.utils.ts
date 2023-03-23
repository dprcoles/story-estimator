export const generateId = (roomId: number) => {
  return Math.floor(Math.random() * 1000000) + roomId;
};
