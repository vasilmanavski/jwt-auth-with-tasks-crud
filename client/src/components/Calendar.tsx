import React, { Fragment, useCallback, useState } from 'react';
import { Calendar as ReactBigCalendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { Task } from 'src/types/types';
import { deleteTask, updateTask } from '../service/task';
import TaskComponent from '../components/task/TaskComponent';

const formats = {
  timeGutterFormat: 'HH:mm',
};

interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task>>;
}

const Calendar: React.FC = ({ tasks, setTasks }: Props) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState(Views.DAY);

  const DragAndDropCalendar = withDragAndDrop(ReactBigCalendar);
  const localizer = momentLocalizer(moment);

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event;

      setCurrentDate(event.start);

      // Update the `allDay` property based on whether the event was dropped on an all-day slot
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }
      if (allDay && !droppedOnAllDaySlot) {
        event.allDay = false;
      }

      setTasks((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        const updatedTask = { ...existing, start, end, allDay: event.allDay };

        updateTask(existing.id, updatedTask)
          .then(() => {
          })
          .catch((error) => {
            console.error('Failed to update task:', error);
          });

        return [...filtered, updatedTask];
      });
    },
    [setTasks],
  );

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setCurrentDate(event.start);

      setTasks((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        const updatedTask = { ...existing, start, end };

        updateTask(existing.id, updatedTask)
          .then(() => {
          })
          .catch((error) => {
            console.error('Failed to update task:', error);
          });

        return [...filtered, updatedTask];
      });
    },
    [setTasks],
  );

  const handleDelete = useCallback(
    (id: number) => {
      deleteTask(id)
        .then(() => {
          setTasks((prev) => prev.filter((task) => task.id !== id));
        })
        .catch((error) => {
          console.error('Failed to delete task:', error);
        });
    },
    [setTasks],
  );

  const handleEditTask = (id: number, updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)),
    );
    updateTask(id, updatedTask)
      .then(() => {
      })
      .catch((error) => {
        console.error('Failed to update task:', error);
      });
  };

  return (
    <Fragment>
      <DragAndDropCalendar
        defaultDate={currentDate}
        view={currentView}
        views={[Views.DAY, Views.WEEK]}
        onView={(view) => setCurrentView(view)}
        events={tasks}
        startAccessor={(event) => new Date(event.start)}
        endAccessor={(event) => new Date(event.end)}
        localizer={localizer}
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        formats={formats}
        resizable
        components={{
          event: (props) => <TaskComponent {...props} onDelete={handleDelete} onEdit={handleEditTask} />,
        }}
      />
    </Fragment>
  );
};

export default Calendar;