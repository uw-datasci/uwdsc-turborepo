import { Sponsor, QandA } from "../types/home";

import Federato from "../public/logos/federato.svg";
import Intact from "../public/logos/intact.svg";
import MEF from "../public/logos/mef.svg";
import Runql from "../public/logos/runql.svg";
import Sap from "../public/logos/sap.svg";
import Telus from "../public/logos/telus.svg";

export const CURRENT_SPONSORS: Sponsor[] = [
  { name: "Federato", logo: Federato },
  { name: "Telus", logo: Telus },
  { name: "SAP", logo: Sap },
  { name: "Intact", logo: Intact },
  { name: "Runql", logo: Runql },
  { name: "MEF", logo: MEF },
];

export const GENERAL_FAQ: QandA[] = [
  {
    id: "1",
    question: "What is a Data Hackathon?",
    answer: `An event where hackers work in teams to tackle data-related challenges, such as making predictions or classifications from preprepared data sets. You will receive a data set as well as some problem statements, and you will be judged on both your technical abilities as well as the business viability of your solution. At CXC, we will also be hosting social activities, introductory workshops, company booths, and more to help you connect with other participants, industry experts, and learn more about data science.`,
  },
  {
    id: "2",
    question: "What if I have zero experience in data science?",
    answer: `No worries! CXC is a beginner-friendly hackathon. We will host several workshops to help you acquire some useful skills for the challenges. We also have a team of experienced mentors ready to provide support on the CXC Discord.`,
  },
  {
    id: "3",
    question: "How much does it cost?",
    answer:
      "Nothing! Our sponsors allow us to give prizes, merch, meals, snacks, and more - all free of charge!",
  },
  {
    id: "4",
    question: "When is it?",
    answer: `Feb 8 - Feb 25. We will meet in-person on Feb 8th, Feb 9th, and Feb 25th.`,
  },
  {
    id: "5",
    question: "Why is it two weeks long?",
    answer: `We want to provide participants with enough time to complete and finalize their submissions. Our timeline goes through reading week, so you will have some time to work while studying for midterms.`,
  },
  {
    id: "6",
    question: "Will there be prizes?",
    answer: `Yes, CXC is offering $20k+ cash prizes and an interview with PearVC for winners!`,
  },
  {
    id: "7",
    question: "Do I need a team of 4? How can I find one?",
    answer: `Not at all! Teams can have up to 4 people, and joining one offers more support and ideas for working with data. Prize money is the same whether you work alone or in a team. You can find teammates through our Discord introductions channel or in person at Saturday's opening ceremonies.`,
  },
  {
    id: "8",
    question: "Who is judging?",
    answer: `Company representatives from the dataset sponsors as well as executives from DSC’s Education team.`,
  },
  {
    id: "9",
    question: "Do I need to be a UW student to participate?",
    answer: `No! We are open to ALL students from ALL universities. High school students are also welcome to attend.`,
  },
  {
    id: "10",
    question: "Am I required to attend in person?",
    answer: `We required all participants to check-in in-person on the morning of February 8 at the University of Waterloo. Workshops will not be recorded or streamed online. Pitching on February 25th may be done in person or online. Unfortunately we will not be able to provide overnight accommodations or travel reimbursements`,
  },
  {
    id: "11",
    question: "Still have questions?",
    answer: `Feel free to reach out to us at contact@uwdatascience.ca with any questions.`,
  },
];
