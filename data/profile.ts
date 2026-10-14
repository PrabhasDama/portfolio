/** Verified personal links, with optional build-time configuration overrides. */
export const profile = {
  name: "Prabhas Dama",
  initials: "PD",
  role: "Software Engineer & Product Builder",
  university: "California State University, Long Beach",
  degree: "B.S. Computer Science",
  description:
    "Prabhas Dama studies computer science at Cal State Long Beach and builds CalTrack, an app for nutrition, groceries, pantry and budget.",
  links: {
    github:
      process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/PrabhasDama",
    linkedin:
      process.env.NEXT_PUBLIC_LINKEDIN_URL ||
      "https://www.linkedin.com/in/prabhasdama",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "prabhasdama@gmail.com",
    resume: process.env.NEXT_PUBLIC_RESUME_URL || null,
  },
  // TODO: Set your own domain before public launch. Sites preview origin is separate.
  domain: process.env.NEXT_PUBLIC_SITE_URL || null,
};
