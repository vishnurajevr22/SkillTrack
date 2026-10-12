import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Topbar from '../components/Topbar';
import ProgressBar from '../components/ProgressBar';
import ProgressRing from '../components/ProgressRing';

export default function Dashboard() {
  const { skills, tasks, overallSkillProgress, completedTasksCount, toggleTask } = useApp();

  const pendingTasks = tasks.filter((t) => !t.completed).slice(0, 4);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <>
      <Topbar title="Dashboard" subtitle="Here's where your learning stands today." />

      <div className="hero">
        <div className="hero-greeting">
          <h1>{greeting}. You're {overallSkillProgress}% of the way there.</h1>
          <p>
            You're tracking {skills.length} skills and have {tasks.length - completedTasksCount}{' '}
            open tasks. Keep the streak going — small daily progress compounds fast.
          </p>
        </div>
        <ProgressRing value={overallSkillProgress} label="Overall" />
      </div>

      <div className="stat-rail">
        <div className="stat-item">
          <div className="stat-value">{skills.length}</div>
          <div className="stat-label">Skills tracked</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{tasks.length}</div>
          <div className="stat-label">Total tasks</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{completedTasksCount}</div>
          <div className="stat-label">Completed tasks</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{overallSkillProgress}%</div>
          <div className="stat-label">Overall progress</div>
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <h2>My Skills</h2>
          <Link className="section-link" to="/skills">Manage skills →</Link>
        </div>
        <div className="panel">
          {skills.slice(0, 5).map((s) => (
            <div className="skill-row" key={s.id}>
              <span className="skill-name">{s.name}</span>
              <span className="skill-cat">{s.category}</span>
              <ProgressBar value={s.progress} />
              <span className="skill-pct">{s.progress}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <h2>Recent Tasks</h2>
          <Link className="section-link" to="/tasks">View all →</Link>
        </div>
        <div className="panel">
          {pendingTasks.length === 0 ? (
            <div className="empty-state">
              <div className="display">All caught up</div>
              No pending tasks right now — add a new one from the Tasks page.
            </div>
          ) : (
            pendingTasks.map((t) => (
              <div className="task-row" key={t.id}>
                <button
                  className={`check${t.completed ? ' done' : ''}`}
                  onClick={() => toggleTask(t.id)}
                  aria-label="Toggle complete"
                >
                  {t.completed && '✓'}
                </button>
                <span className="task-title">{t.title}</span>
                <span className={`priority-tag priority-${t.priority}`}>{t.priority}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
