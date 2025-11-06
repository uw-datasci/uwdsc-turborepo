export const STEP_NAMES = ["Intro", "Personal Details", "Education", "Preferences", "Portfolio", "CxC Application"];

export const PERSONAL_FIELDS = ["first_name", "last_name", "email", "dob"];

export const BLANK_APPLICATION = {
  first_name: "",
  last_name: "",
  email: "",
  dob: "",
  status: "draft",
};

export const questions = [
  {
    name: "cxc_gain" as const,
    question: "What do you hope to gain from your time at CxC...?",
    placeholder: "Long Answer (500 char limit)",
  },
  {
    name: "silly_q" as const,
    question: "Silly Q Here",
    placeholder: "Long Answer (200 char limit)",
  },
];


export const APPLICATION_RELEASE_DATE = new Date(); // Set actual release date here
export const APPLICATION_DEADLINE = new Date(); // Set actual deadline here
