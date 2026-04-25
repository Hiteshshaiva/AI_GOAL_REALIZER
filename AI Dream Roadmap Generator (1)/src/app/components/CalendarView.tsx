import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Milestone, Task } from './DreamApp';

interface CalendarViewProps {
  milestones: Milestone[];
  tasks: Task[];
}

export function CalendarView({ milestones, tasks }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(0); // Relative to today
  
  const today = new Date();
  const displayDate = new Date(today.getFullYear(), today.getMonth() + currentMonth, 1);
  const monthName = displayDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Get tasks for current month
  const tasksThisMonth = tasks.filter((task) => {
    const taskDate = new Date(task.dueDate);
    return (
      taskDate.getMonth() === displayDate.getMonth() &&
      taskDate.getFullYear() === displayDate.getFullYear()
    );
  });

  // Get milestones for current month
  const milestonesThisMonth = milestones.filter((milestone) => {
    const milestoneDate = new Date(today);
    milestoneDate.setMonth(today.getMonth() + milestone.month);
    return (
      milestoneDate.getMonth() === displayDate.getMonth() &&
      milestoneDate.getFullYear() === displayDate.getFullYear()
    );
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-6 h-6 text-purple-600" />
              <div>
                <CardTitle>Dream Calendar</CardTitle>
                <CardDescription>Track your milestones and tasks</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentMonth((prev) => prev - 1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-purple-600 min-w-[160px] text-center">
                {monthName}
              </span>
              <button
                onClick={() => setCurrentMonth((prev) => prev + 1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Milestones This Month */}
      {milestonesThisMonth.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Milestones This Month</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {milestonesThisMonth.map((milestone) => (
              <div
                key={milestone.id}
                className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span>{milestone.title}</span>
                    {milestone.completed && (
                      <Badge variant="default" className="bg-green-500">
                        Completed
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{milestone.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Tasks This Month */}
      <Card>
        <CardHeader>
          <CardTitle>Tasks This Month ({tasksThisMonth.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {tasksThisMonth.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No tasks scheduled for this month</p>
          ) : (
            <div className="space-y-3">
              {tasksThisMonth
                .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                .map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      task.completed
                        ? 'bg-green-50 border-green-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <span className={task.completed ? 'line-through text-gray-500' : ''}>
                      {task.title}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 text-sm">
                        {new Date(task.dueDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                      {task.completed && (
                        <Badge variant="default" className="bg-green-500">
                          Done
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}