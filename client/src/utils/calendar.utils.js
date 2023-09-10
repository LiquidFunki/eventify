export const getHiddenCalendars = (calendars) => calendars.filter((item) => item.isHidden);
export const getActiveCalendars = (calendars) => calendars.filter((item) => !item.isHidden);

export const updateCalendarsUtil = (calendars, calendar) => [
  ...calendars.filter((item) => item._id !== calendar._id),
  calendar,
];
