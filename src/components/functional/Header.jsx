import React from "react";
import { ArrowUpRight, CheckCheck } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
export default function Header() {
  return (
    <header className="topbar">
      <a className="brand" href="#">
        <span className="brand-icon">
          <CheckCheck size={23} />
        </span>
        taskflow<span className="brand-label">WORKSPACE</span>
      </a>
      <div className="top-actions">
        <span className="local-badge">
          <i /> Saved on this device
        </span>
        <ThemeToggle />
        <a
          className="repo-link"
          href="https://github.com/vaais251/Os-assignnment"
          target="_blank"
          rel="noreferrer"
        >
          Source code <ArrowUpRight size={15} />
        </a>
      </div>
    </header>
  );
}
