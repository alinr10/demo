import moment from 'moment';

const generateDate = (date, format) => {
    return moment(date).format(format);
};

export { generateDate };
