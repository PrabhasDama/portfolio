export type Experience = {
  id: string;
  role: string;
  organization: string;
  period: string | null;
  description: string;
  placeholder: boolean;
};
/** Replace the placeholder with supplied, verified experience. */
export const experiences: Experience[] = [
  {
    id: "pending",
    role: "",
    organization: "",
    period: null,
    description: "",
    placeholder: true,
  },
];
export const experienceEmptyState = "Experience details will be added here.";
export const education = {
  degree: "B.S. Computer Science",
  institution: "California State University, Long Beach",
  period: null,
};
