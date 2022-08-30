import { store } from "./../store/store";
import { Loading } from "../store/searchReducer";
import axios from "axios";

// localHost:http://localhost:8000/api/
const API = axios.create({ baseURL: "https://fampay1.herokuapp.com/api/" });

export const fetchVideos = async () => {
  const state = store.getState();
  try {
    const response = await API.get(
      `/searchAll?page=${state.search.page}&limit=${state.search.limit}&tag=${
        state.search.tag
      }&sort=${state.search.sort === "desc" ? "-publishTime" : "publishTime"}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchVideosForKeyword = async () => {
  const state = store.getState();
  try {
    const response = await API.get(
      `/search?page=${state.search.page}&limit=${state.search.limit}&word=${
        state.search.searchWord
      }&sort=${state.search.sort === "desc" ? "-publishTime" : "publishTime"}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
