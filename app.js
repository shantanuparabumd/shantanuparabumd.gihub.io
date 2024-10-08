const projectList = document.getElementById("project-list");
const modalView = document.getElementById("modal-view");
let allProjects = [];

// Fetch the project data (you can replace 'data/project-data.json' with your actual data path)
fetch("data/project-data.json")
  .then((response) => response.json())
  .then((data) => {
    allProjects = data.projects;

    // Render all project cards
    updateProjectList(allProjects);
  });

function updateProjectList(projects) {
  projectList.innerHTML = '';

  projects.forEach(project => {
    const card = document.createElement("div");
    card.classList.add("project-card");

    const image = document.createElement("img");
    image.src = project.image;
    image.alt = project.title;
    card.appendChild(image);

    const title = document.createElement("h2");
    title.textContent = project.title;
    card.appendChild(title);

    const description = document.createElement("p");
    description.classList.add("desc");
    description.textContent = project.description;
    card.appendChild(description);

    const tags = document.createElement("ul");
    tags.classList.add("tag-list");
    project.tags.forEach(tag => {
      const tagItem = document.createElement("li");
      tagItem.textContent = tag;
      tags.appendChild(tagItem);
    });

    const date = document.createElement("p");
    date.classList.add("date");
    date.textContent = project.date;
    card.appendChild(date);

    card.appendChild(tags);

    // Create modal for project
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>${project.title}</h2>
          <span class="close">&times;</span>
        </div>
        <div class="modal-body">
          <div class="left-column">
            <img src="${project.image}" alt="${project.title}">
            <ul class="tag-list">
              ${project.tags.map(tag => `<li>${tag}</li>`).join('')}
            </ul>
            <div class="links">
              <a href="${project.github}" target="_blank">View on GitHub</a>
              ${project.video ? `<a href="${project.video}" target="_blank">Watch Demo</a>` : ''}
            </div>
          </div>
          <div class="right-column">
            <p>${project.longDescription || "No detailed description available."}</p>
          </div>
        </div>
      </div>
    `;

    modalView.appendChild(modal);

    // Add click event listener to display the modal
    card.addEventListener('click', () => {
      modal.style.display = "flex";
    });

    // Add click event listener to close the modal
    const close = modal.querySelector(".close");
    close.onclick = () => {
      modal.style.display = "none";
    };

    // Append the card to the project list
    projectList.appendChild(card);
  });
}

  const skillsContainer = document.getElementById('skills-container');
  fetch('data/skills.json')
  .then((response)=>response.json())
  .then((data)=>{
    const skills = data.skills;

    skills.forEach((skill)=>{
      console.log("Reading Json")
      const skill_card=document.createElement("div");
      skill_card.classList.add("skill-card");
      const icon=document.createElement("i");
      icon.classList.add(skill.icon);
      skill_card.appendChild(icon);
      const title=document.createElement("h3");
      const des=document.createElement("p");
      const meter=document.createElement("meter");
      title.textContent=skill.title;
      des.textContent=skill.description;
      skill_card.append(title);
      skill_card.append(des);
      skill_card.append(meter);
      meter.min="0";
      meter.max="1";
      meter.value=skill.level;
      
      skillsContainer.appendChild(skill_card);

    });
  });
  $(document).ready(function(){
    $('.carousel').slick({
      autoplay: true,
      autoplaySpeed: 3000,
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear'
    });
  });

// Updated background image change logic
const aboutSection = document.querySelector('#about');
const images = [
  '../images/background/back.png',
  '../images/background/back2.png'
]; // Replace with your image paths
let currentIndex = 0;

function changeBackgroundImage() {
  currentIndex = (currentIndex + 1) % images.length;
  aboutSection.style.backgroundImage = `
    linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.1)),
    url('${images[currentIndex]}')
  `;
}

setInterval(changeBackgroundImage, 3000); // Change image every 3 seconds