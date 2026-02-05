import { Sponsor, QandA } from "../types/home";

import Accenture from "../public/logos/sponsors/accenture.svg";
import AroundHi from "../public/logos/sponsors/aroundhi.svg";
import Backboardio from "../public/logos/sponsors/backboardio.svg";
import Chef from "../public/logos/sponsors/chef.svg";
import Conrad from "../public/logos/sponsors/conrad.svg";
import Equitable from "../public/logos/sponsors/equitable.svg";
import Figma from "../public/logos/sponsors/figma.svg";
import KPMG from "../public/logos/sponsors/kpmg.svg";
import MEF from "../public/logos/sponsors/mef.svg";
import NomadFuturist from "../public/logos/sponsors/nomad_futurist.svg";
import Redbull from "../public/logos/sponsors/redbull.svg";
import Tangerine from "../public/logos/sponsors/tangerine.svg";

export const PLATINUM_SPONSORS: Sponsor[] = [
  {
    name: "Tangerine",
    logo: Tangerine,
    link: "https://www.tangerine.ca/en/about-us",
  },
];

export const BRONZE_SPONSORS: Sponsor[] = [
  { name: "Equitable", logo: Equitable, link: "https://equitable.ca/home" },
  {
    name: "Nomad Futurist",
    logo: NomadFuturist,
    link: "https://nomadfuturist.org/",
  },
  {
    name: "Accenture",
    logo: Accenture,
    link: "https://www.accenture.com/ca-en",
  },
  { name: "KPMG", logo: KPMG, link: "https://kpmg.com/ca/en/home.html" },
  {
    name: "Conrad",
    logo: Conrad,
    link: "https://uwaterloo.ca/brand/uw-logo/school-logos/conrad-school-entrepreneurship-and-business",
  },
  { name: "Around Hi", logo: AroundHi, link: "https://aroundhisolutions.com/" },
  { name: "Backboard.io", logo: Backboardio, link: "https://backboard.io/" },
];

export const PARTNERS: Sponsor[] = [
  { name: "Redbull", logo: Redbull, link: "https://www.redbull.com/ca-en" },
  { name: "Figma", logo: Figma, link: "https://www.figma.com/" },
  { name: "Chef", logo: Chef, link: "https://thechefsignature.ca/" },
  { name: "MEF", logo: MEF, link: "https://uwaterloo.ca/math-endowment-fund/" },
];

export const GENERAL_FAQ: QandA[] = [
  {
    id: "1",
    question: "What is CXC?",
    answer: `CXC is Waterloo's Largest AI Hackathon returning for its 5th iteration this year! Over 300 students gather at Waterloo's campus to create unique and inspiring designs that tackle data-related challenges. 
    This year, CXC will have no restrictions on the type of project you can make. Some past examples of projects include predictions/classifications of datasets, training AI models, or making a data science related website. 
    We will also be hosting social activities, introductory workshops, company booths, and more to help you connect with other participants, industry experts, and learn more about data science.`,
  },
  {
    id: "2",
    question: "What if I have zero experience in data science?",
    answer: `No worries! CXC is a beginner-friendly hackathon. We will host several workshops throughout the event to help you acquire some useful skills for the challenges. We will also have a team of experienced mentors ready to provide support on the CXC Discord.`,
  },
  {
    id: "3",
    question: "How much does it cost?",
    answer:
      "Nothing! Our sponsors allow us to give prizes, merch, meals, snacks, and more - all free of charge!",
  },
  {
    id: "4",
    question: "When and where is it?",
    answer: `CXC will take place on February 6th at 6PM to February 8th at 5PM at Waterloo's STC building.`,
  },
  {
    id: "5",
    question: "How many people are allowed in a team?",
    answer: `Teams can have between 1-4 people. You can find teammates through our Discord introductions channel or in-person during the opening ceremony.`,
  },
  {
    id: "6",
    question: "Do I need to be a UW student to participate?",
    answer: `No! We are open to ALL students from ALL universities. We will unfortunately not admit any high school students this year.`,
  },
  {
    id: "7",
    question: "Am I required to attend in-person?",
    answer: `We required all participants to check-in in-person on the evening of February 6th at the University of Waterloo. Workshops will not be recorded or streamed online. Pitching on February 8th will be done in person. Overnight stay at the venue is allowed. Unfortunately we cannot provide travel reimbursements.`,
  },
  {
    id: "8",
    question: "What events will you have at CXC?",
    answer: `In the past, CXC hosted multiple data science related workshops from simpler topics such as introducing machine learning and data processing with python, to more advanced topics such as planning and structural AI projects. Our event sponsors will also be running booths where you can learn their mission and connect with them throughout the day. Be sure to check them out!
    In addition, CXC will also be running multiple fun activities throughout the event, from spicy noodle challenge to late-night karaoke. We're confident that our events will be enough for anyone to enjoy :)`,
  },
  {
    id: "9",
    question: "What is the MLH Code of Conduct?",
    answer: `CXC follows the Major League Hacking (MLH) Code of Conduct. All participants are expected to treat others with respect and create a welcoming, inclusive environment. Harassment or discrimination of any kind will not be tolerated. You can read the full [Code of Conduct](https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md).`,
  },
];
