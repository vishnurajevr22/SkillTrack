import { useApp } from '../context/AppContext';
import Topbar from '../components/Topbar';
import ProgressBar from '../components/ProgressBar';
import ProgressRing from '../components/ProgressRing';

export default function Progress() {
  const { skills, overallSkillProgress, tasks, completedTasksCount } = useApp();

  const byCategory = skills.reduce((acc, s) => {
    acc[s.category] = acc[s.category] || [];
    acc[s.category].push(s);
    return acc;
  }, {});

  const taskCompletionRate = tasks.length
    ? Math.round((completedTasksCount / tasks.length) * 100)
    : 0;

  return (
    <>
      <Topbar title="Progress" subtitle="How far you've come, broken down by area." />

      <div className="hero">
        <div className="hero-greeting">
          <h1>Two numbers that matter</h1>
          <p>
            Your skill progress is the average of every skill's slider. Your task
            completion rate shows how consistently you're finishing what you plan.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          <ProgressRing value={overallSkillProgress} label="Skills" />
          <ProgressRing value={taskCompletionRate} label="Tasks" />
        </div>
      </div>

      {Object.entries(byCategory).map(([category, list]) => (
        <div className="section" key={category}>
          <div className="section-head">
            <h2>{category}</h2>
          </div>
          <div className="panel">
            {list.map((s) => (
              <div className="skill-row" key={s.id}>
                <span className="skill-name">{s.name}</span>
                <ProgressBar value={s.progress} />
                <span className="skill-pct">{s.progress}%</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
