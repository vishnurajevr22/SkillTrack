import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialSkills, initialTasks, initialGoals } from '../data/initialData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [skills, setSkills] = useLocalStorage('skilltrack_skills', initialSkills);
  const [tasks, setTasks] = useLocalStorage('skilltrack_tasks', initialTasks);
  const [goals, setGoals] = useLocalStorage('skilltrack_goals', initialGoals);
  const [theme, setTheme] = useLocalStorage('skilltrack_theme', 'light');

  // Skill CRUD 
  const addSkill = (skill) =>
    setSkills((prev) => [...prev, { id: crypto.randomUUID(), ...skill }]);

  const updateSkill = (id, updates) =>
    setSkills((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));

  const deleteSkill = (id) =>
    setSkills((prev) => prev.filter((s) => s.id !== id));

  // Task CRUD 
  const addTask = (task) =>
    setTasks((prev) => [
      { id: crypto.randomUUID(), completed: false, createdAt: new Date().toISOString().slice(0, 10), ...task },
      ...prev,
    ]);

  const toggleTask = (id) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const deleteTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  // Goal CRUD 
  const addGoal = (goal) =>
    setGoals((prev) => [...prev, { id: crypto.randomUUID(), progress: 0, ...goal }]);

  const updateGoal = (id, updates) =>
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, ...updates } : g)));

  const deleteGoal = (id) =>
    setGoals((prev) => prev.filter((g) => g.id !== id));

  // Theme
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  //  Derived / computed progress (demonstrates map/filter/reduce) 
  const overallSkillProgress = useMemo(() => {
    if (skills.length === 0) return 0;
    const total = skills.reduce((sum, s) => sum + s.progress, 0);
    return Math.round(total / skills.length);
  }, [skills]);

  const completedTasksCount = useMemo(
    () => tasks.filter((t) => t.completed).length,
    [tasks]
  );

  const value = {
    skills, addSkill, updateSkill, deleteSkill,
    tasks, addTask, toggleTask, deleteTask,
    goals, addGoal, updateGoal, deleteGoal,
    theme, toggleTheme,
    overallSkillProgress, completedTasksCount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}
