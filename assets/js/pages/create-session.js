import { renderSidebar, initSidebar } from '../components/sidebar.js';
import { api } from '../api.js';

export const initCreateSession = async () => {
    // Render Sidebar
    document.getElementById('sidebar-container').innerHTML = renderSidebar();
    initSidebar();

    // Set default date to today
    document.getElementById('date').valueAsDate = new Date();

    // Load Classes
    const classSelect = document.getElementById('classSelect');
    try {
        const classes = await api.getClasses();
        classSelect.innerHTML = '<option value="">Select a class</option>' +
            classes.map(c => `<option value="${c.id}">${c.name} - ${c.subject}</option>`).join('');
    } catch (error) {
        console.error('Error loading classes:', error);
        classSelect.innerHTML = '<option value="">Error loading classes</option>';
    }

    // Handle Form Submit
    const form = document.getElementById('createSessionForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');

        const sessionData = {
            classId: classSelect.value,
            className: classSelect.options[classSelect.selectedIndex].text,
            date: document.getElementById('date').value,
            startTime: document.getElementById('startTime').value,
            endTime: document.getElementById('endTime').value
        };

        try {
            btn.textContent = 'Creating...';
            btn.disabled = true;
            await api.createSession(sessionData);
            alert('Session created successfully!');
            window.location.hash = 'dashboard';
        } catch (error) {
            console.error('Error creating session:', error);
            alert('Failed to create session');
            btn.textContent = 'Create Session';
            btn.disabled = false;
        }
    });
};
