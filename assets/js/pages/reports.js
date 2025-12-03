import { renderSidebar, initSidebar } from '../components/sidebar.js';
import { api } from '../api.js';

export const initReports = async () => {
    // Render Sidebar
    document.getElementById('sidebar-container').innerHTML = renderSidebar();
    initSidebar();

    const classSelect = document.getElementById('classSelect');
    const generateBtn = document.getElementById('generateBtn');
    const reportContainer = document.getElementById('report-container');
    const reportList = document.getElementById('reportList');

    // Load Classes
    try {
        const classes = await api.getClasses();
        classSelect.innerHTML += classes.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    } catch (error) {
        console.error('Error loading classes:', error);
    }

    // Generate Report
    generateBtn.addEventListener('click', async () => {
        const classId = classSelect.value;
        if (!classId) {
            alert('Please select a class');
            return;
        }

        try {
            const students = await api.getStudents(classId);
            // Mock data for report since we don't have real attendance history in this demo
            const reportData = students.map(student => {
                const total = 20;
                const present = Math.floor(Math.random() * 5) + 15; // Random 15-20
                const od = Math.floor(Math.random() * 2);
                const absent = total - present - od;
                const percentage = ((present + od) / total * 100).toFixed(1);

                return {
                    ...student,
                    total,
                    present,
                    absent,
                    od,
                    percentage
                };
            });

            renderReport(reportData);
            reportContainer.style.display = 'block';
        } catch (error) {
            console.error('Error generating report:', error);
        }
    });

    const renderReport = (data) => {
        reportList.innerHTML = data.map(row => `
            <tr>
                <td>${row.roll}</td>
                <td>${row.name}</td>
                <td>${row.total}</td>
                <td>${row.present}</td>
                <td>${row.absent}</td>
                <td>${row.od}</td>
                <td>
                    <span class="badge ${row.percentage >= 75 ? 'badge-success' : 'badge-danger'}">
                        ${row.percentage}%
                    </span>
                </td>
            </tr>
        `).join('');
    };

    // Export CSV
    document.getElementById('exportCsvBtn').addEventListener('click', () => {
        const rows = Array.from(document.querySelectorAll('table tr'));
        const csvContent = rows.map(row => {
            const cols = Array.from(row.querySelectorAll('th, td'));
            return cols.map(col => col.innerText).join(',');
        }).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'attendance_report.csv';
        link.click();
    });

    // Export PDF (Simple Print)
    document.getElementById('exportPdfBtn').addEventListener('click', () => {
        window.print();
    });
};
