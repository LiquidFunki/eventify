import moment from 'moment';

export const updateEventUtil = (events, event) => [
  ...events.filter((item) => item._id !== event._id),
  event,
];

export const tagsToSelect = (tags) => tags.map((tag) => ({ value: tag._id, label: tag.name }));

export const eventsToCalendar = (events) => events.map((item) => ({
  ...item,
  start: moment(item.startEvent).toDate(),
  end: moment(item.endEvent).toDate(),
}));

export const getEditEventDate = (data) => ({
  ...data.event,
  startEvent: data.start.toString(),
  start: data.start,
  endEvent: data.end.toString(),
  end: data.end,
  allDay: data.isAllDay || false,
});

export const eventDateUpdate = (events, data) => events.map((item) => {
  if (data.event._id === item._id) {
    return {
      ...item,
      startEvent: data.start.toString(),
      start: data.start,
      endEvent: data.end.toString(),
      end: data.end,
      allDay: data.isAllDay || false,
    };
  }
  return item;
});

export const eventTypes = [
  { value: 'task', label: 'Task' },
  { value: 'reminder', label: 'Reminder' },
  { value: 'arrangement', label: 'Arrangement' },
];
