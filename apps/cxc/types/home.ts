import { StaticImageData } from "next/image";

export type QandA = {
  id: string;
  question: string;
  answer: string;
};

export type Sponsor = {
  name: string;
  logo: StaticImageData;
  type?: string;
  link?: string;
};
