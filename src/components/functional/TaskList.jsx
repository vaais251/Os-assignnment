import React from "react";
import { Search, ListChecks } from "lucide-react";
import CardWrapper from "./CardWrapper";
import TaskCard from "./TaskCard";
export default function TaskList({
  tasks,
  total,
  status,
  priority,
  query,
  onStatusFilter,
  onPriorityFilter,
  onQuery,
  onStatusChange,
  onDelete,
}) {
  return (
    <CardWrapper className="task-list">
      <div className="list-title">
        <div>
          <h2>
            Your tasks <span className="count">{total}</span>
          </h2>
          <p className="subtext">A clear view of what matters next.</p>
        </div>
        <span className="view-label">
          <ListChecks size={16} /> List view
        </span>
      </div>
      <div className="filters">
        <div className="search-field">
          <Search size={16} />
          <input
            aria-label="Search tasks"
            placeholder="Search tasks…"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
          />
        </div>
        <select
          aria-label="Filter by priority"
          value={priority}
          onChange={(e) => onPriorityFilter(e.target.value)}
        >
          {["All priorities", "High", "Medium", "Low"].map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>
      <div className="tabs" aria-label="Filter by status">
        {["All tasks", "To do", "In progress", "Completed"].map((s) => (
          <button
            key={s}
            aria-pressed={status === s}
            className={status === s ? "active" : ""}
            onClick={() => onStatusFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="task-rows">
        {tasks.length ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="empty">
            <ListChecks size={32} />
            <h3>{total ? "No matching tasks" : "A fresh start"}</h3>
            <p>
              {total
                ? "Try another search or filter."
                : "Create your first task to get things moving."}
            </p>
          </div>
        )}
      </div>
      <div className="list-footer">
        Showing {tasks.length} of {total} tasks<span>One task at a time.</span>
      </div>
    </CardWrapper>
  );
}
