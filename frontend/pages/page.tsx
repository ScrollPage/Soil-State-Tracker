import Head from "next/head";
import Link from "next/link";

interface IPage {
  userId: number;
  name: string;
}

export default function Page({ userId, name = "Misha" }: IPage) {
  return (
    <div>
      <Head>
        <title>Page</title>
      </Head>
      <h1>Hello {name}!</h1>
      <Link href="/">
        <a>To_Home</a>
      </Link>
    </div>
  );
}
