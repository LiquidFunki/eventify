import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import invert from 'invert-color';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../../hooks/message.hook';
import {
  eventDateUpdate,
  eventsToCalendar,
  getEditEventDate,
} from '../../utils/event.utils';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { updateEvent } from '../../store/eventSlice';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export const BigCalendar = ({ events }) => {
  const message = useMessage();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { views } = useMemo(() => ({
    views: { month: true, day: true, week: true },
  }));

  const [displayEvents, setDisplayEvents] = useState([]);

  useEffect(() => {
    setDisplayEvents(eventsToCalendar(events));
  }, [events]);

  const eventPropGetter = useCallback((event) => ({
    ...(event.color && {
      style: { backgroundColor: event.color, color: invert(event.color, true) },
    }),
  }));

  const onEventDrop = (data) => {
    if (data.event.type === 'holiday') {
      return message('You can\'t interact with holiday', 'warning');
    }
    dispatch(updateEvent(getEditEventDate(data)));
    setDisplayEvents(eventDateUpdate(displayEvents, data));
  };

  return (
    <DnDCalendar
      eventPropGetter={eventPropGetter}
      views={views}
      defaultDate={moment().toDate()}
      defaultView='month'
      events={displayEvents}
      localizer={localizer}
      onEventDrop={onEventDrop}
      onSelectEvent={(slotInfo) => {
        navigate(`/event/${slotInfo._id}`);
      }}
      resizable
      selectable
      className='w-full h-full animate-appear'
    />
  );
};
