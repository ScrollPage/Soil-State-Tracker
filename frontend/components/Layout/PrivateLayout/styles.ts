import styled from "styled-components";

export const SPrivateLayout = styled.div`
  height: 100%;
`;

export const SMain = styled.div`
  padding-top: 60px;
  height: calc(100vh - 60px);
`;

export const SBackDrop = styled.div`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.5;
  z-index: 5;
`;

