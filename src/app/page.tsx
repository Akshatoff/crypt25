import Link from "next/link";
import Image from 'next/image'
import {
  ShowLoader
} from "./actions";
import 'animate.css';
import discordSVG from '../../public/discord.svg';
import scrollIndicator from '../../public/scroll-indicator.svg';
import aboutImage from '../../public/example.png';

function CoverSection() {
  return (
    <div className="section centered cover" id="home">
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
    </div>
  );
}

function Section1() {
  return (
    <div className="section flex" id="about">
      <div className="flex-occupy-67">
        <h2>About Crypt</h2>
        <p>Hosted at Ordin@trix, Crypt@trix is the annual Cryptic Hunt event. It is an online scavenger hunt contest where participants are timed and given a series of challenging clues. With these clues, participants put their investigative skills to pursuit and get an answer. Each answer contributes to a team's score. Teams compete on the populated <Link href="/leaderboard">leaderboard</Link> throughout the event.</p>
      </div>
      <div className="flex-occupy-33">
        <Image src={aboutImage} alt="About"></Image>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <CoverSection></CoverSection>
      <Section1></Section1>      
    </>
  );
}