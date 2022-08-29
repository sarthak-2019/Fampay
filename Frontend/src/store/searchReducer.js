import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tag: "all",
  page: 1,
  limit: 5,
  sort: "desc",
  searchData: [],
  loading: false,
  total_length: 0,
  searchWord: "",
};

const searchSlice = createSlice({
  initialState,
  name: "search",
  reducers: {
    Tag: (state, action) => {
      state.tag = action.payload;
    },
    TotalLength: (state, action) => {
      state.total_length = action.payload;
    },
    SortType: (state, action) => {
      state.sort = action.payload;
    },
    LoadingTrue: (state) => {
      state.loading = true;
    },
    LoadingFalse: (state) => {
      state.loading = false;
    },
    SetSearchData: (state, action) => {
      state.searchData = action.payload;
    },
    SetPage: (state, action) => {
      state.page = action.payload;
    },
    SetWord: (state, action) => {
      state.searchWord = action.payload;
    },
  },
});

export const {
  Tag,
  LoadingTrue,
  LoadingFalse,
  TotalLength,
  SortType,
  SetSearchData,
  SetPage,
  SetWord,
} = searchSlice.actions;

export default searchSlice.reducer;
