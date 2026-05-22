const defaultProfile = {
    name: "Afuwwan Aqila Zein Putra",
    title: "Creative Game Developer",
    bio: "Creative Game Developer with a passion for innovative gameplay mechanics and immersive storytelling. I bring a unique artistic vision to projects, excelling in both design and coding to create captivating, out-of-the-box experiences.",
    about: "I am adept at collaborating with diverse teams to push the boundaries of conventional game development — from rhythm-based games on custom engines to top-down shooters for global game jams. I excel in translating artistic concepts into interactive realities, combining technical logic with gameplay design.",
    socials: [
        { name: "GitHub", url: "https://github.com/afuwwan" },
        { name: "Itch.io", url: "https://afuwwan.itch.io" },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/afuwwan-aqila-zein-putra42376221a/" }
    ]
};

const defaultProjects = [
    {
        id: "1",
        title: "Rhythm Space",
        category: "Game",
        description: "A college course project featuring a rhythm-based game developed on a low-level custom C++ engine. Focuses on tight input synchronization and performance.",
        image: "assets/cpp_engine.webp",
        link: "https://afuwwan.itch.io/rhythm-space",
        repo: "#"
    },
    {
        id: "2",
        title: "Endless Charge",
        category: "Game",
        description: "A platform-based game developed with GDevelop as a submission for the Game Dev KnockoutJam 2025. Features fast-paced movement mechanics.",
        image: "assets/itch_game.webp",
        link: "https://afuwwan.itch.io/endless-charge",
        repo: "#"
    },
    {
        id: "3",
        title: "Astra Diastima",
        category: "Game",
        description: "A top-down shooter created with GDevelop as a submission for the Pirate Software - Game Jam 16. Incorporates custom enemy AI and weapon mechanics.",
        image: "assets/profile.png",
        link: "https://afuwwan.itch.io/astra-diastima",
        repo: "#"
    },
    {
        id: "4",
        title: "WEB VR Tour Museum Brawijaya",
        category: "VR",
        description: "A college course project demonstrating a web-based VR tour showcasing the Museum Brawijaya environment. Built using the A-Frame framework.",
        image: "assets/vr_tour.webp",
        link: "https://afuwwan.github.io/VRTour/",
        repo: "#"
    }
];

// Initialize Data
function getData() {
    const profile = JSON.parse(localStorage.getItem('portfolio_profile')) || defaultProfile;
    const projects = JSON.parse(localStorage.getItem('portfolio_projects')) || defaultProjects;
    return { profile, projects };
}

// Render Functions
document.addEventListener('DOMContentLoaded', () => {
    // Only run if we are on the main page (index.html)
    // We check if either profile-name or projects-container exists to populate
    const nameEl = document.getElementById('profile-name');
    const titleEl = document.getElementById('profile-title');
    const bioEl = document.getElementById('profile-bio');
    const aboutEl = document.getElementById('profile-about-extended');
    const projectsContainer = document.getElementById('projects-container');
    const socialsContainer = document.getElementById('social-links-container');
    const yearEl = document.getElementById('year');

    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    const { profile, projects } = getData();

    // Populate Profile fields if they exist on the page
    if (nameEl) nameEl.textContent = profile.name;
    if (titleEl) titleEl.textContent = profile.title;
    if (bioEl) bioEl.textContent = profile.bio;
    if (aboutEl) aboutEl.textContent = profile.about;

    // Populate Socials
    if (socialsContainer) {
        socialsContainer.innerHTML = '';
        if (profile.socials && profile.socials.length > 0) {
            profile.socials.forEach(social => {
                const a = document.createElement('a');
                a.href = social.url;
                a.target = "_blank";
                a.textContent = social.name;
                socialsContainer.appendChild(a);
            });
        }
    }

    // Render Projects
    if (projectsContainer) {
        projectsContainer.innerHTML = '';

        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            
            card.innerHTML = `
                <div class="project-img-container">
                    <img src="${project.image || 'https://via.placeholder.com/600x400?text=No+Image'}" alt="${project.title}" class="project-img" loading="lazy">
                </div>
                <div class="project-info">
                    <span class="project-category">${project.category}</span>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-links">
                        ${project.link && project.link !== '#' ? `<a href="${project.link}" target="_blank" class="project-link">View Project ↗</a>` : ''}
                        ${project.repo && project.repo !== '#' ? `<a href="${project.repo}" target="_blank" class="project-link">Source Code ↗</a>` : ''}
                    </div>
                </div>
            `;
            projectsContainer.appendChild(card);
        });
    }
});
