import React, {Component} from 'react';
import {Activity, Clock3} from 'lucide-react';
import CardWrapper from '../functional/CardWrapper';
export const LOG_KEY = 'taskflow.logs.v1';
export default class ActivityLogger extends Component {
 constructor(props) {super(props); this.state = {logs:[], toast:null, storageError:false}; this.timer = null;}
 componentDidMount() {
   try {const data = JSON.parse(localStorage.getItem(LOG_KEY) || '[]'); if(Array.isArray(data)) this.setState({logs:data.filter(l=>l && typeof l.id==='string' && typeof l.message==='string' && !Number.isNaN(Date.parse(l.time))).slice(0,30)});} catch {/* Recover gracefully from malformed storage. */}
 }
 componentDidUpdate(prevProps,prevState) {
   if(this.props.event && this.props.event.id !== prevProps.event?.id) {
     const event = this.props.event;
     this.setState(s=>({logs:[event,...s.logs].slice(0,30),toast:event.message}));
     clearTimeout(this.timer);
     this.timer = setTimeout(()=>this.setState({toast:null}),2800);
   }
   if(prevState.logs !== this.state.logs) {try {localStorage.setItem(LOG_KEY,JSON.stringify(this.state.logs));} catch {if(!this.state.storageError) this.setState({storageError:true});}}
 }
 componentWillUnmount() {clearTimeout(this.timer);}
 render() {
   return <><CardWrapper className="activity-panel"><div className="section-title"><span className="small-icon"><Activity size={18}/></span><h2>Recent activity</h2><span className="live-dot"/></div><p className="subtext">Your progress, as it happens.</p>{this.state.storageError && <p className="error">Activity cannot be saved on this device.</p>}<ol className="activity-list">{this.state.logs.length ? this.state.logs.slice(0,5).map(log=><li key={log.id}><span className="activity-dot"/><div><p>{log.message}</p><time dateTime={log.time}>{new Date(log.time).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</time></div></li>) : <li className="activity-empty"><Clock3 size={20}/><p>Nothing here yet. Add a task or change a filter to start your activity trail.</p></li>}</ol></CardWrapper>{this.state.toast && <div role="status" className="toast"><span>✓</span>{this.state.toast}</div>}</>;
 }
}
