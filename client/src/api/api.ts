// import axios from "axios";

// "baseURL" should always reference the backend
// const api = axios.create({ baseURL: "" });

/******** API Methods ********/
/*** Get ***/
export const getWords = async (wordLength: number): Promise<string[]> => {
  if (wordLength === 6) return ["shroud", "cheese", "export"];
  if (wordLength === 5) return ["cheek", "rogue", "water"];
  if (wordLength === 4) return ["word", "type", "post"];
  return [];
};

export const getDailyWord = async (): Promise<string> => {
  return "carrot";
};

export const checkWordValidity = async (word: string): Promise<Boolean> => {
  return true;
};
/*** Post ***/
// Unused
/*** Put ***/
// Unused
/*** Delete ***/
// Unused
/*****************************/
