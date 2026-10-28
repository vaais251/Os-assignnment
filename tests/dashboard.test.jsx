import React from 'react';
import {describe,it,expect,vi} from 'vitest';
import {render,screen,fireEvent,waitFor,act} from '@testing-library/react';
import App from '../src/App';
import {ThemeProvider} from '../src/context/ThemeContext';
import ActivityLogger, {LOG_KEY} from '../src/components/class/ActivityLogger';
import {TASK_KEY} from '../src/hooks/usePersistentTasks';
const mount=()=>render(<ThemeProvider><App/></ThemeProvider>);
describe('Task dashboard',()=>{
 it('adds, persists, completes, reopens and deletes a task',async()=>{
  mount(); const input=screen.getByLabelText(/Task title/);
  expect(input).toHaveFocus();
  fireEvent.change(input,{target:{value:'Test delivery'}});
  fireEvent.click(screen.getByRole('button',{name:'Add task'}));
  expect(screen.getByRole('heading',{name:'Test delivery'})).toBeInTheDocument();
  expect(input).toHaveFocus();
  expect(JSON.parse(localStorage.getItem(TASK_KEY))).toHaveLength(5);
  expect(document.title).toBe('4 pending · Taskflow');
  fireEvent.click(screen.getByRole('button',{name:'Complete Test delivery'}));
  expect(screen.getByLabelText('Status of Test delivery')).toHaveValue('Completed');
  expect(document.title).toBe('3 pending · Taskflow');
  fireEvent.click(screen.getByRole('button',{name:'Reopen Test delivery'}));
  expect(screen.getByLabelText('Status of Test delivery')).toHaveValue('To do');
  fireEvent.click(screen.getByRole('button',{name:'Delete Test delivery'}));
  expect(screen.queryByRole('heading',{name:'Test delivery'})).not.toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem(LOG_KEY))[0].message).toBe('Deleted a task');
 });
 it('combines status, priority and search filters with an empty result',()=>{
  mount();fireEvent.click(screen.getByRole('button',{name:'To do',exact:true}));
  fireEvent.change(screen.getByLabelText('Filter by priority'),{target:{value:'High'}});
  expect(screen.getByRole('heading',{name:'Build reusable React components'})).toBeInTheDocument();
  expect(screen.queryByRole('heading',{name:'Design the dashboard layout'})).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Search tasks'),{target:{value:'no-match'}});
  expect(screen.getByRole('heading',{name:'No matching tasks'})).toBeInTheDocument();
 });
 it('rejects whitespace titles and retains empty saved task collections',()=>{
  localStorage.setItem(TASK_KEY,'[]');mount();
  expect(screen.getByRole('heading',{name:'A fresh start'})).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText(/Task title/),{target:{value:'   '}});
  fireEvent.click(screen.getByRole('button',{name:'Add task'}));
  expect(screen.getByRole('alert')).toHaveTextContent('Please enter a task title.');
  expect(JSON.parse(localStorage.getItem(TASK_KEY))).toHaveLength(0);
 });
 it('persists theme and restores saved tasks on remount',()=>{
  const first=mount();fireEvent.click(screen.getByRole('button',{name:'Switch to dark mode'}));
  expect(document.documentElement.dataset.theme).toBe('dark');
  fireEvent.change(screen.getByLabelText(/Task title/),{target:{value:'Remember me'}});
  fireEvent.click(screen.getByRole('button',{name:'Add task'}));first.unmount();mount();
  expect(screen.getByRole('heading',{name:'Remember me'})).toBeInTheDocument();
  expect(screen.getByRole('button',{name:'Switch to light mode'})).toBeInTheDocument();
 });
 it('recovers corrupted storage without crashing',()=>{
  localStorage.setItem(TASK_KEY,'invalid JSON');localStorage.setItem(LOG_KEY,'invalid JSON');mount();
  expect(screen.getByRole('heading',{name:'Your tasks 4'})).toBeInTheDocument();
 });
 it('keeps task interactions working if storage is unavailable',()=>{
  const spy=vi.spyOn(Storage.prototype,'setItem').mockImplementation(()=>{throw new Error('Storage full');});
  try{mount();expect(screen.getByRole('alert')).toHaveTextContent('Browser storage is unavailable');
  fireEvent.change(screen.getByLabelText(/Task title/),{target:{value:'Session task'}});
  fireEvent.click(screen.getByRole('button',{name:'Add task'}));
  expect(screen.getByRole('heading',{name:'Session task'})).toBeInTheDocument();}finally{spy.mockRestore();}
 });
 it('restores activity, persists events, dismisses notifications and clears timers on unmount',()=>{
  vi.useFakeTimers();
  try{
   localStorage.setItem(LOG_KEY,JSON.stringify([{id:'old',message:'Earlier activity',time:'2026-10-28T10:00:00Z'}]));
   const view=render(<ActivityLogger event={null}/>);
   expect(screen.getByText('Earlier activity')).toBeInTheDocument();
   const event={id:'new',message:'New event',time:'2026-10-28T11:00:00Z'};
   view.rerender(<ActivityLogger event={event}/>);
   expect(screen.getByRole('status')).toHaveTextContent('New event');
   expect(JSON.parse(localStorage.getItem(LOG_KEY))).toHaveLength(2);
   act(()=>vi.advanceTimersByTime(2800));
   expect(screen.queryByRole('status')).not.toBeInTheDocument();
   view.rerender(<ActivityLogger event={{...event,id:'last'}}/>);
   const timersBeforeUnmount = vi.getTimerCount();
   view.unmount();expect(vi.getTimerCount()).toBeLessThan(timersBeforeUnmount);
  }finally{vi.useRealTimers();}
 });
});
