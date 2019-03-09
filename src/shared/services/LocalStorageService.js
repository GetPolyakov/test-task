
export default {
    getItem(key) {
        const data = localStorage.getItem(key);
        return JSON.parse(data);
    },

    setItem(key, value) {
        const data = JSON.stringify(value)
        localStorage.setItem(key, data)
    }
};
