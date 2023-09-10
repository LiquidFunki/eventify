import moment from 'moment';
import 'moment/locale/uk';
import 'moment/locale/en-gb';

export const formatDate = (dateString) => {
  const date = moment(dateString);
  const formattedDate = date
    .locale(localStorage.getItem('language') === 'uk' ? 'uk' : 'en')
    .format('D MMM YYYY, HH:mm');
  return formattedDate;
};
