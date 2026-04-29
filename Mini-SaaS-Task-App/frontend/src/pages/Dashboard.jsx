import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTaskStatus, deleteTask } from '../services/api';
import Navbar from '../components/Navbar';
import TaskItem from '../components/TaskItem';
import { Plus, Loader2, ListTodo } from 'lucide-react';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    setIsAdding(true);
    try {
      const res = await createTask(newTaskTitle);
      setTasks([res.data, ...tasks]);
      setNewTaskTitle('');
    } catch (err) {
      console.error('Failed to add task', err);
    } finally {
      setIsAdding(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {

    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
    try {
      await updateTaskStatus(id, newStatus);
    } catch (err) {

      fetchTasks();
      console.error('Failed to update task', err);
    }
  };

  const handleDeleteTask = async (id) => {

    setTasks(tasks.filter(t => t.id !== id));
    try {
      await deleteTask(id);
    } catch (err) {

      fetchTasks();
      console.error('Failed to delete task', err);
    }
  };

  const pendingTasks = tasks.filter(t => t.status === 'Pending');
  const completedTasks = tasks.filter(t => t.status === 'Completed');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 font-sans">
      <Navbar />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Good to see you!</h1>
          <p className="text-slate-500 mt-1">Here's what you need to get done today.</p>
        </div>

        <form onSubmit={handleAddTask} className="mb-10 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Plus size={20} />
          </div>
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a new task..."
            className="w-full pl-12 pr-24 py-4 bg-white/70 backdrop-blur-xl border border-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-primary-400 focus:bg-white text-lg transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
          />
          <button
            type="submit"
            disabled={!newTaskTitle.trim() || isAdding}
            className="absolute right-2 top-2 bottom-2 bg-primary-600 text-white px-6 rounded-xl font-medium hover:bg-primary-700 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isAdding ? <Loader2 size={20} className="animate-spin" /> : 'Add Task'}
          </button>
        </form>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 size={32} className="animate-spin text-primary-500" />
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-2xl border border-dashed border-indigo-200">
            <ListTodo size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-900">No tasks yet</h3>
            <p className="text-slate-500 mt-1">Get started by creating a new task above.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {pendingTasks.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  To Do
                  <span className="bg-slate-200 text-slate-700 py-0.5 px-2 rounded-full text-xs">{pendingTasks.length}</span>
                </h3>
                <div className="space-y-3">
                  {pendingTasks.map(task => (
                    <TaskItem 
                      key={task.id} 
                      task={task} 
                      onStatusChange={handleStatusChange} 
                      onDelete={handleDeleteTask} 
                    />
                  ))}
                </div>
              </div>
            )}

            {completedTasks.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  Completed
                  <span className="bg-slate-200 text-slate-700 py-0.5 px-2 rounded-full text-xs">{completedTasks.length}</span>
                </h3>
                <div className="space-y-3 opacity-75">
                  {completedTasks.map(task => (
                    <TaskItem 
                      key={task.id} 
                      task={task} 
                      onStatusChange={handleStatusChange} 
                      onDelete={handleDeleteTask} 
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
