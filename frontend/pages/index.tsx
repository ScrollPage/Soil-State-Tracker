import Head from "next/head";

interface IHome {}

export default function Home({}: IHome) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <h1>Home</h1>
    </>
  );
}
