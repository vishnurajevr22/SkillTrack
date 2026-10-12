import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Topbar from '../components/Topbar';
import Modal from '../components/Modal';

export default function Tasks() {
  const { tasks, addTask, toggleTask, deleteTask } = useApp();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all | pending | completed
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: '', priority: 'medium' });

  const filtered = tasks
    .filter((t) => t.title.toLowerCase().includes(query.toLowerCase()))
    .filter((t) => {
      if (filter === 'pending') return !t.completed;
      if (filter === 'completed') return t.completed;
      return true;
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    addTask(form);
    setForm({ title: '', priority: 'medium' });
    setModalOpen(false);
  };

  return (
    <>
      <Topbar title="Tasks" subtitle="What you're actively working through." />

      <div className="toolbar">
        <input
          className="search-input"
          placeholder="Search tasks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="filter-pills">
          {['all', 'pending', 'completed'].map((f) => (
            <button
              key={f}
              className={`pill${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f[0].toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>+ Add Task</button>
      </div>

      <div className="panel">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="display">Nothing here</div>
            Adjust your filters or add a new task to get started.
          </div>
        ) : (
          filtered.map((t) => (
            <div className="task-row" key={t.id}>
              <button
                className={`check${t.completed ? ' done' : ''}`}
                onClick={() => toggleTask(t.id)}
                aria-label="Toggle complete"
              >
                {t.completed && '✓'}
              </button>
              <span className={`task-title${t.completed ? ' done' : ''}`}>{t.title}</span>
              <span className={`priority-tag priority-${t.priority}`}>{t.priority}</span>
              <div className="row-actions">
                <button className="danger" onClick={() => deleteTask(t.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {modalOpen && (
        <Modal title="Add Task" onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Task</label>
              <input
                autoFocus
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Practice closures in JS"
              />
            </div>
            <div className="field">
              <label>Priority</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="modal-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Add task</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
