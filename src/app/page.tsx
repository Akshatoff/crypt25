import Link from "next/link";
import Image from 'next/image'
import {
  ShowLoader
} from "./actions";
import 'animate.css';
import discordSVG from '../../public/discord.svg';
import scrollIndicator from '../../public/scroll-indicator.svg';
import aboutImage from '../../public/example.png';

export default function Home() {
  return (
    <>
      <div className="section centered cover" id="home">
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
        <Image className="scroll-indicator" src={scrollIndicator} alt="Scroll down"></Image>
      </div>
      <div className="section flex" id="about">
        <div className="flex-occupy-67">
          <h2>About Crypt</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper turpis nisl, et volutpat ligula vulputate eget. Nulla sed felis finibus, bibendum ante quis, suscipit nisl. Vivamus ac urna sed erat accumsan dictum. Fusce urna dui, ultrices fermentum ornare at, placerat eget elit. In malesuada a lectus in faucibus. Nullam finibus pulvinar pharetra. In et mauris ut ligula pharetra semper. Curabitur consequat ligula non eleifend tincidunt. Quisque at vulputate ex. Vestibulum dolor dui, tincidunt quis ligula eget, posuere pharetra dolor. Nam imperdiet rhoncus efficitur. Aenean vitae viverra eros.</p>
        </div>
        <div className="flex-occupy-33">
          <Image src={aboutImage} alt="About"></Image>
        </div>
      </div>
    </>
  );
}
