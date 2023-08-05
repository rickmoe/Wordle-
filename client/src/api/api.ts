import axios from "axios";

// "baseURL" should always reference the backend
const api = axios.create({ baseURL: "http://localhost:5000" });

/******** API Methods ********/
/*** Get ***/
export const getWords = async (
  wordLength: number,
  numWords: number
): Promise<string[]> => {
  const response = await api.get(`/words/${wordLength}?num-words=${numWords}`);
  return response.data;
};

export const getDailyWord = async (): Promise<string> => {
  const response = await api.get("/daily");
  return response.data;
};

export const checkWordValidity = async (word: string): Promise<Boolean> => {
  const response = await api.get(`/is-valid/${word}`);
  return response.data === "valid";
};
/*** Post ***/
// Unused
/*** Put ***/
// Unused
/*** Delete ***/
// Unused
/*****************************/
