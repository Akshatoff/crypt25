import Link from "next/link";
import "animate.css";
import LetterGlitch from "./components/LetterGlitch";
import DecryptedText from "./components/DecryptedText";
import QuestionPopup from "./components/QuestionPopup";

export default function Home() {
  return (
    <>
      <LetterGlitch
        glitchSpeed={50}
        centerVignette={true}
        outerVignette={true}
        smooth={true}
      >
        <div className="text-con">
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
          ></DecryptedText>
        </div>
        <div className="menu">
          <Link href="/dashboard">
            <h2 className="link" id="first-op">
              New Game
            </h2>
          </Link>
          <Link href="/leaderboard">
            <h2 className="link" id="second-op">
              Leaderboard
            </h2>
          </Link>
          <Link href="/about">
            <h2 className="link" id="third-op">
              Tutorial
            </h2>
          </Link>
          <Link href="/logout">
            <h2 className="link" id="fourth-op">
              Exit
            </h2>
          </Link>
        </div>
        <div className="overlay"></div>
      </LetterGlitch>
    </>
  );
}
