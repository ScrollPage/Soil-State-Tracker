import styled from "styled-components";

export const SDrower = styled.div`
  position: fixed;
  top: 0;
  right: -280px;
  height: 100vh;
  width: 280px;
  padding: 40px;
  background: #fff;
  border-left: 1px solid #f0f0f0;
  z-index: 12;
`;

export const SDrowerInner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const SDrowerItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const SDrowerClose = styled.div`
  position: absolute;
  right: -20px;
  top: -25px;
`;
