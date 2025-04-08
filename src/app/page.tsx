import Link from "next/link";
import Image from 'next/image'
import {
  ShowLoader
} from "./actions";
import 'animate.css';
import discordSVG from '../../public/discord.svg';
import scrollIndicator from '../../public/scroll-indicator.svg';
import aboutImage from '../../public/example.png';
import LetterGlitch from "./components/LetterGlitch";
import DecryptedText from "./components/DecryptedText";



export default function Home() {
  return (
    <>
      <LetterGlitch
      glitchSpeed={50}
      centerVignette={true}
      outerVignette={true}
      smooth={true}
      >
      {/* <div className="section centered cover" id="home">
      <span className="subtitle">
        Ordin@trix 25.0 presents…
      </span>
      <h1 className="title animate__animated animate__pulse animate__slow">
        Crypt@trix
      </h1>
      <div className="flex-row">
        <Link href="/login">
          <button className="blurple">
            <Image src={discordSVG} alt="Discord" />
            Login with Discord
          </button>
        </Link>
        <Link href="/about">
          <button>
            About
          </button>
        </Link>
      </div>
      <Link href="/leaderboard" className="titleLink">View leaderboard ›</Link>
      <Image className="scroll-indicator" src={scrollIndicator} alt="Scroll down"></Image>
    </div> */}
    <div className="text">
      <DecryptedText
      text="Crypt@Trix 25.0"
      speed={100}
      maxIterations={20}
      characters="ABCD1234!?"
      className="revealed heading"
      parentClassName="all-letters"
      encryptedClassName="encrypted"
      animateOn="view"
      revealDirection="start"
      />
    </div>
    <div className="overlay"></div>

      </LetterGlitch>  
    </>
  );
}