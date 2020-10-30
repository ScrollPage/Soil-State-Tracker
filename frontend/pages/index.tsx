import Head from "next/head";
import styled from "styled-components";

interface IHome {}

export default function Home({}: IHome) {
  return (
    <SHome>
      <Head>
        <title>Главная</title>
      </Head>
      <h1>Home</h1>
    </SHome>
  );
}

const SHome = styled.div`
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
