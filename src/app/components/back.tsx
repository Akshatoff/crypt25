import Link from "next/link";
import Image from 'next/image';
import backIcon from '../../../public/back.svg';

export default function Back() {
  return (
    <Link href="/" style={{ position: "absolute" }}>
      <button className="backgroundless enlarged highMargin">
        <Image src={backIcon} alt="Back"></Image>
      </button>
    </Link>
  );
}