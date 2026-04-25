import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { BookOpen, Video, FileText, GraduationCap, ExternalLink } from 'lucide-react';
import type { Resource, Dream } from './DreamApp';

interface ResourcesProps {
  resources: Resource[];
  dream: Dream;
}

export function Resources({ resources, dream }: ResourcesProps) {
  const getIcon = (type: Resource['type']) => {
    switch (type) {
      case 'book':
        return <BookOpen className="w-5 h-5" />;
      case 'course':
        return <GraduationCap className="w-5 h-5" />;
      case 'article':
        return <FileText className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: Resource['type']) => {
    switch (type) {
      case 'book':
        return 'bg-blue-100 text-blue-700';
      case 'course':
        return 'bg-purple-100 text-purple-700';
      case 'article':
        return 'bg-green-100 text-green-700';
      case 'video':
        return 'bg-red-100 text-red-700';
    }
  };

  // Group resources by type
  const resourcesByType = {
    book: resources.filter((r) => r.type === 'book'),
    course: resources.filter((r) => r.type === 'course'),
    article: resources.filter((r) => r.type === 'article'),
    video: resources.filter((r) => r.type === 'video'),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-500 to-teal-500 text-white border-0">
        <CardHeader>
          <CardTitle className="text-white">Learning Resources</CardTitle>
          <CardDescription className="text-green-100">
            Curated resources to help you achieve: {dream.title}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Books */}
      {resourcesByType.book.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h3 className="text-blue-600">Recommended Books</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resourcesByType.book.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <CardDescription className="mt-2">{resource.description}</CardDescription>
                    </div>
                    <Badge className={getTypeColor(resource.type)}>
                      {resource.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      View Book
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Courses */}
      {resourcesByType.course.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5 text-purple-600" />
            <h3 className="text-purple-600">Online Courses</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resourcesByType.course.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <CardDescription className="mt-2">{resource.description}</CardDescription>
                    </div>
                    <Badge className={getTypeColor(resource.type)}>
                      {resource.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      View Course
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Articles & Videos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Articles */}
        {resourcesByType.article.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-green-600" />
              <h3 className="text-green-600">Articles</h3>
            </div>
            <div className="space-y-3">
              {resourcesByType.article.map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <CardTitle className="text-base">{resource.title}</CardTitle>
                        <CardDescription className="mt-1">{resource.description}</CardDescription>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Videos */}
        {resourcesByType.video.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Video className="w-5 h-5 text-red-600" />
              <h3 className="text-red-600">Videos</h3>
            </div>
            <div className="space-y-3">
              {resourcesByType.video.map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <CardTitle className="text-base">{resource.title}</CardTitle>
                        <CardDescription className="mt-1">{resource.description}</CardDescription>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}