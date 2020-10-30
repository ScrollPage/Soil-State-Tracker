import React from "react";
import styled from "styled-components";

const AccountActivation = () => {
  return (
    <SAccountActivation>
      <h1>Активация аккаунта</h1>
    </SAccountActivation>
  );
};

export default AccountActivation;

const SAccountActivation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  h1 {
    font-weight: 800;
    font-size: 36px;
  }
`;
