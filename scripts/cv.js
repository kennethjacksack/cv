document.addEventListener('DOMContentLoaded', function () {
    const experienceList = document.querySelector('#experience-list');
    const educationList = document.querySelector('#education-list');
    const projectsList = document.querySelector('#projects-list');
    const awardsList = document.querySelector('#awards-list');
    const leadershipList = document.querySelector('#leadership-list');
    const sideProjectsList = document.querySelector('#side-projects-list');
    const volunteeringList = document.querySelector('#volunteering-list');
    const skillsList = document.querySelector('#skills-list'); // New Skills List
    const endorsedByList = document.querySelector('#endorsed-by-list'); // New Endorsed By List
    const contactEmail = document.querySelector('#contact-email');
    const contactPhone = document.querySelector('#contact-phone');
    const contactLinkedIn = document.querySelector('#contact-linkedin');
    const yearElement = document.querySelector('#year');
    const footerNameElement = document.querySelector('#footer-name');

    fetch('cv.json')
        .then(response => response.json())
        .then(data => {
            // Clear existing content
            [educationList, projectsList, awardsList, leadershipList, experienceList, sideProjectsList, volunteeringList, skillsList, endorsedByList].forEach(list => {
                list.innerHTML = '';
            });

            // Populate header
            document.querySelector('#name').textContent = data.name;
            document.querySelector('#title').textContent = data.title;

            // Populate sections
            populateList(educationList, data.education, 'education');
            populateList(projectsList, data.projects, 'project');
            populateList(awardsList, data.awards, 'award');
            populateList(leadershipList, data.leadership, 'leadership');
            populateList(experienceList, data.experience, 'experience');
            populateList(sideProjectsList, data.side_projects, 'side-project');
            populateList(volunteeringList, data.volunteering, 'volunteering');
            populateList(skillsList, data.skills, 'skills'); // Populate Skills Section
            populateList(endorsedByList, data.endorsed_by, 'endorsement'); // Populate Endorsed By Section

            // Populate contact section
            contactEmail.textContent = `Email: ${data.contact.email || 'Not provided'}`;
            contactPhone.textContent = `Phone: ${data.contact.phone || 'Not provided'}`;
            contactLinkedIn.href = data.contact.linkedin || '#';
            contactLinkedIn.textContent = data.contact.linkedin ? 'LinkedIn Profile' : 'LinkedIn: Not provided';

            // Populate footer
            yearElement.textContent = new Date().getFullYear();
            footerNameElement.textContent = data.name;
        })
        .catch(error => console.error('Error loading JSON data:', error));

    // Smooth scrolling navigation
    const links = document.querySelectorAll('nav a');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior

            const targetId = this.getAttribute('href').substring(1); // Get the target section ID
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Smoothly scroll to the target element
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

function populateList(listElement, items, type) {
    if (!items || !Array.isArray(items)) return; // Check if items are provided and are an array
    
    items.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('item-container'); // Add class for styling
        
        // Check if URL exists for the title
        const titleHTML = item.url 
            ? `<a href="${item.url}" target="_blank" class="title-link">${item.title || 'No title'}</a>` 
            : `<span class="title">${item.title || 'No title'}</span>`;

        li.innerHTML = `
            <div class="item-header">
                <span class="date">${item.date || 'No date'}</span>
                ${titleHTML}
                <span class="location">${item.location || ''}</span>
            </div>
            ${Array.isArray(item.description) 
                ? `<ul class="${type}-bullets">${item.description.map(point => `<li>${point}</li>`).join('')}</ul>` 
                : `<span class="description">${item.description || 'No description'}</span>`
            }
            ${item.image ? `<img src="${item.image}" alt="${item.title} Image" class="hover-image" data-hover="${item.image}">` : ''}
        `;
        listElement.appendChild(li);
    });
}
