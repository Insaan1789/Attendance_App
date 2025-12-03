import { api } from '../api.js';

export const initLogin = () => {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorMsg = document.getElementById('errorMsg');
        const btn = form.querySelector('button');

        try {
            btn.textContent = 'Logging in...';
            btn.disabled = true;
            await api.login(email, password);
            window.location.hash = 'dashboard';
        } catch (error) {
            errorMsg.textContent = error;
            errorMsg.style.display = 'block';
            btn.textContent = 'Login';
            btn.disabled = false;
        }
    });
};
