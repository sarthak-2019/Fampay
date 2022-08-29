import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { SetWord, SetPage, Tag } from "./../store/searchReducer";
export const MainContainer = styled.div`
  display: flex;
  gap: 20px;
  .watch {
    width: 225px;
    padding: 10px 20px;
    background: #546fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    color: #ffffff;
    cursor: pointer;
    transition: ease-in all 0.2s;
  }
`;

const SearchBar = () => {
  const dispatch = useDispatch();
  const keyword = useSelector((state) => state.search.searchWord);
  const [search, setSearch] = useState("");

  return (
    <MainContainer className="relative w-184 h-12">
      <input
        type="text"
        className="w-full h-full px-7 py-4 outline-none input-main"
        placeholder="Search for Videos"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        value={search}
        disabled={keyword.length > 0}
      />
      {keyword.length > 0 ? (
        <div
          className="watch cardHover"
          onClick={() => {
            setSearch("");
            dispatch(SetWord(""));
            dispatch(SetPage(1));
            dispatch(Tag("all"));
          }}
        >
          Remove Search
        </div>
      ) : (
        <div
          className="watch cardHover"
          onClick={() => {
            if (search.length === 0) {
              return;
            } else {
              dispatch(SetPage(1));
              dispatch(SetWord(search));
              dispatch(Tag("all"));
            }
          }}
        >
          Search Results
        </div>
      )}
    </MainContainer>
  );
};

export default SearchBar;
