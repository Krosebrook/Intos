import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';
import {
  GraduationCap,
  Search,
  Play,
  Clock,
  Award,
  BookOpen,
  TrendingUp,
  CheckCircle2,
  Lock,
  Users,
  Calendar,
  Star,
  Target,
  Zap,
} from 'lucide-react';
import { MetricCard } from '../int-os/MetricCard';

const courses = [
  {
    id: 1,
    title: 'Advanced HubSpot Automation',
    category: 'Automation',
    progress: 75,
    duration: '4h 30m',
    lessons: 24,
    completed: 18,
    instructor: 'Sarah Chen',
    rating: 4.8,
    enrolled: 342,
    thumbnail: '#0097A9',
    status: 'in-progress',
    nextLesson: 'Building Multi-Stage Workflows',
    dueDate: '2025-11-15',
  },
  {
    id: 2,
    title: 'Customer Support Excellence',
    category: 'Support',
    progress: 100,
    duration: '3h 15m',
    lessons: 18,
    completed: 18,
    instructor: 'Mike Rodriguez',
    rating: 4.9,
    enrolled: 567,
    thumbnail: '#FF6B35',
    status: 'completed',
    certificationAvailable: true,
  },
  {
    id: 3,
    title: 'AI-Driven Analytics Fundamentals',
    category: 'Analytics',
    progress: 45,
    duration: '5h 20m',
    lessons: 32,
    completed: 14,
    instructor: 'Dr. Emily Park',
    rating: 4.7,
    enrolled: 289,
    thumbnail: '#9B59B6',
    status: 'in-progress',
    nextLesson: 'Predictive Modeling Basics',
  },
  {
    id: 4,
    title: 'Freshdesk Integration Mastery',
    category: 'Integration',
    progress: 0,
    duration: '2h 45m',
    lessons: 16,
    completed: 0,
    instructor: 'Alex Turner',
    rating: 4.6,
    enrolled: 198,
    thumbnail: '#40B4E5',
    status: 'locked',
    prerequisite: 'Complete Customer Support Excellence',
  },
  {
    id: 5,
    title: 'Team Leadership & Communication',
    category: 'Leadership',
    progress: 30,
    duration: '6h 00m',
    lessons: 28,
    completed: 8,
    instructor: 'Jordan Lee',
    rating: 4.9,
    enrolled: 445,
    thumbnail: '#2ECC71',
    status: 'in-progress',
    nextLesson: 'Conflict Resolution Strategies',
  },
  {
    id: 6,
    title: 'Security & Compliance Training',
    category: 'Security',
    progress: 0,
    duration: '3h 30m',
    lessons: 20,
    completed: 0,
    instructor: 'Security Team',
    rating: 4.5,
    enrolled: 891,
    thumbnail: '#16A085',
    status: 'not-started',
    mandatory: true,
    dueDate: '2025-11-01',
  },
];

const certifications = [
  {
    id: 1,
    name: 'Customer Support Specialist',
    issueDate: '2025-10-15',
    validUntil: '2026-10-15',
    status: 'active',
    credentialId: 'CSP-2025-8945',
  },
  {
    id: 2,
    name: 'HubSpot Automation Expert',
    progress: 75,
    status: 'in-progress',
    requiredScore: 85,
    currentScore: 78,
  },
  {
    id: 3,
    name: 'AI Analytics Professional',
    progress: 45,
    status: 'in-progress',
    requiredScore: 80,
    currentScore: 62,
  },
];

const learningPaths = [
  {
    id: 1,
    name: 'Support Operations Master',
    courses: 5,
    completed: 2,
    duration: '18h',
    level: 'Intermediate',
  },
  {
    id: 2,
    name: 'Automation Specialist',
    courses: 4,
    completed: 1,
    duration: '14h',
    level: 'Advanced',
  },
  {
    id: 3,
    name: 'Data-Driven Decision Maker',
    courses: 6,
    completed: 0,
    duration: '22h',
    level: 'Beginner',
  },
];

