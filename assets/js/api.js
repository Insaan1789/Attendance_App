import { storage, generateId } from './utils.js';

const USERS = [
    { id: 1, email: 'teacher@school.com', password: 'password123', name: 'John Doe', role: 'teacher' }
];

const CLASSES = [
    { id: 1, name: 'Class 10A', subject: 'Mathematics' },
    { id: 2, name: 'Class 10B', subject: 'Physics' }
];

const STUDENTS = [
    { id: 101, name: 'Alice Smith', roll: '10A01', classId: 1 },
    { id: 102, name: 'Bob Jones', roll: '10A02', classId: 1 },
    { id: 103, name: 'Charlie Brown', roll: '10A03', classId: 1 }
];

export const api = {
    login: async (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = USERS.find(u => u.email === email && u.password === password);
                if (user) {
                    const token = generateId();
                    storage.set('token', token);
                    storage.set('user', user);
                    resolve({ token, user });
                } else {
                    reject('Invalid credentials');
                }
            }, 500);
        });
    },

    logout: () => {
        storage.remove('token');
        storage.remove('user');
    },

    getClasses: async () => {
        return Promise.resolve(CLASSES);
    },

    getStudents: async (classId) => {
        return Promise.resolve(STUDENTS.filter(s => s.classId == classId));
    },

    createSession: async (sessionData) => {
        const sessions = storage.get('sessions') || [];
        const newSession = { ...sessionData, id: generateId(), status: 'Active' };
        sessions.push(newSession);
        storage.set('sessions', sessions);
        return Promise.resolve(newSession);
    },

    getSessions: async () => {
        return Promise.resolve(storage.get('sessions') || []);
    }
};
