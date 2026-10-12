import { useApp } from '../context/AppContext';
import Topbar from '../components/Topbar';

export default function Settings() {
  const { theme, toggleTheme } = useApp();

  const resetData = () => {
    if (confirm('This clears all saved skills, tasks and goals from this browser. Continue?')) {
      localStorage.removeItem('skilltrack_skills');
      localStorage.removeItem('skilltrack_tasks');
      localStorage.removeItem('skilltrack_goals');
      window.location.reload();
    }
  };

  return (
    <>
      <Topbar title="Settings" subtitle="Preferences for how SkillTrack looks and behaves." />

      <div className="panel" style={{ maxWidth: 520 }}>
        <div className="toggle-row">
          <div>
            <div className="toggle-name">Dark mode</div>
            <div className="toggle-desc">Switch the whole app to a low-light theme.</div>
          </div>
          <button
            className={`switch${theme === 'dark' ? ' on' : ''}`}
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            <span className="knob" />
          </button>
        </div>

        <div className="toggle-row">
          <div>
            <div className="toggle-name">Reset all data</div>
            <div className="toggle-desc">Clears skills, tasks and goals stored in this browser.</div>
          </div>
          <button className="btn btn-ghost" onClick={resetData}>Reset</button>
        </div>
      </div>
    </>
  );
}
