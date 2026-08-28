import { getLocalStorage, setLocalStorage, STREAMING_KEY } from "./utils.mjs";

export async function displayStreamingServices() {
  const response = await fetch("/test/streaming.json");
  const services = await response.json();
  //   console.log("Services:", services);
  //   console.log("Service 0:", services.services[0]);

  const form = document.getElementById("streaming");
  form.innerHTML = "";
  services.services.forEach((service) => {
    const typeService = document.createElement("div");
    const checkService = `
            <input type="checkbox" id="${service.id}" name="streaming" value="${service.id}">
            <label for="${service.id}"><img src="${service.imageSet.lightThemeImage}" alt="${service.name}" class="service-logo"></label>
        `;
    typeService.innerHTML = checkService;
    form.appendChild(typeService);
  });
  // Call this when the settings page loads
  loadPreferredServices(document.getElementById("settings-form"));

  savePreferredServices("settings-form");
}

export function savePreferredServices(id) {
  const update = document.getElementById(id);
  update.addEventListener("submit", (e) => {
    e.preventDefault();
    const checked = [
      ...update.querySelectorAll(`input[name="streaming"]:checked`),
    ].map((input) => input.value);

    redirect("/settings/update.html", 1);

    setLocalStorage(STREAMING_KEY, checked);
    console.log("Saved services:", checked);
  });
}

export function redirect(path = "/index.html", timeSeconds = 10) {
  const time = timeSeconds * 1000;
  setTimeout(() => {
    window.location.href = path;
  }, time);
}

export function loadPreferredServices(form) {
  const saved = getLocalStorage(STREAMING_KEY) || [];
  console.log(saved);
  form.querySelectorAll(`input[name="streaming"]`).forEach((input) => {
    input.checked = saved.includes(input.value);
  });
}
