import React from "react";
import Link from "next/link";
import Image from "next/image";
import Rimage from "../logos/React.png";

const NavigateBar = () => {
  return (
    <div className="flex justify-between items-center w-full h-12 bg-gray text-red-500">
      <div className="w-350px flex space-x-96 p-5">
        <Link href="/about">about</Link>
        <Link href="/report">report</Link>
      </div>
      <Link href="/">
        <Image src={Rimage} alt="React 로고" width={50} height={50} />
      </Link>
      <div className="w-350px flex space-x-96 p-5">
        <Link href="/todos-csr">todos-csr</Link>
        <Link href="/todos-ssr">todos-ssr</Link>
      </div>
    </div>
  );
};

export default NavigateBar;
