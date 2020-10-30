import PrivateLayout from "@/components/Layout/PrivateLayout";
import Head from "next/head";
import Link from "next/link";

interface IPage {
  userId: number;
  name: string;
}

export default function Page({ userId, name = "Misha" }: IPage) {
  return (
    <PrivateLayout>
      <Head>
        <title>Page</title>
      </Head>
      <h1>Hello {name}!</h1>
      <Link href="/">
        <a>To_Home</a>
      </Link>
    </PrivateLayout>
  );
}
