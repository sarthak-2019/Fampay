import React, { useState } from "react";
import styled from "styled-components";
import Clock from "./../assets/svgs/clock1";
import { useSelector } from "react-redux";
import Price from "./VideoPopup";
import moment from "moment";

export const MainContainer = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  max-width: 308px;
  min-height: 512px;
  margin: 20px;
  position: relative;
  padding: 22px;

  .header {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 35px;

    color: #141522;
  }
  .mainImage {
    width: 260px;
    height: 190px;
  }
  .heading {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 150%;
    color: #141522;
    margin-top: 23px;
  }
  .heading1 {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    margin-top: 4px;
    color: #54577a;
  }
  .heading2 {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    margin-top: 4px;
    color: #54577a;
  }
  .divwatch {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;
  }
  .watch {
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
  }
`;

const Feed = () => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const state = useSelector((state) => state.search);
  return (
    <div className="flex justify-center gap-8 my-10 flex-wrap w-5/6">
      {open && <Price open={open} setOpen={setOpen} url={url} />}
      {state.searchData.length > 0 &&
        state.searchData.map((item) => {
          return (
            <MainContainer className="cardHover cardHoverTransition">
              <img
                src={item.thumbnails.high.url}
                className="mainImage"
                alt="no image"
              />
              <div className="heading">{item?.channelTitle}</div>
              <div className="heading1">{item?.title}</div>
              <div className="heading">Description</div>
              <div className="heading2">{item?.description}</div>
              <div className="divwatch">
                <div style={{ display: "flex", gap: "8px" }}>
                  <Clock />
                  <div>{moment(item?.publishTime).fromNow()}</div>
                </div>

                <div
                  className="watch"
                  onClick={() => {
                    setOpen(true);
                    setUrl(`https://www.youtube.com/embed/${item.videoId}`);
                  }}
                >
                  Watch now
                </div>
              </div>
            </MainContainer>
          );
        })}
    </div>
  );
};

export default Feed;
