import { show } from "@/store/actions/alert";
import Head from "next/head";
import { useDispatch } from "react-redux";

interface IData {}

export default function Data({}: IData) {
  const dispatch = useDispatch();

  return (
    <>
      <Head>
        <title>Data</title>
      </Head>
      <h1 onClick={() => dispatch(show("Тестовый алерт", "error", true))}>
        Data
      </h1>
    </>
  );
}
