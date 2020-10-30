import Head from "next/head";

interface IAbout {}

export default function About({}: IAbout) {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <h1>About</h1>
    </>
  );
}
