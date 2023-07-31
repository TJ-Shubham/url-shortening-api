const hamburgerbtn = document.querySelector(".hamburger-menu");
const navlinks = document.querySelector(".nav-links");

hamburgerbtn.addEventListener("click", () => {
  if (hamburgerbtn.classList.contains("active")) {
    navlinks.style.display = "none";
    hamburgerbtn.classList.remove("active");
  } else {
    hamburgerbtn.classList.add("active");
    navlinks.style.display = "block";
  }
});