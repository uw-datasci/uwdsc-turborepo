import { type ComboboxOption } from "@uwdsc/ui";
export const STEP_NAMES = [
  "Your Info",
  "Your Experience",
  "Application questions",
];

export const PERSONAL_FIELDS = ["first_name", "last_name", "email", "dob"];

export const PORTFOLIO_FIELDS = [
  "prior_hackathon_experience",
  "resume",
  "github",
  "linkedin",
  "other_link",
];

export const EDUCATION_FIELDS = [
  "program",
  "year_of_study",
  "university_name",
  "university_name_other",
  "program_other",
];

export const GRADUATION_YEARS = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "5th Year+",
];

export const PROGRAM_OPTIONS: ComboboxOption[] = [
  { value: "Computer Science", label: "Computer Science" },
  { value: "Data Science", label: "Data Science" },
  { value: "Mathematics", label: "Mathematics" },
  { value: "Software Engineering", label: "Software Engineering" },
  { value: "Electrical Engineering", label: "Electrical Engineering" },
  { value: "Mechanical Engineering", label: "Mechanical Engineering" },
  { value: "Systems Design Engineering", label: "Systems Design Engineering" },
  { value: "Biomedical Engineering", label: "Biomedical Engineering" },
  { value: "Engineering", label: "Engineering" },
  { value: "Sciences", label: "Sciences" },
  { value: "Arts", label: "Arts" },
  { value: "Business", label: "Business" },
  { value: "Health/Life Sciences", label: "Health/Life Sciences" },
  { value: "Other", label: "Other" },
];

export const UNIVERSITY_OPTIONS: ComboboxOption[] = [
  { value: "University of Waterloo", label: "University of Waterloo" },
  {
    value: "University of Toronto St. George",
    label: "University of Toronto St. George",
  },
  {
    value: "University of Toronto Scarborough",
    label: "University of Toronto Scarborough",
  },
  {
    value: "University of Toronto Mississauga",
    label: "University of Toronto Mississauga",
  },
  { value: "York University", label: "York University" },
  { value: "Western University", label: "Western University" },
  {
    value: "University of British Columbia",
    label: "University of British Columbia",
  },
  {
    value: "Toronto Metropolitan University",
    label: "Toronto Metropolitan University",
  },
  {
    value: "University of Western Ontario",
    label: "University of Western Ontario",
  },
  { value: "McMaster University", label: "McMaster University" },
  { value: "Queen's University", label: "Queen's University" },
  { value: "Carleton University", label: "Carleton University" },
  { value: "McGill University", label: "McGill University" },
  { value: "Other", label: "Other" },
];

export const BLANK_APPLICATION = {
  first_name: "",
  last_name: "",
  email: "",
  dob: "",
  prior_hackathon_experience: [],
  resume: null,
  github: "",
  linkedin: "",
  other_link: "",
  program: "",
  year_of_study: "",
  university_name: "",
  university_name_other: "",
  program_other: "",
  status: "draft",
};

export const APPLICATION_RELEASE_DATE = new Date(); // Set actual release date here
export const APPLICATION_DEADLINE = new Date(); // Set actual deadline here

// personal
export const PERSONAL_INFO_FIELDS = {
  email: "email",
  phone: "phone",
  discord: "discord",
  gender: "gender",
  ethnicity: "ethnicity",
} as const;

export const TSHIRT_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"];

export const DIETARY_OPTIONS = [
  "None",
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Halal",
  "Kosher",
  "Other",
];

export const GENDERS = [
  "Male",
  "Female",
  "Non-binary",
  "Other",
  "Prefer not to say",
];

export const ETHNICITIES = [
  "Asian",
  "Black or African",
  "Hispanic or Latino",
  "White",
  "Indigenous",
  "Middle Eastern",
  "Pacific Islander",
  "Other",
];

// experience
export const HACKER_EXPERIENCE_OPTIONS = [
  "None",
  "Hacker",
  "Judge",
  "Mentor",
  "Organizer",
];

// cxc app questions
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