export function AcademyPortal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('my-courses');

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const inProgressCourses = courses.filter((c) => c.status === 'in-progress');
  const completedCourses = courses.filter((c) => c.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <GraduationCap className="w-8 h-8 text-[#40B4E5]" />
          <h1>AcademyPortal</h1>
        </div>
        <p className="text-[#A8B2C1]">
          Learning management and certification tracking
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Courses in Progress"
          value={inProgressCourses.length.toString()}
          change="+2 this month"
          trend="up"
          icon={<BookOpen className="w-5 h-5 text-[#40B4E5]" />}
        />
        <MetricCard
          label="Completed Courses"
          value={completedCourses.length.toString()}
          change="+1 this week"
          trend="up"
          icon={<CheckCircle2 className="w-5 h-5 text-[#2ECC71]" />}
        />
        <MetricCard
          label="Learning Hours"
          value="47.5h"
          change="+12.5h this month"
          trend="up"
          icon={<Clock className="w-5 h-5 text-[#9B59B6]" />}
        />
        <MetricCard
          label="Certifications"
          value="1"
          change="2 in progress"
          trend="neutral"
          icon={<Award className="w-5 h-5 text-[#F1C40F]" />}
        />
      </div>

      {/* Search Bar */}
      <Card className="p-4 card-gradient border-white/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A8B2C1]" />
          <Input
            placeholder="Search courses, certifications, or instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5 border-white/10"
          />
        </div>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="bg-white/5 border border-white/10">
          <TabsTrigger value="my-courses">My Courses</TabsTrigger>
          <TabsTrigger value="browse">Browse Catalog</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="paths">Learning Paths</TabsTrigger>
        </TabsList>

        {/* My Courses Tab */}
        <TabsContent value="my-courses" className="space-y-6 mt-6">
          {/* Continue Learning */}
          {inProgressCourses.length > 0 && (
            <div>
              <h2 className="mb-4">Continue Learning</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {inProgressCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="p-6 card-gradient border-white/10 hover:border-[#40B4E5]/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="w-16 h-16 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${course.thumbnail}20` }}
                      >
                        <BookOpen
                          className="w-8 h-8"
                          style={{ color: course.thumbnail }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg mb-1">{course.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {course.category}
                            </Badge>
                          </div>
                          {course.mandatory && (
                            <Badge className="bg-[#FF6B35]/20 text-[#FF6B35] border-[#FF6B35]/50">
                              Mandatory
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-[#A8B2C1] mb-3">
                          Next: {course.nextLesson}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-[#A8B2C1]">
                            {course.completed} of {course.lessons} lessons
                          </span>
                          <span className="text-[#40B4E5]">
                            {course.progress}%
                          </span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-4 text-sm text-[#A8B2C1]">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {course.duration}
                          </div>
                          {course.dueDate && (
                            <div className="flex items-center gap-1 text-[#FF6B35]">
                              <Calendar className="w-4 h-4" />
                              Due {new Date(course.dueDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                        <Button
                          size="sm"
                          className="bg-[#40B4E5] hover:bg-[#40B4E5]/80"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Continue
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Completed Courses */}
          {completedCourses.length > 0 && (
            <div>
              <h2 className="mb-4">Completed</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {completedCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="p-4 card-gradient border-white/10 hover:border-[#2ECC71]/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${course.thumbnail}20` }}
                      >
                        <CheckCircle2
                          className="w-6 h-6"
                          style={{ color: course.thumbnail }}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm mb-1">{course.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {course.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-[#A8B2C1]">
                        <Star className="w-4 h-4 fill-[#F1C40F] text-[#F1C40F]" />
                        {course.rating}
                      </div>
                      {course.certificationAvailable && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#2ECC71]/50 text-[#2ECC71] hover:bg-[#2ECC71]/10"
                        >
                          <Award className="w-4 h-4 mr-1" />
                          Get Certificate
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* Browse Catalog Tab */}
        <TabsContent value="browse" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="p-5 card-gradient border-white/10 hover:border-[#40B4E5]/50 transition-all cursor-pointer relative"
              >
                {course.status === 'locked' && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                    <div className="text-center">
                      <Lock className="w-8 h-8 text-[#A8B2C1] mx-auto mb-2" />
                      <p className="text-sm text-[#A8B2C1]">
                        {course.prerequisite}
                      </p>
                    </div>
                  </div>
                )}

                <div
                  className="w-full h-32 rounded-lg mb-4 flex items-center justify-center"
                  style={{ backgroundColor: `${course.thumbnail}20` }}
                >
                  <GraduationCap
                    className="w-12 h-12"
                    style={{ color: course.thumbnail }}
                  />
                </div>

                <Badge variant="outline" className="text-xs mb-2">
                  {course.category}
                </Badge>

                <h3 className="text-base mb-2">{course.title}</h3>

                <div className="flex items-center gap-2 text-sm text-[#A8B2C1] mb-3">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs">
                      {course.instructor.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span>{course.instructor}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-[#A8B2C1] mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.enrolled}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#F1C40F] text-[#F1C40F]" />
                    {course.rating}
                  </div>
                </div>

                {course.progress > 0 && (
                  <div className="mb-3">
                    <Progress value={course.progress} className="h-1" />
                  </div>
                )}

                <Button
                  className="w-full"
                  variant={course.status === 'not-started' ? 'default' : 'outline'}
                  disabled={course.status === 'locked'}
                >
                  {course.status === 'completed' ? 'Review' :
                   course.status === 'in-progress' ? 'Continue' :
                   course.status === 'locked' ? 'Locked' : 'Start Course'}
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Certifications Tab */}
        <TabsContent value="certifications" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <Card key={cert.id} className="p-6 card-gradient border-white/10">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-16 h-16 rounded-lg flex items-center justify-center ${
                      cert.status === 'active'
                        ? 'bg-[#2ECC71]/20'
                        : 'bg-[#40B4E5]/20'
                    }`}
                  >
                    <Award
                      className={`w-8 h-8 ${
                        cert.status === 'active'
                          ? 'text-[#2ECC71]'
                          : 'text-[#40B4E5]'
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg">{cert.name}</h3>
                      <Badge
                        className={
                          cert.status === 'active'
                            ? 'bg-[#2ECC71]/20 text-[#2ECC71] border-[#2ECC71]/50'
                            : 'bg-[#40B4E5]/20 text-[#40B4E5] border-[#40B4E5]/50'
                        }
                      >
                        {cert.status === 'active' ? 'Active' : 'In Progress'}
                      </Badge>
                    </div>

                    {cert.status === 'active' ? (
                      <>
                        <p className="text-sm text-[#A8B2C1] mb-2">
                          Credential ID: {cert.credentialId}
                        </p>
                        <p className="text-sm text-[#A8B2C1] mb-4">
                          Valid until: {new Date(cert.validUntil!).toLocaleDateString()}
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Download PDF
                          </Button>
                          <Button size="sm" variant="outline">
                            Share
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-3 mb-4">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-[#A8B2C1]">
                                Course Progress
                              </span>
                              <span className="text-[#40B4E5]">
                                {cert.progress}%
                              </span>
                            </div>
                            <Progress value={cert.progress} className="h-2" />
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-[#A8B2C1]">
                              Current Score: {cert.currentScore}%
                            </span>
                            <span className="text-[#A8B2C1]">
                              Required: {cert.requiredScore}%
                            </span>
                          </div>
                        </div>
                        <Button size="sm" className="bg-[#40B4E5] hover:bg-[#40B4E5]/80">
                          Continue Learning
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Learning Paths Tab */}
        <TabsContent value="paths" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {learningPaths.map((path) => (
              <Card key={path.id} className="p-6 card-gradient border-white/10 hover:border-[#40B4E5]/50 transition-all cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-8 h-8 text-[#40B4E5]" />
                  <Badge variant="outline">{path.level}</Badge>
                </div>

                <h3 className="text-lg mb-3">{path.name}</h3>

                <div className="space-y-2 mb-4 text-sm text-[#A8B2C1]">
                  <div className="flex items-center justify-between">
                    <span>Courses:</span>
                    <span>
                      {path.completed} / {path.courses}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Duration:</span>
                    <span>{path.duration}</span>
                  </div>
                </div>

                <Progress
                  value={(path.completed / path.courses) * 100}
                  className="h-2 mb-4"
                />

                <Button
                  className="w-full"
                  variant={path.completed > 0 ? 'default' : 'outline'}
                >
                  {path.completed > 0 ? 'Continue Path' : 'Start Path'}
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      <Card className="p-6 card-gradient border-white/10">
        <h2 className="mb-4">This Month's Activity</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#40B4E5]/20 mx-auto mb-2">
              <Zap className="w-6 h-6 text-[#40B4E5]" />
            </div>
            <div className="text-2xl mb-1">12.5h</div>
            <div className="text-sm text-[#A8B2C1]">Learning Time</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#2ECC71]/20 mx-auto mb-2">
              <CheckCircle2 className="w-6 h-6 text-[#2ECC71]" />
            </div>
            <div className="text-2xl mb-1">8</div>
            <div className="text-sm text-[#A8B2C1]">Lessons Completed</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#9B59B6]/20 mx-auto mb-2">
              <TrendingUp className="w-6 h-6 text-[#9B59B6]" />
            </div>
            <div className="text-2xl mb-1">92%</div>
            <div className="text-sm text-[#A8B2C1]">Avg Quiz Score</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#F1C40F]/20 mx-auto mb-2">
              <Target className="w-6 h-6 text-[#F1C40F]" />
            </div>
            <div className="text-2xl mb-1">3</div>
            <div className="text-sm text-[#A8B2C1]">Streak Days</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
