// const baseURL = import.meta.env.VITE_SERVER_URL;
const apiURL = import.meta.env.VITE_API_URL;
const apiKEY = import.meta.env.VITE_API_KEY;
// ===================================================== start 
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": apiKEY,
    "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
    "Content-Type": "application/json",
  },
};
// get information on 1 movie
export async function getMovie(id) {
  const newId = id || "110";
  const url = `${apiURL}/shows/${newId}?output_language=en`;

  const response = await fetch(url, options);
  // console.log(response);

  if (!response.ok) {
    throw new Error("Movie not found");
  }

  return await response.json();
}
// ===================================================== end 

// ===================================================
