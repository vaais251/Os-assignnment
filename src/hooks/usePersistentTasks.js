import { useEffect, useState } from 'react';
export const TASK_KEY = 'taskflow.tasks.v1';
export const seedTasks = [
  {id:'demo-1', title:'Design the dashboard layout', description:'Map the key screens and build a clear component hierarchy.', priority:'High', status:'In progress', dueDate:'', category:'Design'},
  {id:'demo-2', title:'Build reusable React components', description:'Create TaskCard, TaskList and a flexible CardWrapper.', priority:'High', status:'To do', dueDate:'', category:'Development'},
  {id:'demo-3', title:'Connect the activity logger', description:'Capture user actions with class component lifecycle methods.', priority:'Medium', status:'To do', dueDate:'', category:'Development'},
  {id:'demo-4', title:'Set up the project structure', description:'Organize components, context and custom hooks.', priority:'Low', status:'Completed', dueDate:'', category:'Planning'}
];
export function usePersistentTasks() {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(TASK_KEY);
      if (raw === null) return seedTasks;
      const data = JSON.parse(raw);
      if (!Array.isArray(data)) return seedTasks;
      const ids = new Set();
      return data.filter(t => t && typeof t.id === 'string' && !ids.has(t.id) && ids.add(t.id) && typeof t.title === 'string' && typeof t.description === 'string' && ['High','Medium','Low'].includes(t.priority) && ['To do','In progress','Completed'].includes(t.status) && typeof t.dueDate === 'string' && typeof t.category === 'string');
    } catch { return seedTasks; }
  });
  const [storageError, setStorageError] = useState('');
  useEffect(() => {
    try { localStorage.setItem(TASK_KEY, JSON.stringify(tasks)); setStorageError(''); }
    catch { setStorageError('Browser storage is unavailable. Changes will last only for this session.'); }
  }, [tasks]);
  return [tasks, setTasks, storageError];
}
