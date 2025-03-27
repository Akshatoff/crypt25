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
        Crypt@trix
      </h1>
    </div>
  );
}

function Section1() {
  return (
    <div className="section flex" id="about">
      <div className="flex-occupy-67">
        <h2>About Crypt</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper turpis nisl, et volutpat ligula vulputate eget. Nulla sed felis finibus, bibendum ante quis, suscipit nisl. Vivamus ac urna sed erat accumsan dictum. Fusce urna dui, ultrices fermentum ornare at, placerat eget elit. In malesuada a lectus in faucibus. Nullam finibus pulvinar pharetra. In et mauris ut ligula pharetra semper. Curabitur consequat ligula non eleifend tincidunt. Quisque at vulputate ex. Vestibulum dolor dui, tincidunt quis ligula eget, posuere pharetra dolor. Nam imperdiet rhoncus efficitur. Aenean vitae viverra eros.</p>
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
        <h2>About Crypt</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper turpis nisl, et volutpat ligula vulputate eget. Nulla sed felis finibus, bibendum ante quis, suscipit nisl. Vivamus ac urna sed erat accumsan dictum. Fusce urna dui, ultrices fermentum ornare at, placerat eget elit. In malesuada a lectus in faucibus. Nullam finibus pulvinar pharetra. In et mauris ut ligula pharetra semper. Curabitur consequat ligula non eleifend tincidunt. Quisque at vulputate ex. Vestibulum dolor dui, tincidunt quis ligula eget, posuere pharetra dolor. Nam imperdiet rhoncus efficitur. Aenean vitae viverra eros.</p>
      </div>
    </div>
  );
}

function Section3() {
  return (
    <div className="section flex" id="about">
      <div className="flex-occupy-67">
        <h2>About Crypt</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper turpis nisl, et volutpat ligula vulputate eget. Nulla sed felis finibus, bibendum ante quis, suscipit nisl. Vivamus ac urna sed erat accumsan dictum. Fusce urna dui, ultrices fermentum ornare at, placerat eget elit. In malesuada a lectus in faucibus. Nullam finibus pulvinar pharetra. In et mauris ut ligula pharetra semper. Curabitur consequat ligula non eleifend tincidunt. Quisque at vulputate ex. Vestibulum dolor dui, tincidunt quis ligula eget, posuere pharetra dolor. Nam imperdiet rhoncus efficitur. Aenean vitae viverra eros.</p>
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
    </>
  );
}