import React, { Fragment, useCallback } from 'react';
import { Calendar as ReactBigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { Task } from 'src/types/types';

interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task>>;
}

const Calendar: React.FC = ({ tasks, setTasks }: Props) => {
  const DragAndDropCalendar = withDragAndDrop(ReactBigCalendar);
  const localizer = momentLocalizer(moment);

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }
      if (allDay && !droppedOnAllDaySlot) {
        event.allDay = false;
      }

      setTasks((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);

        // TODO save the new task to the database instead of just setting the state
        return [...filtered, { ...existing, start, end, allDay: event.allDay }];
      });
    },
    [setTasks],
  );

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setTasks((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);

        // TODO save the new task to the database instead of just setting the state
        return [...filtered, { ...existing, start, end }];
      });
    },
    [setTasks],
  );

  console.log(tasks);

  return (
    <Fragment>
      <div className='height600'>
        <DragAndDropCalendar
          localizer={localizer}
          events={tasks}
          startAccessor={(event) => {
            return new Date(event.start);
          }}
          endAccessor={(event) => {
            return new Date(event.end);
          }}
          style={{ height: 500 }}
          defaultView='day'
          views={['day']}
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          draggableAccessor={() => true}
        />
      </div>
    </Fragment>
  );
};

export default Calendar;