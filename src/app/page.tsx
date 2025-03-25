import Link from "next/link";
import Image from 'next/image'
import {
  ShowLoader
} from "./actions";
import 'animate.css';
import discordSVG from '../../public/discord.svg';

export default function Home() {
  return (
    <>
      <div className="section centered" id="home">
        <span className="subtitle">
          Ordin@trix 25.0 presents…
        </span>
        <h1 className="title animate__animated animate__pulse animate__slow">
          Crypt@trix
        </h1>
        <Link href="/login">
          <button className="blurple">
            <Image src={discordSVG} alt="Discord" />
            Login with Discord
          </button>
        </Link>
      </div>
    </>
  );
}
