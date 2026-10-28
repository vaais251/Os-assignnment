import React, {useState,useEffect,useMemo,useCallback} from 'react';
import {ArrowDownRight, Sparkles} from 'lucide-react';
import Header from './components/functional/Header';
import MetricsSummary from './components/functional/MetricsSummary';
import TaskForm from './components/functional/TaskForm';
import TaskList from './components/functional/TaskList';
import ActivityLogger from './components/class/ActivityLogger';
import {usePersistentTasks} from './hooks/usePersistentTasks';
export default function App() {
 const [tasks,setTasks,storageError] = usePersistentTasks();
 const [status,setStatus] = useState('All tasks'), [priority,setPriority] = useState('All priorities'), [query,setQuery] = useState(''), [event,setEvent] = useState(null);
 const log = useCallback(message=>setEvent({id:crypto.randomUUID(),message,time:new Date().toISOString()}),[]);
 const pending = tasks.filter(t=>t.status!=='Completed').length;
 useEffect(()=>{document.title=`${pending} pending · Taskflow`;},[pending]);
 const addTask = useCallback(data=>{setTasks(t=>[{...data,id:crypto.randomUUID(),status:'To do'},...t]);log(`Added task: ${data.title}`);},[setTasks,log]);
 const deleteTask = useCallback(id=>{setTasks(t=>t.filter(task=>task.id!==id));log('Deleted a task');},[setTasks,log]);
 const changeStatus = useCallback((id,next)=>{setTasks(t=>t.map(task=>task.id===id ? {...task,status:next} : task));log(`Task moved to ${next.toLowerCase()}`);},[setTasks,log]);
 const filterStatus = useCallback(value=>{setStatus(value);log(`Status filter: ${value}`);},[log]);
 const filterPriority = useCallback(value=>{setPriority(value);log(`Priority filter: ${value}`);},[log]);
 const filteredTasks = useMemo(()=>tasks.filter(t=>(status==='All tasks'||t.status===status)&&(priority==='All priorities'||t.priority===priority)&&`${t.title} ${t.description}`.toLowerCase().includes(query.toLowerCase())),[tasks,status,priority,query]);
 const progress = tasks.length ? Math.round((tasks.length-pending)/tasks.length*100) : 0;
 return <><Header/><main><div className="intro"><div><div className="eyebrow">YOUR PERSONAL COMMAND CENTER</div><h1>A little focus. A lot of progress<span>.</span></h1><p>Organize your work, find your flow, and make today count.</p></div><a className="new-task-link" href="#new-task">Create a task <ArrowDownRight size={17}/></a></div>{storageError && <p className="error" role="alert">{storageError}</p>}<MetricsSummary tasks={tasks}/><div className="workspace"><div className="main-column"><TaskList tasks={filteredTasks} total={tasks.length} status={status} priority={priority} query={query} onStatusFilter={filterStatus} onPriorityFilter={filterPriority} onQuery={setQuery} onStatusChange={changeStatus} onDelete={deleteTask}/><section className="progress-panel"><div className="progress-icon"><Sparkles size={21}/></div><div className="progress-copy"><h2>Every step adds up</h2><p>{tasks.length-pending} of {tasks.length} tasks completed. Keep your momentum going.</p></div><div className="progress-value"><strong>{progress}%</strong><div className="progress-track" role="progressbar" aria-label="Task completion" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}><span style={{width:`${progress}%`}}/></div></div></section></div><aside><TaskForm onAdd={addTask}/><ActivityLogger event={event}/></aside></div><footer><span><strong>taskflow</strong> &nbsp; A little more organized.</span><span>Web Engineering · Assignment 01 · Section B</span></footer></main></>;
}
