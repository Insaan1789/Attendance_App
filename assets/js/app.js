import { storage } from './utils.js';

const routes = {
    'login': { path: '/pages/login.html', auth: false },
    'dashboard': { path: '/pages/dashboard.html', auth: true },
    'create-session': { path: '/pages/create-session.html', auth: true },
    'attendance': { path: '/pages/attendance.html', auth: true },
    'reports': { path: '/pages/reports.html', auth: true },
    'leave-requests': { path: '/pages/leave-requests.html', auth: true }
};

const app = document.getElementById('app');

const navigate = async () => {
    const hash = window.location.hash.slice(1) || 'login';
    const route = routes[hash] || routes['login'];

    const token = storage.get('token');
    if (route.auth && !token) {
        window.location.hash = 'login';
        return;
    }
    if (!route.auth && token) {
        window.location.hash = 'dashboard';
        return;
    }

    try {
        const response = await fetch(route.path);
        const html = await response.text();
        app.innerHTML = html;

        // Initialize page specific scripts
        if (hash === 'login') initLogin();
        if (hash === 'dashboard') initDashboard();
        if (hash === 'create-session') initCreateSession();
        if (hash === 'attendance') initAttendance();
        if (hash === 'reports') initReports();
        if (hash === 'leave-requests') initLeaveRequests();

    } catch (error) {
        console.error('Error loading page:', error);
        app.innerHTML = '<h1>404 - Page Not Found</h1>';
    }
};

window.addEventListener('hashchange', navigate);
window.addEventListener('load', navigate);

// Page Initializers (Dynamic Imports would be better but keeping it simple)
import { initLogin } from './pages/login.js';
import { initDashboard } from './pages/dashboard.js';
import { initCreateSession } from './pages/create-session.js';
import { initAttendance } from './pages/attendance.js';
import { initReports } from './pages/reports.js';
import { initLeaveRequests } from './pages/leave-requests.js';
