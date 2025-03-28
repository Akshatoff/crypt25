import Link from "next/link";
import Image from 'next/image';
import aboutImage from '../../../public/example.png';
import Back from '../components/Back';

function CoverSection() {
  return (
    <div className="section centered cover incompleteCover" id="home">
      <span className="subtitle">
        What is
      </span>
      <h1 className="title">
        Crypt@trix?
      </h1>
    </div>
  );
}

function Section1() {
  return (
    <div className="section flex" id="about">
      <div className="flex-occupy-67">
        <h2>About Crypt</h2>
        <p>Crypt@trix is the annual Cryptic Hunt event hosted at Ordin@trix. Cryptic hunts are online scavenger hunt competitions where participants are given a series of challenging clues, requiring sharp investigative skills, clever thinking, and foresight to solve difficult puzzles. You will need to pair up with the Internet to advance in the event.
        </p>
      </div>
      <div className="flex-occupy-33">
        <Image src={aboutImage} alt="About"></Image>
      </div>
    </div>
  );
}

function Section2() {
  return (
    <div className="section flex" id="about">
      <div className="flex-occupy-33">
        <Image src={aboutImage} alt="About"></Image>
      </div>
      <div className="flex-occupy-67">
        <h2>Capture the Flag</h2>
        <p>Capture the Flag (CTF) challenges are amusing cybersecurity challenges. Participants find text strings called "flags" that are secretly hidden in deliberate vulnerable programs or websites, or use a clever encryption or steganographic algorithm to conceal data. CTF helps beginners explore the realm of cybersecurity. The objective of CTF is not just raising cybersecurity awareness, but also understanding how vulnerabilities in your applications may be exploited.
        </p>
      </div>
    </div>
  );
}

function Section3() {
  return (
    <div className="section flex" id="about">
      <div className="flex-occupy-67">
        <h2>Preparing for Cryptic Hunts</h2>
        <p>Practice makes perfect; participating in this year's Cryptic Hunts will help you master cryptography. Remember, each level consists a set of clues, all of which lead to a single answer. The difficulty increases with each level. You can find clues in various locations…</p>
        <ul>
          <li>This website</li>
          <li>The title of a page</li>
          <li>The URL of a page</li>
          <li>Somewhere on the screen</li>
          <li>Somewhere in the source code</li>
        </ul>
        <p>If a media file such as an image, a video, or a document is given, think creatively! Encrypting or decrypting text, reversing audio, checking file properties, and so on can help you find the answer.</p>
      </div>
      <div className="flex-occupy-33">
        <Image src={aboutImage} alt="About"></Image>
      </div>
    </div>
  );
}

function Section4() {
  return (
    <div className="section flex" id="about">
      <div className="flex-occupy-67">
        <h2>Preparing for Cryptic Hunts</h2>
        <p>Practice makes perfect; participating in this year's Cryptic Hunts will help you master cryptography. Remember, each level consists a set of clues, all of which lead to a single answer. The difficulty increases with each level. You can find clues in various locations…</p>
        <ul>
          <li>This website</li>
          <li>The title of a page</li>
          <li>The URL of a page</li>
          <li>Somewhere on the screen</li>
          <li>Somewhere in the source code</li>
        </ul>
        <p>If a media file such as an image, a video, or a document is given, think creatively! Encrypting or decrypting text, reversing audio, checking file properties, and so on can help you find the answer.</p>
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
      <Back></Back>
      <CoverSection></CoverSection>
      <Section1></Section1>
      <Section2></Section2>
      <Section3></Section3>
      <Section4></Section4>
      <div className="centered-buttons">
        <Link href="/guidelines">
          <button className="rounded">
            View Guidelines
          </button>
        </Link>
      </div>
    </>
  );
}