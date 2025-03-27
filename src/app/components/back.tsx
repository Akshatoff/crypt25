import Link from "next/link";
import Image from 'next/image';
import backIcon from '../../../public/back.svg';

export default function Back() {
  return (
    <Link href="/">
      <button className="backgroundless enlarged">
        <Image src={backIcon} alt="Back"></Image>
      </button>
    </Link>
  );
}