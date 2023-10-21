import handlebars from 'handlebars';

export default handlebars.registerHelper('truncateText', function(text, length) {
    if (text.length > length) {
        return text.substring(0, length) + '...';
    }
    return text;
});
