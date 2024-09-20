import React from 'react';
import { dataGanttFee } from './data';
import GanttView from './Gantt';

export default function GanttChart() {
  const handleTaskClick = (id: any, task: any) => {
    console.log(task);
    alert('Open Edit');
  };

  const onAfterTaskUpdate = (task: any) => {
    console.log('update', task);
  };

  return (
    <>
      <GanttView tasks={dataGanttFee} onTaskDblClick={handleTaskClick} onAfterTaskUpdate={onAfterTaskUpdate} />
    </>
  );
}
