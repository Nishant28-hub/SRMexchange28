export const isCollegeEmail = (email) => {
  // Allow all valid email formats so anyone can register freely
  if (!email || typeof email !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};
