import React, { memo } from "react";
import { CalendarDays, Trash2, Flag, Check } from "lucide-react";
function TaskCard({ task, onStatusChange, onDelete }) {
  const completed = task.status === "Completed";
  return (
    <article className={`task-card ${completed ? "completed" : ""}`}>
      <div className="task-main">
        <button
          className={`check-button ${completed ? "checked" : ""}`}
          onClick={() =>
            onStatusChange(task.id, completed ? "To do" : "Completed")
          }
          aria-label={`${completed ? "Reopen" : "Complete"} ${task.title}`}
        >
          {completed && <Check size={14} />}
        </button>
        <div className="task-copy">
          <div className="task-heading">
            <h3>{task.title}</h3>
            <span className={`priority ${task.priority.toLowerCase()}`}>
              {task.priority === "High" && <Flag size={11} />} {task.priority}
            </span>
          </div>
          {task.description && <p>{task.description}</p>}
          <div className="task-meta">
            <span className="category">{task.category}</span>
            {task.dueDate && (
              <span>
                <CalendarDays size={12} />
                {new Date(`${task.dueDate}T00:00:00`).toLocaleDateString(
                  undefined,
                  { month: "short", day: "numeric" },
                )}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="task-controls">
        <select
          aria-label={`Status of ${task.title}`}
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          className={`status-select ${task.status.toLowerCase().replaceAll(" ", "-")}`}
        >
          {["To do", "In progress", "Completed"].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <button
          className="delete-button"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.title}`}
          title="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </article>
  );
}
export default memo(TaskCard);
