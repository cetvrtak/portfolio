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

//////////////////////////////////////////////////////////
// Slider component
//////////////////////////////////////////////////////////
function slider() {
  const projects = document.querySelectorAll(".project");
  const btnLeft = document.querySelector(".chevron-left");
  const btnRigth = document.querySelector(".chevron-right");
  let curProject = 0;
  const maxProject = projects.length;
  const dotContainer = document.querySelector(".dots");

  function createDots() {
    projects.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-project="${i}"></button>`
      );
    });
  }

  function activateDot(project) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-project="${project}"]`)
      .classList.add("dots__dot--active");
  }

  function goToProject(project) {
    projects.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - project) * 100}%)`)
    );
    activateDot(project);
  }

  function nextProject() {
    if (curProject == maxProject - 1) {
      curProject = 0;
    } else {
      curProject++;
    }
    goToProject(curProject);
  }
  function prevProject() {
    if (curProject == 0) {
      curProject = maxProject - 1;
    } else {
      curProject--;
    }
    goToProject(curProject);
  }
  function init() {
    createDots();
    goToProject(0);
  }
  init();

  btnRigth.addEventListener("click", nextProject);
  btnLeft.addEventListener("click", prevProject);

  document.addEventListener("keydown", function (e) {
    if (e.key == "ArrowLeft") prevProject();
    e.key == "ArrowRight" && nextProject();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { project } = e.target.dataset;
      goToProject(project);
    }
  });
}
slider();
