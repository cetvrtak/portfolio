// function orientationChange() {
//   if (window.innerWidth > window.innerHeight) {
//     document.querySelector("body").style.overflow = "visible";
//     document.querySelector("footer").style.position = "relative";
//     document.querySelector(".footer-placeholder").style.display = "none";
//   }
// }
// orientationChange();

document.querySelector(".hamburger").addEventListener("click", () => {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  if (hamburgerMenu.style.display == "block") {
    closeHamburgerMenu(hamburgerMenu);
  } else {
    openHamburgerMenu(hamburgerMenu);
  }
});

function openHamburgerMenu(menu) {
  menu.style.display = "block";

  const hamburgerLines = document.querySelectorAll(".hamburger-line");
  for (line of hamburgerLines) {
    line.style.display = "none";
  }

  document.querySelector(".hamburger-close").style.display = "block";
}

function closeHamburgerMenu(menu) {
  menu.style.display = "none";

  const hamburgerLines = document.querySelectorAll(".hamburger-line");
  for (line of hamburgerLines) {
    line.style.display = "block";
  }

  document.querySelector(".hamburger-close").style.display = "none";
}
