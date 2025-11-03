export const STEP_NAMES = ["CxC Application", "Personal Details", "Portfolio"];

export const PERSONAL_FIELDS = ["first_name", "last_name", "email", "dob"];

export const PORTFOLIO_FIELDS = ["prior_hackathon_experience", "resume", "github", "linkedin", "other_link"];

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
  status: "draft",
};

export const APPLICATION_RELEASE_DATE = new Date(); // Set actual release date here
export const APPLICATION_DEADLINE = new Date(); // Set actual deadline here
