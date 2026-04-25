import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ListTodo, Trash2, Plus, Calendar } from 'lucide-react';
import type { Task, Milestone } from './DreamApp';

interface TodoListProps {
  tasks: Task[];
  milestones: Milestone[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onAddTask: (title: string, milestoneId: string, dueDate: Date) => void;
}

export function TodoList({ tasks, milestones, onToggleTask, onDeleteTask, onAddTask }: TodoListProps) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedMilestone, setSelectedMilestone] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const handleAddTask = () => {
    if (newTaskTitle && selectedMilestone && dueDate) {
      onAddTask(newTaskTitle, selectedMilestone, new Date(dueDate));
      setNewTaskTitle('');
      setSelectedMilestone('');
      setDueDate('');
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercentage = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  // Group tasks by milestone
  const tasksByMilestone = milestones.map((milestone) => ({
    milestone,
    tasks: filteredTasks.filter((task) => task.milestoneId === milestone.id),
  }));

  return (
    <div className="space-y-6">
      {/* Progress Card */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
        <CardHeader>
          <div className="flex items-center gap-3">
            <ListTodo className="w-6 h-6" />
            <div>
              <CardTitle className="text-white">Task Progress</CardTitle>
              <CardDescription className="text-blue-100">
                {completedCount} of {tasks.length} tasks completed
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-blue-300 rounded-full h-3">
            <div
              className="bg-white rounded-full h-3 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Add New Task */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
              <Input
                placeholder="Task title..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
            </div>
            <Select value={selectedMilestone} onValueChange={setSelectedMilestone}>
              <SelectTrigger>
                <SelectValue placeholder="Select milestone" />
              </SelectTrigger>
              <SelectContent>
                {milestones.map((milestone) => (
                  <SelectItem key={milestone.id} value={milestone.id}>
                    {milestone.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <Button onClick={handleAddTask} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filter */}
      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
          size="sm"
        >
          All ({tasks.length})
        </Button>
        <Button
          variant={filter === 'active' ? 'default' : 'outline'}
          onClick={() => setFilter('active')}
          size="sm"
        >
          Active ({tasks.length - completedCount})
        </Button>
        <Button
          variant={filter === 'completed' ? 'default' : 'outline'}
          onClick={() => setFilter('completed')}
          size="sm"
        >
          Completed ({completedCount})
        </Button>
      </div>

      {/* Tasks by Milestone */}
      <div className="space-y-6">
        {tasksByMilestone.map(({ milestone, tasks: milestoneTasks }) => {
          if (milestoneTasks.length === 0) return null;

          return (
            <Card key={milestone.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{milestone.title}</CardTitle>
                    <CardDescription>{milestoneTasks.length} tasks</CardDescription>
                  </div>
                  <Badge variant="outline">Month {milestone.month}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {milestoneTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 group"
                  >
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => onToggleTask(task.id)}
                    />
                    <div className="flex-1">
                      <p className={task.completed ? 'line-through text-gray-500' : ''}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-500 text-sm">
                          {new Date(task.dueDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteTask(task.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTasks.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            No tasks to display
          </CardContent>
        </Card>
      )}
    </div>
  );
}