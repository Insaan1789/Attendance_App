export const storage = {
    get: (key) => JSON.parse(localStorage.getItem(key)),
    set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    remove: (key) => localStorage.removeItem(key)
};

export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
};

export const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
};
