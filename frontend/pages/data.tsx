import { show } from "@/store/actions/alert";
import Head from "next/head";
import { useDispatch } from "react-redux";
import styled from "styled-components";

interface IData {}

export default function Data({}: IData) {
  const dispatch = useDispatch();

  return (
    <SData>
      <Head>
        <title>Данные</title>
      </Head>
      <h1 onClick={() => dispatch(show("Тестовый алерт", "error", true))}>
        Данные
      </h1>
    </SData>
  );
}

const SData = styled.div`
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
