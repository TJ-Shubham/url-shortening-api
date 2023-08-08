const hamburgerbtn = document.querySelector(".hamburger-menu");
const navlinks = document.querySelector(".nav-links");
const form = document.querySelector(".url-form");
const input = document.querySelector("#url");
const container = document.querySelector("#container");
let p;

hamburgerbtn.addEventListener("click", () => {
  navlinks.style.display = hamburgerbtn.classList.toggle("active") ? "block" : "none";
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const url = input.value;
  const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
  const data = await response.json();

  if (data.ok) {
    // display the shortened URL
    const output = document.createElement("div");
    output.classList.add("output");
    output.innerHTML = `
      <p>${url}</p>
      <hr>
      <p><a href="${data.result.short_link}" target="_blank" rel="noopener noreferrer">${data.result.short_link}</a></p>
      <button class="copy-btn">Copy</button>
    `;
    const copyBtn = output.querySelector(".copy-btn");
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(data.result.short_link).then(() => {
        copyBtn.style.backgroundColor = "var(--Dark-Violet)";
        copyBtn.textContent = "Copied!";
      });
    });

    container.appendChild(output);
  } else {
    // handle error
    input.style.setProperty("--placeholder-color", "#ff9c9c");

    // add p element with text
    if (!p) {
      p = document.createElement("p");
      p.textContent = "Please add a link";
      p.style.color = "red";
      p.style.fontSize = "0.8rem";
      window.innerWidth < 900 ? form.insertBefore(p, input.nextSibling) : form.appendChild(p);
    }
  }
  form.reset();
  input.focus();
  setTimeout(() => {
    input.style.removeProperty("--placeholder-color");
    if (p) {
      form.removeChild(p);
      p = null;
    }
  }, 3000);
});