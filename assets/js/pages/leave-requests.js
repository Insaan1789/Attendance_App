import { renderSidebar, initSidebar } from '../components/sidebar.js';
import { api } from '../api.js';

export const initLeaveRequests = async () => {
    // Render Sidebar
    document.getElementById('sidebar-container').innerHTML = renderSidebar();
    initSidebar();

    const requestList = document.getElementById('leaveRequestList');

    // Mock Data
    const requests = [
        { id: 1, student: 'Alice Smith', date: '2025-12-05', reason: 'Medical Appointment', attachment: 'doctor_note.pdf', status: 'Pending' },
        { id: 2, student: 'Bob Jones', date: '2025-12-06', reason: 'Family Function', attachment: null, status: 'Pending' }
    ];

    const renderRequests = () => {
        if (requests.length === 0) {
            requestList.innerHTML = '<tr><td colspan="6" style="text-align: center;">No pending requests</td></tr>';
            return;
        }

        requestList.innerHTML = requests.map(req => `
            <tr id="req-${req.id}">
                <td>${req.student}</td>
                <td>${req.date}</td>
                <td>${req.reason}</td>
                <td>${req.attachment ? `<a href="#" style="color: var(--primary-color);">View</a>` : '-'}</td>
                <td><span class="badge badge-warning">${req.status}</span></td>
                <td>
                    <button class="btn btn-success btn-sm approve-btn" data-id="${req.id}">Approve</button>
                    <button class="btn btn-danger btn-sm reject-btn" data-id="${req.id}">Reject</button>
                </td>
            </tr>
        `).join('');

        // Add Event Listeners
        document.querySelectorAll('.approve-btn').forEach(btn => {
            btn.addEventListener('click', (e) => handleAction(e.target.dataset.id, 'Approved'));
        });
        document.querySelectorAll('.reject-btn').forEach(btn => {
            btn.addEventListener('click', (e) => handleAction(e.target.dataset.id, 'Rejected'));
        });
    };

    const handleAction = (id, status) => {
        const req = requests.find(r => r.id == id);
        if (req) {
            req.status = status;
            const row = document.getElementById(`req-${id}`);
            row.querySelector('.badge').textContent = status;
            row.querySelector('.badge').className = `badge ${status === 'Approved' ? 'badge-success' : 'badge-danger'}`;
            row.querySelector('.approve-btn').remove();
            row.querySelector('.reject-btn').remove();
        }
    };

    renderRequests();
};
