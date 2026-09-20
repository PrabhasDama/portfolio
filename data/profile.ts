/** Personal links stay unset until supplied. Never substitute invented URLs. */
export const profile = {
  name: "Prabhas Dama",
  initials: "PD",
  role: "Software Engineer & Product Builder",
  university: "California State University, Long Beach",
  degree: "B.S. Computer Science",
  description:
    "I build software that turns complicated problems into simple experiences.",
  links: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL || null,
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || null,
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
    resume: process.env.NEXT_PUBLIC_RESUME_URL || null,
  },
  // TODO: Set your own domain before public launch. Sites preview origin is separate.
  domain: process.env.NEXT_PUBLIC_SITE_URL || null,
};
