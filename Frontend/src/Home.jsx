import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import styled from "styled-components";
import SearchBar from "./components/Searchbar";
import Pagination from "@mui/material/Pagination";
import { CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchVideos } from "./Api/api";
import { useEffect } from "react";
import {
  LoadingTrue,
  LoadingFalse,
  TotalLength,
  SetSearchData,
  SetPage,
} from "./store/searchReducer";
export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 300px;
`;
const Home = () => {
  const state = useSelector((state) => state.search);
  const tag = state.tag;
  const pageCur = state.page;
  const sort = state.sort;

  const dispatch = useDispatch();

  const [count, setCount] = useState(0);
  const [selected, setselected] = useState("all");

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    dispatch(SetPage(value));
    setPage(value);
  };
  useEffect(() => {
    async function fetchData() {
      dispatch(LoadingTrue());
      const response = await fetchVideos();
      // console.log(response.data.data);
      let number_of_pages = Math.ceil(response.total_length / state.limit);
      setCount(number_of_pages);
      dispatch(TotalLength(response.total_length));
      dispatch(SetSearchData(response.data.data));
      dispatch(LoadingFalse());
    }
    fetchData();
  }, [tag, pageCur, sort]);

  useEffect(() => {
    setPage(pageCur);
  }, [tag, pageCur, sort]);
  return (
    <>
      <div
        className="flex flex-col mt-12  items-center "
        style={{ width: "1440px" }}
      >
        <div className="mt-12">
          <SearchBar />
        </div>
        <div className="mt-12">
          <Navbar selected={selected} setselected={setselected} />
        </div>
        <div
          className="text-2xl text-center text-color font-bold w-full"
          style={{ marginTop: "48px" }}
        >
          "Let’s build better products."
        </div>
        {}

        {state.loading ? (
          <MainContainer>
            <CircularProgress style={{ color: "#546fff" }} size={60} />
          </MainContainer>
        ) : (
          <>
            <div style={{ marginBottom: "32px", marginTop: "32px" }}>
              <Pagination
                count={count}
                page={page}
                onChange={handleChange}
                color="primary"
              />
            </div>
            <Feed />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
