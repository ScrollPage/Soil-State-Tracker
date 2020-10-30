import styled from "styled-components";
import Head from "next/head";

export default function Custom404() {
  return (
    <SCustom404>
      <Head>
        <title>404 ошибка</title>
      </Head>
      <h1>Страница не найдена</h1>
    </SCustom404>
  );
}

const SCustom404 = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  h1 {
    font-weight: 800;
    font-size: 36px;
  }
`;
