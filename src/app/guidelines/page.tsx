import Link from "next/link";
import Back from '../components/Back';

function CoverSection() {
  return (
    <div className="section centered cover veryIncompleteCover" id="home">
      <span className="subtitle">
        Crypt@trix
      </span>
      <h1 className="title">
        Guidelines
      </h1>
    </div>
  );
}

function Section1() {
  return (
    <>
      <div className="section centered" id="home">
        <p className="text">
          These guidelines are designed to help you understand the rules and expectations for using our platform. Please read them carefully and ensure that you comply with them at all times.
        </p>
      </div>
    </>
  );
} 

export default function Home() {
  return (
    <>
      <Back></Back>
      <CoverSection></CoverSection>
      <Section1></Section1>
    </>
  );
}