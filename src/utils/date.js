/* "2026-09-29" -> "29 September 2026".
   Formatted by hand, not with toLocaleDateString: the prerender runs in
   Node and the page hydrates in the visitor's browser, and a locale- or
   time-zone-dependent string would differ between the two and fail
   hydration. An ISO date string is also parsed as UTC midnight by Date,
   which can be the previous day in the visitor's zone. */
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const formatDate = (iso = "") => {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS[m - 1]} ${y}`;
};
