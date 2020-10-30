import Head from "next/head";
import styled from "styled-components";

interface IAbout {}

export default function About({}: IAbout) {
  return (
    <SAbout>
      <Head>
        <title>О продукте</title>
      </Head>
      <h1>О продукте</h1>
    </SAbout>
  );
}

const SAbout = styled.div`
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
