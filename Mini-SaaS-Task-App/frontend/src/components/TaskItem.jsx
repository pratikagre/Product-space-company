import { Trash2, CheckCircle, Circle } from 'lucide-react';

export default function TaskItem({ task, onStatusChange, onDelete }) {
  const isCompleted = task.status === 'Completed';

  return (
    <div className={`group flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border rounded-xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 ${isCompleted ? 'border-slate-200/50 bg-slate-50/50' : 'border-white hover:border-primary-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:bg-white'}`}>
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => onStatusChange(task.id, isCompleted ? 'Pending' : 'Completed')}
          className={`flex-shrink-0 transition-colors ${isCompleted ? 'text-green-500 hover:text-green-600' : 'text-slate-300 hover:text-primary-500'}`}
        >
          {isCompleted ? <CheckCircle size={24} /> : <Circle size={24} />}
        </button>
        <span className={`text-base font-medium transition-all duration-200 ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
          {task.title}
        </span>
      </div>
      
      <button
        onClick={() => onDelete(task.id)}
        className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200 p-2 rounded-lg hover:bg-red-50 focus:opacity-100"
        title="Delete task"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
