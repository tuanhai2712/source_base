import React from 'react';
import dayjs from 'dayjs';
import { gantt } from 'dhtmlx-gantt';
import { useEffect, useRef } from 'react';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './gantt.scss';

export default function GanttView(props: any) {
  const ganttContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ganttContainer.current) {
      gantt.config.date_format = '%d-%m-%Y %H:%i';
      gantt.config.order_branch = 'marker'; // Drag drop row table
      gantt.config.row_height = 23; // Setup chiều cao row

      // Custom lightbox task
      gantt.attachEvent('onBeforeLightbox', function (id) {
        const task = gantt.getTask(id);
        props.onTaskDblClick(id, task);
        return false; // Ngăn lightbox mặc định
      });

      // Add Class css task
      gantt.templates.task_class = function (start, end, task) {
        const dateToCompare = dayjs().add(1, 'day');
        if (dateToCompare.isAfter(dayjs(end)) && task.progress != 1) {
          return 'color-task-custom';
        } else {
          return '';
        }
      };

      gantt.attachEvent('onAfterTaskUpdate', function (id, task) {
        props.onAfterTaskUpdate(task);
      });

      gantt.init(ganttContainer.current);
      gantt.parse(props.tasks);

      gantt.config.views = [
        { name: 'day', label: 'Day', item: 'day' },
        { name: 'week', label: 'Week', item: 'week' },
        { name: 'month', label: 'Month', item: 'month' },
      ];

      gantt.config.scales = [
        { unit: 'day', step: 1, format: '%d %M' },
        { unit: 'week', step: 1, format: 'Week %W' },
        { unit: 'month', step: 1, format: '%F, %Y' },
      ];

      gantt.config.scale_unit = 'day'; // Default view
      gantt.config.date_scale = '%d %M'; // Display format
      gantt.config.subscales = [{ unit: 'week', step: 1, date: '%W' }];

      const toolbar = document.createElement('div');
      toolbar.innerHTML = `
        <button id="day" class="button-toolbar">Day</button>
        <button id="week" class="button-toolbar">Week</button>
        <button id="month" class="button-toolbar">Month</button>
      `;
      ganttContainer.current.prepend(toolbar);

      document.getElementById('day')?.addEventListener('click', () => {
        gantt.config.scale_unit = 'day';
        gantt.config.subscales = [{ unit: 'day', step: 1, format: '%d %M' }];
        gantt.render();
      });

      document.getElementById('week')?.addEventListener('click', () => {
        gantt.config.scale_unit = 'week';
        gantt.config.subscales = [{ unit: 'day', step: 1, format: '%d %M' }];
        gantt.render();
      });

      document.getElementById('month')?.addEventListener('click', () => {
        gantt.config.scale_unit = 'month';
        gantt.config.subscales = [{ unit: 'week', step: 1, format: 'Week %W' }];
        gantt.render();
      });
    }

    return () => {
      // gantt.destructor();
      if (ganttContainer.current) {
        ganttContainer.current.innerHTML = '';
      }
    };
  }, []);

  return <div ref={ganttContainer} style={{ width: '100%', height: '500px' }}></div>;
}
