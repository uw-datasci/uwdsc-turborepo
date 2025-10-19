import rocket from "@/public/graphics/rocket.png";
import trophy from "@/public/graphics/trophy.png";
import folder from "@/public/graphics/folder.png";
import computer from "@/public/graphics/computer.png";
import documents from "@/public/graphics/documents.png";
import chat from "@/public/graphics/chat.png";
import { Stat, Event } from "@/types/home";
import eventPlaceholder from "@/public/placeholder/event.png";

export const WHAT_WE_DO_CARDS = [
  {
    title: "Workshops",
    description:
      "Join us for workshops, where we teach a variety of Data Science topics.",
    graphic: rocket,
  },
  {
    title: "CxC",
    description: "Stay tuned for our CxC hackathon, happening this winter!",
    graphic: trophy,
  },
  {
    title: "Project Program",
    description:
      "Collaborate with fellow students on any project of your choice.",
    graphic: folder,
  },
  {
    title: "E-Leetcoding",
    description:
      "Prepare for technical interviews with our weekly Leetcoding sessions.",
    graphic: computer,
  },
  {
    title: "Reading Groups",
    description:
      "Learn about the latest developments in Data Science and Machine Learning.",
    graphic: documents,
  },
  {
    title: "Social Events",
    description:
      "Come hang out with us and meet other students interested in Data Science!",
    graphic: chat,
  },
];

export const CLUB_STATS: Stat[] = [
  {
    id: "workshops-held",
    title: "Workshops Held",
    stat: 100,
    prefix: "",
    suffix: "+",
  },
  {
    id: "current-members",
    title: "Current Members",
    stat: 300,
    prefix: "",
    suffix: "+",
  },
  {
    id: "instagram-followers",
    title: "Instagram Followers",
    stat: 4000,
    prefix: "",
    suffix: "+",
  },
];

export const PAST_EVENTS: Event[] = [
  {
    id: "1",
    title: "Upper Year Co-op Panel",
    image: eventPlaceholder,
  },
  {
    id: "2",
    title: "BOT ",
    image: eventPlaceholder,
  },
  {
    id: "3",
    title: "Point72 Q&A Panel",
    image: eventPlaceholder,
  },
  {
    id: "4",
    title: "Karaoke Night",
    image: eventPlaceholder,
  },
  {
    id: "5",
    title: "How to Build an AI Companion",
    image: eventPlaceholder,
  },
  {
    id: "6",
    title: "EOT Estimathon",
    image: eventPlaceholder,
  },
  {
    id: "7",
    title: "Bonfire",
    image: eventPlaceholder,
  },
  {
    id: "8",
    title: "Speed Friending",
    image: eventPlaceholder,
  },
  {
    id: "9",
    title: "DSC Trivia Night",
    image: eventPlaceholder,
  },
  {
    id: "10",
    title: "Intro to Langchain",
    image: eventPlaceholder,
  },
];
