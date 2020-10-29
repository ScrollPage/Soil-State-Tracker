import Head from "next/head";
import Link from "next/link";

interface IHome {
  userId: number;
  name: string;
}

export default function Home({ userId, name = "Vova" }: IHome) {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <h1>Hello {name}!</h1>
      <Link href="/page">
        <a>To_Page</a>
      </Link>
    </div>
  );
}
