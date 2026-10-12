import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Topbar from '../components/Topbar';
import ProgressBar from '../components/ProgressBar';
import Modal from '../components/Modal';

const emptyForm = { title: '', description: '', targetDate: '' };

export default function Goals() {
  const { goals, addGoal, updateGoal, deleteGoal } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    addGoal(form);
    setForm(emptyForm);
    setModalOpen(false);
  };

  const bump = (goal, delta) =>
    updateGoal(goal.id, { progress: Math.min(100, Math.max(0, goal.progress + delta)) });

  return (
    <>
      <Topbar title="Goals" subtitle="The bigger picture behind the daily tasks." />

      <div className="toolbar">
        <div style={{ flex: 1 }} />
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>+ Add Goal</button>
      </div>

      {goals.length === 0 ? (
        <div className="empty-state panel">
          <div className="display">No goals yet</div>
          Set one long-term goal to give your daily tasks direction.
        </div>
      ) : (
        goals.map((g) => (
          <div className="goal-card" key={g.id}>
            <div className="goal-top">
              <div>
                <div className="goal-title">{g.title}</div>
                <div className="goal-desc">{g.description}</div>
              </div>
              <div className="row-actions">
                <button onClick={() => bump(g, 10)}>+10%</button>
                <button className="danger" onClick={() => deleteGoal(g.id)}>Delete</button>
              </div>
            </div>
            <div className="goal-bar">
              <ProgressBar value={g.progress} />
            </div>
            {g.targetDate && <div className="goal-date">Target: {g.targetDate}</div>}
          </div>
        ))
      )}

      {modalOpen && (
        <Modal title="Add Goal" onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Goal title</label>
              <input
                autoFocus
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Get comfortable with TypeScript"
              />
            </div>
            <div className="field">
              <label>Description</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="What does 'done' look like for this goal?"
              />
            </div>
            <div className="field">
              <label>Target date</label>
              <input
                type="date"
                value={form.targetDate}
                onChange={(e) => setForm({ ...form, targetDate: e.target.value })}
              />
            </div>
            <div className="modal-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Add goal</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
