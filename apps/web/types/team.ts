import { StaticImageData } from "next/image";

export type Member = {
  id: string;
  name: string;
  position: string;
  image: StaticImageData;
  email?: string;
  website?: string;
  linkedin?: string;
  instagram?: string;
};

export type Subteam = {
  id: string;
  name: string;
  members: Member[];
};
