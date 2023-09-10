import { PAGE_LIMIT } from './constants';

export const prepareCategories = (rawCategories) => rawCategories
  .map((category) => ({ ...category, isChecked: false }));

export const TIME_RADIOS = [
  { name: 'Today', value: 'today', isChecked: false },
  { name: 'Tomorrow', value: 'tomorrow', isChecked: false },
  { name: 'This week', value: 'this_week', isChecked: false },
  { name: 'This month', value: 'this_month', isChecked: false },
  { name: 'Past', value: 'past', isChecked: false },
];

export const SORT_RADIOS = [
  { name: 'Popular', value: 'Popular' },
  { name: 'New', value: 'New' },
];
export const DEFAULT_FILTERS = {
  date: null,
  categories: [],
  sort: 'New',
  order: 'desc',
  search: '',
};

const sortByDate = (events, order) => {
  const today = new Date();
  const pastEvents = [];
  const upcomingEvents = [];

  // Розділяємо івенти на 3 категорії: минулі, сьогоднішні та майбутні
  events.forEach((event) => {
    const eventDate = new Date(event.startEvent);

    if (eventDate >= today) {
      upcomingEvents.push(event);
    } else {
      pastEvents.push(event);
    }
  });

  // Сортуємо майбутні івенти від найдальшого до найдближчого
  const sortedUpcomingEvents = order ? upcomingEvents.sort(
    (a, b) => new Date(a.startEvent) - new Date(b.startEvent)
  ) : upcomingEvents.sort(
    (a, b) => new Date(b.startEvent) - new Date(a.startEvent)
  );

  // Повертаємо всі івенти, спочатку минулі, потім сьогоднішні, потім майбутні
  return [...sortedUpcomingEvents, ...pastEvents];
};

export const filterByTime = (events, selectedTimes) => {
  const currentDate = new Date();
  const tomorrowDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
  const nextWeekDate = new Date(
    currentDate.getTime() + 7 * 24 * 60 * 60 * 1000
  );
  const nextMonthDate = new Date(
    currentDate.getTime() + 30 * 24 * 60 * 60 * 1000
  );

  return events.filter((event) => {
    const eventDate = new Date(event.startEvent);
    switch (selectedTimes) {
      case 'today':
        return eventDate.toDateString() === currentDate.toDateString();
      case 'tomorrow':
        return eventDate.toDateString() === tomorrowDate.toDateString();
      case 'this_week':
        return eventDate >= currentDate && eventDate <= nextWeekDate;
      case 'this_month':
        return eventDate >= currentDate && eventDate <= nextMonthDate;
      case 'past':
        return eventDate < currentDate;
      default:
        return true;
    }
  });
};

export const filterEventsUtil = (events, filters) => {
  let resultEvents = [];

  resultEvents = events.filter((value) => value.title
    .toLowerCase().includes(filters.search.toLowerCase()));

  if (filters.categories.filter((val) => val.isChecked).length) {
    resultEvents = resultEvents.filter((event) => event.categories
      .some((category) => filters.categories.some(
        (checkedCategory) => category._id === checkedCategory._id && checkedCategory.isChecked
      )));
  }

  if (filters.date) {
    resultEvents = filterByTime(resultEvents, filters.date);
  }

  if (filters.order === 'asc') {
    resultEvents = filters.sort === 'Popular'
      ? resultEvents.sort((a, b) => a.attendees.length - b.attendees.length)
      : sortByDate(resultEvents, false);
  } else {
    resultEvents = filters.sort === 'Popular'
      ? resultEvents.sort((a, b) => b.attendees.length - a.attendees.length)
      : sortByDate(resultEvents, true);
  }
  return resultEvents;
};

export const countTotalPages = (events) => Math.ceil(events.length / PAGE_LIMIT);

export const getCurrentEvents = (events, page) => {
  if (page > 0) {
    const offset = (page - 1) * PAGE_LIMIT;
    return events.slice(offset, offset + PAGE_LIMIT);
  }
  return [];
};
