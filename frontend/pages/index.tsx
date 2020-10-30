import Header from "@/components/Header";
import PrivateLayout from "@/components/Layout/PrivateLayout";
import Head from "next/head";
import Link from "next/link";

interface IHome {
  userId: number;
  name: string;
}

export default function Home({ userId = 1, name = "Vova" }: IHome) {
  return (
    <PrivateLayout>
      <Head>
        <title>Home</title>
      </Head>
      <h1>Hello {name}!</h1>
      <Link href="/data">
        <a>To_Data</a>
      </Link>
    </PrivateLayout>
  );
}
