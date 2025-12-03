import { renderSidebar, initSidebar } from '../components/sidebar.js';
import { api } from '../api.js';

export const initAttendance = async () => {
    // Render Sidebar
    document.getElementById('sidebar-container').innerHTML = renderSidebar();
    initSidebar();

    const sessionSelect = document.getElementById('sessionSelect');
    const attendanceContainer = document.getElementById('attendance-container');
    const studentList = document.getElementById('studentList');
    const sessionInfo = document.getElementById('session-info');

    // Load Sessions
    try {
        const sessions = await api.getSessions();
        sessionSelect.innerHTML = '<option value="">Select a session</option>' +
            sessions.map(s => `<option value="${s.id}">${s.className} (${s.startTime} - ${s.endTime})</option>`).join('');
    } catch (error) {
        console.error('Error loading sessions:', error);
    }

    // Handle Session Selection
    sessionSelect.addEventListener('change', async () => {
        const sessionId = sessionSelect.value;
        if (!sessionId) {
            attendanceContainer.style.display = 'none';
            sessionInfo.textContent = 'Select a session';
            sessionInfo.className = 'badge badge-warning';
            return;
        }

        const sessions = await api.getSessions();
        const session = sessions.find(s => s.id === sessionId);
        sessionInfo.textContent = `${session.className} - Active`;
        sessionInfo.className = 'badge badge-success';
        attendanceContainer.style.display = 'block';

        loadStudents(session.classId);
    });

    const loadStudents = async (classId) => {
        try {
            const students = await api.getStudents(classId);
            studentList.innerHTML = students.map(student => `
                <tr data-id="${student.id}">
                    <td>${student.roll}</td>
                    <td>${student.name}</td>
                    <td><span class="badge badge-success status-badge">Present</span></td>
                    <td>
                        <button class="btn btn-secondary btn-sm toggle-btn">Toggle Status</button>
                    </td>
                </tr>
            `).join('');

            // Add Event Listeners for Toggle
            document.querySelectorAll('.toggle-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const row = e.target.closest('tr');
                    const badge = row.querySelector('.status-badge');
                    if (badge.textContent === 'Present') {
                        badge.textContent = 'Absent';
                        badge.className = 'badge badge-danger status-badge';
                    } else if (badge.textContent === 'Absent') {
                        badge.textContent = 'OD';
                        badge.className = 'badge badge-warning status-badge';
                    } else {
                        badge.textContent = 'Present';
                        badge.className = 'badge badge-success status-badge';
                    }
                });
            });

        } catch (error) {
            console.error('Error loading students:', error);
        }
    };
};
