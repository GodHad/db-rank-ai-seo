const APP_URL = "http://localhost:8000/";
const generateSlug = (title) => {
  return title.toLowerCase().trim().replace(/[\s\W-]+/g, "-").replace(/^-+|-+$/g, "");
};
export {
  APP_URL as A,
  generateSlug as g
};
