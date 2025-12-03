import { renderSidebar, initSidebar } from '../components/sidebar.js';
import { storage } from '../utils.js';
import { api } from '../api.js';

export const initDashboard = async () => {
    // Render Sidebar
    document.getElementById('sidebar-container').innerHTML = renderSidebar();
    initSidebar();

    // Set User Info
    const user = storage.get('user');
    if (user) {
        document.getElementById('user-info').textContent = `Welcome, ${user.name}`;
    }

    // Load Stats
    const sessions = await api.getSessions();
    const today = new Date().toISOString().split('T')[0];
    const todaySessions = sessions.filter(s => s.date === today);
    document.getElementById('today-sessions-count').textContent = todaySessions.length;
};
