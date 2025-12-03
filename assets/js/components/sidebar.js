import { api } from '../api.js';

export const renderSidebar = () => {
    return `
        <aside class="sidebar" id="sidebar">
            <div style="padding: 2rem; border-bottom: 1px solid var(--gray-200);">
                <h2 style="margin: 0; color: var(--primary-color);">AttendanceApp</h2>
            </div>
            <nav style="flex: 1; padding: 1rem;">
                <a href="#dashboard" class="nav-link ${window.location.hash === '#dashboard' ? 'active' : ''}">
                    Dashboard
                </a>
                <a href="#create-session" class="nav-link ${window.location.hash === '#create-session' ? 'active' : ''}">
                    Create Session
                </a>
                <a href="#attendance" class="nav-link ${window.location.hash === '#attendance' ? 'active' : ''}">
                    Live Attendance
                </a>
                <a href="#reports" class="nav-link ${window.location.hash === '#reports' ? 'active' : ''}">
                    Reports
                </a>
                <a href="#leave-requests" class="nav-link ${window.location.hash === '#leave-requests' ? 'active' : ''}">
                    Leave Requests
                </a>
            </nav>
            <div style="padding: 1rem; border-top: 1px solid var(--gray-200);">
                <button id="logoutBtn" class="btn btn-secondary" style="width: 100%;">Logout</button>
            </div>
        </aside>
        <style>
            .nav-link {
                display: block;
                padding: 0.75rem 1rem;
                margin-bottom: 0.5rem;
                border-radius: var(--radius);
                color: var(--gray-800);
                font-weight: 500;
            }
            .nav-link:hover {
                background-color: var(--gray-100);
            }
            .nav-link.active {
                background-color: var(--primary-color);
                color: var(--white);
            }
        </style>
    `;
};

export const initSidebar = () => {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            api.logout();
            window.location.hash = 'login';
        });
    }
};
