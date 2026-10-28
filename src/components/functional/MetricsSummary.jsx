import React from 'react';
import {Layers, CircleDashed, Timer, CircleCheck} from 'lucide-react';
export default function MetricsSummary({tasks}) {
 const metrics = [{label:'Total tasks', value:tasks.length, icon:Layers, tone:'purple', note:'Everything in your workspace'}, {label:'To do', value:tasks.filter(t=>t.status==='To do').length, icon:CircleDashed, tone:'blue', note:'Ready for your next move'}, {label:'In progress', value:tasks.filter(t=>t.status==='In progress').length, icon:Timer, tone:'orange', note:'A little closer to the finish'}, {label:'Completed', value:tasks.filter(t=>t.status==='Completed').length, icon:CircleCheck, tone:'green', note:'Good work, keep it going'}];
 return <section className="metrics" aria-label="Task metrics">{metrics.map(({label,value,icon:Icon,tone,note})=><article className="metric panel" key={label}><div className="metric-top"><span>{label}</span><span className={`metric-icon ${tone}`}><Icon size={19}/></span></div><strong>{value.toString().padStart(2,'0')}</strong><p>{note}</p></article>)}</section>;
}
