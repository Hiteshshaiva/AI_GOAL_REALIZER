import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Map, CheckCircle2, Circle } from 'lucide-react';
import type { Dream, Milestone } from './DreamApp';

interface RoadmapProps {
  dream: Dream;
  milestones: Milestone[];
  onToggleMilestone: (id: string) => void;
}

export function Roadmap({ dream, milestones, onToggleMilestone }: RoadmapProps) {
  const completedCount = milestones.filter((m) => m.completed).length;
  const progress = Math.round((completedCount / milestones.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Map className="w-6 h-6" />
            <CardTitle className="text-white">Your Dream Roadmap</CardTitle>
          </div>
          <CardDescription className="text-purple-100">
            {dream.title}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{completedCount} of {milestones.length} milestones completed</span>
            </div>
            <div className="w-full bg-purple-300 rounded-full h-3">
              <div
                className="bg-white rounded-full h-3 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-purple-200" />

        {/* Milestones */}
        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="relative pl-16">
              {/* Timeline Dot */}
              <div className="absolute left-0 top-6 flex items-center">
                <button
                  onClick={() => onToggleMilestone(milestone.id)}
                  className="relative z-10"
                >
                  {milestone.completed ? (
                    <CheckCircle2 className="w-12 h-12 text-green-500 bg-white rounded-full" />
                  ) : (
                    <Circle className="w-12 h-12 text-purple-400 bg-white rounded-full" />
                  )}
                </button>
              </div>

              {/* Milestone Card */}
              <Card className={milestone.completed ? 'bg-green-50 border-green-200' : ''}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className={milestone.completed ? 'line-through text-gray-500' : ''}>
                          {milestone.title}
                        </CardTitle>
                        {milestone.completed && (
                          <Badge variant="default" className="bg-green-500">
                            Completed
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{milestone.description}</CardDescription>
                    </div>
                    <Badge variant="outline">Month {milestone.month}</Badge>
                  </div>
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}