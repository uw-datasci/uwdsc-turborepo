import { type ComboboxOption } from "@uwdsc/ui";

export const STEP_NAMES = ["CxC Application", "Personal Details", "Education"];

export const PERSONAL_FIELDS = ["first_name", "last_name", "email", "dob"];

export const EDUCATION_FIELDS = [
  "program",
  "year_of_study",
  "university_name",
  "university_name_other",
  "program_other",
];

export const graduationYears: ComboboxOption[] = [
  { value: "1st Year", label: "1st Year" },
  { value: "2nd Year", label: "2nd Year" },
  { value: "3rd Year", label: "3rd Year" },
  { value: "4th Year", label: "4th Year" },
  { value: "5th Year+", label: "5th Year+" },
];

export const programOptions: ComboboxOption[] = [
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

export const universityOptions: ComboboxOption[] = [
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
  program: "",
  year_of_study: "",
  university_name: "",
  university_name_other: "",
  program_other: "",
  status: "draft",
};

export const APPLICATION_RELEASE_DATE = new Date(); // Set actual release date here
export const APPLICATION_DEADLINE = new Date(); // Set actual deadline here
