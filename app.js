const projectList = document.getElementById("project-list");
const modalView = document.getElementById("modal-view");

fetch("data/project-data.json")
  .then((response) => response.json())
  .then((data) => {
    const projects = data.projects;
 
    // Create a card for each project
    projects.forEach((project) => {
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
      description.textContent = project.description;
      card.appendChild(description);

      const tags = document.createElement("ul");
      tags.classList.add("tag-list");
      project.tags.forEach((tag) => {
        const tagItem = document.createElement("li");
        tagItem.textContent = tag;
        tags.appendChild(tagItem);
      });

      const date = document.createElement("p");
      date.textContent = project.date;
      card.appendChild(date);

      card.appendChild(tags);
 
     
 
       // Create a modal for the project
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
            <ul class="mtag-list">
              ${project.tags.map(tag => `<li>${tag}</li>`).join('')}
            </ul>
            <div class="links">
            <div class="bu">
            <i class="devicon-github-original"></i> 
            <a href="${project.github}" target="_blank">View on GitHub</a>
            </div>    
              ${project.video ? `<div class="bu"><i class="fab fa-youtube fa-2x"></i><a href="${project.video}" target="_blank">Watch Demo</a></div>` : ''}
            </div>
            </div>
            <div class="right-column">
            
            <p>${project.longDescription}</p>
            </div>
          </div>
        
      
         </div>
         
       `;
       modalView.appendChild(modal);
 
       // Add click event listener to display the modal
       card.addEventListener('click', () => {
         modal.style.display = "flex";
         console.log("Clicked on Card")
       });
 
       // Add click event listener to close the modal
       const close = modal.querySelector(".close");
       console.log(close); // log the close button element to the console
       close.onclick = () => {
         console.log("close button clicked"); // log a message to the console when the close button is clicked
         modal.style.display = "none";
       };
 
      projectList.appendChild(card);
    });
  
  });

    

  const filterButtons = document.querySelectorAll('.filter-button');
  let activeFilters = [];
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.tag;
      if (activeFilters.includes(filter)) {
        activeFilters = activeFilters.filter(f => f !== filter);
      } else {
        activeFilters.push(filter);
      }
      console.log(activeFilters)
      filterProjects(activeFilters,projects);
    });
  });
  
  function filterProjects(filters) {
    console.log(projects)
    const filteredProjects = projects.filter(project => {
      return filters.every(filter => project.tags.includes(filter));
    });
    updateProjectList(filteredProjects);
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
