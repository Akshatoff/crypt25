import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="section" id="home">
        <h1 className="text" id="heading">
          Crypt
        </h1>
        <Link href="/login" className="text">
          Login
        </Link>
        <Link href="/register" className="text">
          Register
        </Link>
      </div>
    </>
  );
}
