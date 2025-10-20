import { StaticImageData } from "next/image";

export type Stat = {
  id: string;
  title: string;
  stat: number;
  prefix: string;
  suffix: string;
};

export interface Event {
  id: string;
  title: string;
  image: StaticImageData;
  description?: string;
  date?: string;
  location?: string;
  link?: string;
}
