import Image from "next/image";

export default function Logo() {
    return (
      <a href={`/`}>
        <Image src="/logo.svg" alt="Peec AI" width={118} height={20} priority />
      </a>
    );
  }