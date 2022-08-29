import { useEffect } from "react";
import Home from "./Home";
import styled from "styled-components";
const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
function App() {
  return (
    <MainContainer>
      <Home />
    </MainContainer>
  );
}

export default App;
