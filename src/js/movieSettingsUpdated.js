import { redirect } from "./MovieSettings.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const path = "/index.html";
const seconds = 5;
redirect(path, seconds);
