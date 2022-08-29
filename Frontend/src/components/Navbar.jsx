import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tag, SortType, SetPage } from "./../store/searchReducer";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
const BlueSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#546fff",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#546fff",
  },
}));

const nav_arr = [
  { value: "all", heading: "All" },
  { value: "cricket", heading: "Cricket" },
  { value: "food", heading: "Food" },
  { value: "music", heading: "Music" },
  { value: "travel", heading: "Travel" },
  { value: "football", heading: "Football" },
  { value: "games", heading: "Games" },
  { value: "memes", heading: "Memes" },
  { value: "minecraft", heading: "Minecraft" },
  { value: "art", heading: "Art" },
  { value: "stand up comedy", heading: "Stand up comedy" },
];

const Navbar = ({ selected, setselected }) => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState(true);
  const keyword = useSelector((state) => state.search.searchWord);

  const handleChange = (event) => {
    if (event.target.checked) {
      dispatch(SortType("desc"));
      dispatch(SetPage(1));
    } else {
      dispatch(SortType("asc"));
      dispatch(SetPage(1));
    }
    setState((prev) => {
      return !prev;
    });
  };
  return (
    <div className="flex gap-2">
      {nav_arr.map((item) => {
        return (
          <div
            className={`${
              item.value == selected ? "bg-purple" : ""
            } navbar-item px-5 py-3 rounded-lg cursor-pointer ${
              keyword.length > 0 ? "is-disabled" : ""
            }`}
            onClick={() => {
              dispatch(Tag(item.value));
              dispatch(SetPage(1));
              setselected(item.value);
            }}
          >
            {item.heading}
          </div>
        );
      })}
      <BlueSwitch checked={state} onChange={handleChange} name="jason" />
      <div
        className="navbar-item"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
        }}
      >
        Sort By Latest
      </div>
    </div>
  );
};

export default Navbar;
