import React, { useRef, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import CardWrapper from "./CardWrapper";
export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState(""),
    [description, setDescription] = useState(""),
    [priority, setPriority] = useState("Medium"),
    [dueDate, setDueDate] = useState(""),
    [category, setCategory] = useState("Development"),
    [error, setError] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  function submit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please enter a task title.");
      inputRef.current?.focus();
      return;
    }
    onAdd({
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate,
      category,
    });
    setTitle("");
    setDescription("");
    setDueDate("");
    setError("");
    inputRef.current?.focus();
  }
  return (
    <CardWrapper className="task-form" id="new-task">
      <div className="section-title">
        <span className="small-icon">
          <Plus size={18} />
        </span>
        <h2>Create a task</h2>
      </div>
      <p className="subtext">Make room for your next great idea.</p>
      <form onSubmit={submit}>
        <label htmlFor="title">
          Task title <span className="required">*</span>
        </label>
        <input
          id="title"
          ref={inputRef}
          value={title}
          maxLength={100}
          placeholder="What needs to get done?"
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
          aria-invalid={!!error}
          aria-describedby={error ? "title-error" : undefined}
        />
        {error && (
          <p role="alert" id="title-error" className="error">
            {error}
          </p>
        )}
        <label htmlFor="description">
          Description <span className="optional">optional</span>
        </label>
        <textarea
          id="description"
          value={description}
          maxLength={400}
          placeholder="Add a few details…"
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
        <div className="form-grid">
          <div>
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              {["Low", "Medium", "High"].map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="dueDate">Due date</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {["Development", "Design", "Planning", "Personal"].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <button className="primary-button" type="submit">
          <Plus size={17} /> Add task
        </button>
        <p className="form-note">Small steps. Meaningful progress.</p>
      </form>
    </CardWrapper>
  );
}
