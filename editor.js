document.addEventListener('DOMContentLoaded', () => {
    // Only run on the editor page
    if (!document.getElementById('profile-form')) return;

    let { profile, projects } = getData();
    let editingProjectId = null;

    const profileForm = document.getElementById('profile-form');
    const projectsList = document.getElementById('projects-list');
    
    // Modal Elements
    const modal = document.getElementById('project-modal');
    const projectForm = document.getElementById('project-form');
    const addProjectBtn = document.getElementById('btn-add-project');
    const closeBtn = document.querySelector('.close-btn');
    const modalTitle = document.getElementById('modal-title');

    // Init Editor UI
    function initEditor() {
        // Populate profile form
        document.getElementById('edit-name').value = profile.name;
        document.getElementById('edit-title').value = profile.title;
        document.getElementById('edit-bio').value = profile.bio;
        document.getElementById('edit-about').value = profile.about;

        renderAdminProjects();
    }

    // Render Projects in Admin
    function renderAdminProjects() {
        projectsList.innerHTML = '';
        projects.forEach(project => {
            const el = document.createElement('div');
            el.className = 'editor-project-card';
            el.innerHTML = `
                <div class="editor-project-info">
                    <h3>${project.title}</h3>
                    <span>${project.category}</span>
                </div>
                <div class="editor-project-actions">
                    <button class="btn btn-outline btn-edit-proj" data-id="${project.id}">Edit</button>
                    <button class="btn btn-danger btn-del-proj" data-id="${project.id}">Delete</button>
                </div>
            `;
            projectsList.appendChild(el);
        });
    }

    // Save Profile
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        profile.name = document.getElementById('edit-name').value;
        profile.title = document.getElementById('edit-title').value;
        profile.bio = document.getElementById('edit-bio').value;
        profile.about = document.getElementById('edit-about').value;

        localStorage.setItem('portfolio_profile', JSON.stringify(profile));
        alert('Profile saved!');
    });

    // Project Form Submit
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newProject = {
            id: editingProjectId || Date.now().toString(),
            title: document.getElementById('proj-title').value,
            category: document.getElementById('proj-category').value,
            description: document.getElementById('proj-desc').value,
            image: document.getElementById('proj-image').value,
            link: document.getElementById('proj-link').value,
            repo: document.getElementById('proj-repo').value
        };

        if (editingProjectId) {
            const index = projects.findIndex(p => p.id === editingProjectId);
            projects[index] = newProject;
        } else {
            projects.push(newProject);
        }

        saveProjects();
        closeModal();
        renderAdminProjects();
    });

    // Delete and Edit Project (Event Delegation)
    projectsList.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        if (!id) return;

        if (e.target.classList.contains('btn-del-proj')) {
            if(confirm('Are you sure you want to delete this project?')) {
                projects = projects.filter(p => p.id !== id);
                saveProjects();
                renderAdminProjects();
            }
        } else if (e.target.classList.contains('btn-edit-proj')) {
            const project = projects.find(p => p.id === id);
            openModal(project);
        }
    });

    // Save Projects Helper
    function saveProjects() {
        localStorage.setItem('portfolio_projects', JSON.stringify(projects));
    }

    // Modal Logic
    function openModal(project = null) {
        editingProjectId = project ? project.id : null;
        modalTitle.textContent = project ? 'Edit Project' : 'Add Project';
        
        document.getElementById('proj-id').value = project ? project.id : '';
        document.getElementById('proj-title').value = project ? project.title : '';
        document.getElementById('proj-category').value = project ? project.category : '';
        document.getElementById('proj-desc').value = project ? project.description : '';
        document.getElementById('proj-image').value = project ? project.image : '';
        document.getElementById('proj-link').value = project ? project.link : '';
        document.getElementById('proj-repo').value = project ? project.repo : '';
        
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
        projectForm.reset();
        editingProjectId = null;
    }

    addProjectBtn.addEventListener('click', () => openModal());
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target == modal) closeModal();
    });

    // Reset and Export Actions
    document.getElementById('btn-reset').addEventListener('click', () => {
        if(confirm('Reset all changes back to default? This cannot be undone.')) {
            localStorage.removeItem('portfolio_profile');
            localStorage.removeItem('portfolio_projects');
            location.reload();
        }
    });

    document.getElementById('btn-export').addEventListener('click', () => {
        const data = { profile, projects };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'portfolio_backup.json';
        a.click();
        URL.revokeObjectURL(url);
    });

    // Run init
    initEditor();
});
