import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Topbar from '../components/Topbar';
import ProgressBar from '../components/ProgressBar';
import Modal from '../components/Modal';

const emptyForm = { name: '', category: 'Frontend', progress: 50 };

export default function Skills() {
  const { skills, addSkill, updateSkill, deleteSkill } = useApp();
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = skills.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (skill) => {
    setEditingId(skill.id);
    setForm({ name: skill.name, category: skill.category, progress: skill.progress });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const payload = { ...form, progress: Number(form.progress) };
    if (editingId) {
      updateSkill(editingId, payload);
    } else {
      addSkill(payload);
    }
    setModalOpen(false);
  };

  return (
    <>
      <Topbar title="Skills" subtitle="Everything you're learning, in one list." />

      <div className="toolbar">
        <input
          className="search-input"
          placeholder="Search skills..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary" onClick={openAdd}>+ Add Skill</button>
      </div>

      <div className="panel">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="display">No skills found</div>
            Try a different search, or add your first skill.
          </div>
        ) : (
          filtered.map((s) => (
            <div className="skill-row" key={s.id}>
              <span className="skill-name">{s.name}</span>
              <span className="skill-cat">{s.category}</span>
              <ProgressBar value={s.progress} />
              <span className="skill-pct">{s.progress}%</span>
              <div className="row-actions">
                <button onClick={() => openEdit(s)}>Edit</button>
                <button className="danger" onClick={() => deleteSkill(s.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {modalOpen && (
        <Modal title={editingId ? 'Edit Skill' : 'Add Skill'} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Skill name</label>
              <input
                autoFocus
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. TypeScript"
              />
            </div>
            <div className="field">
              <label>Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option>Frontend</option>
                <option>Backend</option>
                <option>Database</option>
                <option>Tools</option>
                <option>Other</option>
              </select>
            </div>
            <div className="field">
              <label>Progress: {form.progress}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={form.progress}
                onChange={(e) => setForm({ ...form, progress: e.target.value })}
              />
            </div>
            <div className="modal-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">{editingId ? 'Save changes' : 'Add skill'}</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
