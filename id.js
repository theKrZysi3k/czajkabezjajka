var time = document.querySelector(".time_text");
var params = new URLSearchParams(window.location.search);

document.addEventListener('click', () => {
  document.querySelector("body").requestFullscreen();
});

var firstname = params.get("firstname");
var surname = params.get("surname");
var image = params.get("image");
var date = params.get("date");

function hideAddressBar() {
  if (document.documentElement.scrollHeight < window.outerHeight / window.devicePixelRatio)
    document.documentElement.style.height = (window.outerHeight / window.devicePixelRatio) + 'px';
  setTimeout(window.scrollTo(1, 1), 0);
}
window.addEventListener("load", function () { hideAddressBar(); });
window.addEventListener("orientationchange", function () { hideAddressBar(); });

let webManifest = {
  "name": "",
  "short_name": "",
  "theme_color": "#f5f6fb",
  "background_color": "#f5f6fb",
  "display": "standalone"
};

window.addEventListener(
  "touchmove",
  function (event) {
    if (event.scale !== 1) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  },
  { passive: false }
);

let manifestElem = document.createElement('link');
manifestElem.setAttribute('rel', 'manifest');
manifestElem.setAttribute('href', 'data:application/manifest+json;base64,' + btoa(JSON.stringify(webManifest)));
document.head.prepend(manifestElem);

document.querySelector(".surname").innerHTML = surname ? surname.toUpperCase() : "Brak nazwiska";
document.querySelector(".firstname").innerHTML = firstname ? firstname.toUpperCase() : "Brak imienia";
document.querySelector(".id_own_image").style.backgroundImage = image ? "url('" + image + "')" : "none";
document.querySelector(".date").innerHTML = date ? date.toUpperCase() : "Brak daty";

var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
var now = new Date();
document.querySelector(".bottom_update_value").innerHTML = now.toLocaleDateString("pl-PL", options);

setClock();
function setClock() {
  now = new Date();
  time.innerHTML = "Czas: " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + " " + now.toLocaleDateString("pl-PL", options);
  delay(1000).then(() => {
    setClock();
  });
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
function convertDateToISO(date) {
  if (!date) return null;
  const parts = date.split(".");
  if (parts.length !== 3) {
    return null;
  }
  const [day, month, year] = parts.map(part => parseInt(part, 10));
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return null;
  }
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function generatePESEL(birthDate) {
  if (!birthDate) return "Brak daty";
  const [year, month, day] = birthDate.split("-").map(Number);
  const adjustedMonth = year >= 2000 ? month + 20 : month;
  const yearPart = String(year % 100).padStart(2, "0");
  const monthPart = String(adjustedMonth).padStart(2, "0");
  const dayPart = String(day).padStart(2, "0");
  const randomPart = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
  const peselBase = `${yearPart}${monthPart}${dayPart}${randomPart}`;
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  const sum = peselBase.split("").reduce((acc, digit, idx) => acc + digit * weights[idx], 0);
  const controlDigit = (10 - (sum % 10)) % 10;

  return peselBase + controlDigit;
}

if (date) {
  const isoDate = convertDateToISO(date);
  if (isoDate) {
    const pesel = generatePESEL(isoDate);
    document.querySelector(".pesel").innerHTML = pesel;
  } else {
    document.querySelector(".pesel").innerHTML = "Podałeś datę w złym formacie";
  }
} else {
  document.querySelector(".pesel").innerHTML = "Nie podałeś daty";
}
