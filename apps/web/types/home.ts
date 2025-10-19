import { StaticImageData } from "next/image";

export type Stat = {
  id: string;
  title: string;
  stat: number;
  prefix: string;
  suffix: string;
};

export type Event = {
  id: string;
  title: string;
  image: StaticImageData;
};
