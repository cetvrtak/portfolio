"use strict";

const projects = [
  { title: "Streamify", link: "https://stevo-streamify.netlify.app/" },
  // {title:"Anessy", link:"https://www.anessy.com/"},
  { title: "Far Away", link: "https://far-away-vacay.netlify.app", tech: 'react' },
  { title: "Buchhalter", link: "https://buchhalter.netlify.app", tech: 'vue' },
  { title: "Webshop", link: "https://clever-flan-d4fbec.netlify.app/" },
  { title: "Address Book", link: "https://stevo-address-book.netlify.app/" },
  { title: "Gallery", link: "https://chipper-chaja-b92c51.netlify.app" },
];

const icons = {
  'react': "https://react.dev/favicon-32x32.png",
  'vue': "https://vuejs.org/logo.svg",
}

function renderProjects() {
  const projectsEl = document.querySelector(".projects-container");
  projectsEl.innerHTML = "";

  projects.forEach((project, i) => {
    const html = `
      <div class="project-container">
        <iframe src="${project.link}" class="project"></iframe>
        <a href="${project.link}" target="blank_" class="project-link">
          <h2 class="project-title">
            <span>${project.title}</span>
            <span class="underline"></span>
          </h2>
          ${project.tech ? `<img src="${icons[project.tech]}" class="project-icon" />` : ''}
        </a>
      </div>
    `;
    projectsEl.insertAdjacentHTML("beforeend", html);
  });
}
renderProjects();

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
    curProject = project;
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
// slider();
