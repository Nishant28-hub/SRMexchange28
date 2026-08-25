export const isCollegeEmail = (email) => {
  const allowed = (process.env.ALLOWED_COLLEGE_DOMAINS || "")
    .split(",")
    .map((d) => d.trim().toLowerCase())
    .filter(Boolean);

  if (allowed.length === 0) return true; // no restriction configured

  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return false;

  return allowed.includes(domain);
};
