module.exports = {
    formatDate: (date) => {
        return new Intl.DateTimeFormat('es-ES', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(date);
    },

    capitalize: (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    randomInt: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
};
