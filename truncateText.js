// helpers/truncateText.js

const handlebars = require('handlebars');

module.exports = handlebars.registerHelper('truncateText', function(text, length) {
    if (text.length > length) {
        return text.substring(0, length) + '...';
    }
    return text;
});

