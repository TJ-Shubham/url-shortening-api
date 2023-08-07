const hamburgerbtn = document.querySelector(".hamburger-menu");
const navlinks = document.querySelector(".nav-links");
const form = document.querySelector(".url-form");
const input = document.querySelector("#url");
const container = document.querySelector("#container");
let p;

hamburgerbtn.addEventListener("click", () => {
  if (hamburgerbtn.classList.contains("active")) {
    navlinks.style.display = "none";
    hamburgerbtn.classList.remove("active");
  } else {
    hamburgerbtn.classList.add("active");
    navlinks.style.display = "block";
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const url = input.value;
  const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
  const data = await response.json();

  const output = document.createElement("div");
  output.classList.add("output");

  if (data.ok) {
    // display the shortened URL
    output.innerHTML = `
      <p>${url}</p>
      <hr>
      <p><a href="${data.result.short_link}" target="_blank"  rel="noopener noreferrer">${data.result.short_link}</a></p>
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
    form.reset();
    input.focus();

    // reset copy button after delay
    setTimeout(() => {
      copyBtn.style.backgroundColor = "";
      copyBtn.textContent = "Copy";
    }, 3000);
  } else {
    // handle error
    output.textContent = `Error: ${data.error}`;
    container.appendChild(output);

    input.style.setProperty("--placeholder-color", "#ff9c9c");

    // add p element with text "Please add a link" below the input
    if (!p) {
      p = document.createElement("p");
      p.textContent = "Please add a link";
      p.style.color = "red";
      p.style.fontSize = "0.8rem";
      form.insertBefore(p, input.nextSibling);
    }
    form.reset();
    input.focus();
    setTimeout(() => {
      container.removeChild(output);
      input.style.removeProperty("--placeholder-color");
      if (p) {
        form.removeChild(p);
        p = null;
      }
    }, 3000);
  }
});