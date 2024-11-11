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
  
      // Create modal for project with sliding image/video/article carousel
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
              <div class="carousel">
                <div class="carousel-content">
                  ${project.media.map(media => `
                    <div class="carousel-item" data-type="${media.type}">
                      ${media.type === "article" 
                        ? `
                          <img src="${media.image}" alt="${project.title}" />
                          <a href="${media.url}" target="_blank" class="view-article-button">View Article</a>
                        `
                        : `<${media.type === "video" ? "video autoplay loop muted" : "img"} src="${media.url}" 
                            ${media.type === "video" ? "controls autoplay muted loop" : ""} 
                            alt="${project.title}" />`
                      }
                    </div>`).join('')}
                </div>
                <div class="carousel-label">Image</div>
                <button class="prev">&#10094;</button>
                <button class="next">&#10095;</button>
              </div>
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
  
      // Carousel Functionality
      const carouselContent = modal.querySelector('.carousel-content');
      const carouselItems = modal.querySelectorAll('.carousel-item');
      const label = modal.querySelector('.carousel-label');
      let currentSlide = 0;
      let autoSlideInterval;
  
      function showSlide(index) {
        currentSlide = (index + carouselItems.length) % carouselItems.length;
        carouselContent.style.transform = `translateX(-${currentSlide * 100}%)`;
        const type = carouselItems[currentSlide].getAttribute("data-type");
        label.textContent = type.charAt(0).toUpperCase() + type.slice(1);
  
        // Set label to be clickable for articles
        if (type === "article") {
          label.classList.add("clickable");
          label.onclick = () => window.open(carouselItems[currentSlide].querySelector(".view-article-button").href, "_blank");
        } else {
          label.classList.remove("clickable");
          label.onclick = null;
        }
      }
  
      function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
          showSlide(currentSlide + 1);
        }, 5000); // Change slide every 5 seconds
      }
  
      function stopAutoSlide() {
        clearInterval(autoSlideInterval);
      }
  
      modal.querySelector('.next').onclick = () => {
        showSlide(currentSlide + 1);
        stopAutoSlide(); // Stops auto-slide on manual control
        startAutoSlide(); // Restart auto-slide after manual control
      };
      
      modal.querySelector('.prev').onclick = () => {
        showSlide(currentSlide - 1);
        stopAutoSlide();
        startAutoSlide();
      };
  
      // Start auto-sliding on modal open and set up autoplay
      card.addEventListener('click', () => {
        modal.style.display = "flex";
        showSlide(0); // Reset carousel on open
        startAutoSlide();
      });
  
      // Close modal and stop auto-slide
      const close = modal.querySelector(".close");
      close.onclick = () => {
        modal.style.display = "none";
        stopAutoSlide();
      };
  
      projectList.appendChild(card);
    });
  }
  
const blogList = document.getElementById("blog-list");
let allBlogs = [];

// Fetch the blog data (replace 'data/blog-data.json' with your actual data path)
fetch("data/blog-data.json")
  .then((response) => response.json())
  .then((data) => {
    allBlogs = data.blogs;

    // Render all blog cards
    updateBlogList(allBlogs);
  });

function updateBlogList(blogs) {
  blogList.innerHTML = '';

  blogs.forEach(blog => {
    const card = document.createElement("div");
    card.classList.add("blog-card");

    // Make the entire card clickable by adding an event listener
    card.addEventListener('click', () => {
      window.open(blog.url, '_blank'); // Open the blog link in a new tab
    });

    const image = document.createElement("img");
    image.src = blog.image;
    image.alt = blog.title;
    card.appendChild(image);

    const title = document.createElement("h2");
    title.textContent = blog.title;
    card.appendChild(title);

    const description = document.createElement("p");
    description.classList.add("desc");
    description.textContent = blog.description;
    card.appendChild(description);

    const date = document.createElement("p");
    date.classList.add("date");
    date.textContent = blog.date;
    card.appendChild(date);

    // Append the card to the blog list
    blogList.appendChild(card);
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

// setInterval(changeBackgroundImage, 3000); // Change image every 3 seconds
const aboutVideo = document.querySelector('#about-video');
const aboutImageOverlay = document.querySelector('.about-image-overlay');
const videoSources = [
    '../images/videos/aloha.mp4',
    '../images/videos/b2.mp4',
    '../images/videos/robocon3.mp4',
    '../images/videos/robocon2.mp4',
    '../images/videos/robocon4.mp4',
    '../images/videos/robocon5.mp4',
    '../images/videos/autorobot.mp4',
    '../images/videos/drne.mp4',
    '../images/videos/ariac.mp4',
    '../images/videos/quadruped.mp4',
    '../images/videos/auto_vehicle.mp4',
    '../images/videos/firefly.mp4',
]; // Replace with your actual video paths
let videoIndex = 0;

// Function to smoothly change the video source with a fade transition
function changeBackgroundVideo() {
  aboutVideo.style.opacity = '0'; // Fade out current video
  setTimeout(() => {
      videoIndex = (videoIndex + 1) % videoSources.length;
      aboutVideo.src = videoSources[videoIndex];
      aboutVideo.play();
      aboutVideo.style.opacity = '1'; // Fade in new video
  }, 1000); // Wait for fade-out transition to complete
}

// Start with the image overlay, then fade it out and start the video slideshow
setTimeout(() => {
  aboutImageOverlay.style.opacity = '0'; // Fade out the image overlay
  aboutVideo.style.opacity = '1'; // Fade in the video
  aboutVideo.src = videoSources[videoIndex];
  aboutVideo.play();

  // Start the video slideshow with smooth transitions after the initial fade-in
  setInterval(changeBackgroundVideo, 6000); // Interval slightly longer than video switch delay
}, 1500); // Initial 1-second delay to display the image