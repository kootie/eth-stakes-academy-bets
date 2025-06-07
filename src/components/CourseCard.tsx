
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Course } from '@/data/mockData';
import { useWalletContext } from '@/contexts/WalletContext';
import { Clock, BookOpen, Award, ArrowRight } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onEnroll: (courseId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll }) => {
  const { wallet } = useWalletContext();
  
  const isEnrolled = wallet.isConnected && Math.random() > 0.7; // Simulated enrollment check
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Foundation': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'Advanced': return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
      case 'Professional': return 'bg-red-100 text-red-800 hover:bg-red-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Electrical': return 'bg-blue-100 text-blue-800';
      case 'Plumbing': return 'bg-cyan-100 text-cyan-800';
      case 'Mechanics': return 'bg-purple-100 text-purple-800';
      case 'Engineering': return 'bg-indigo-100 text-indigo-800';
      case 'Metalwork': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-web3-primary/20 h-full flex flex-col">
      <div className="relative h-48 w-full">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-web3-primary text-white font-bold">
            Course {course.courseNumber}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Badge className={getCategoryColor(course.category)}>
            {course.category}
          </Badge>
          <Badge className={getDifficultyColor(course.difficulty)}>
            {course.difficulty}
          </Badge>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex gap-2 flex-wrap">
            {course.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} className="bg-web3-primary/70 hover:bg-web3-primary text-white text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      <CardHeader className="flex-grow">
        <CardTitle className="text-lg font-bold line-clamp-2">{course.title}</CardTitle>
        <CardDescription className="flex items-center gap-4 text-sm">
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {course.duration}
          </span>
          <span className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1" />
            {course.modules} Modules
          </span>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 line-clamp-3 mb-3">{course.description}</p>
        {course.prerequisites && course.prerequisites.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-medium text-gray-500 mb-1">Prerequisites:</p>
            <div className="flex flex-wrap gap-1">
              {course.prerequisites.map((prereq, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {prereq}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between items-center border-t pt-4 mt-auto">
        <div>
          <span className="eth-icon text-sm font-medium">{course.stakingAmount} ETH stake</span>
          <p className="text-xs text-gray-500">{course.enrolled} students enrolled</p>
        </div>
        {isEnrolled ? (
          <Button variant="outline" className="border-web3-primary text-web3-primary hover:bg-web3-primary hover:text-white">
            <Award className="w-4 h-4 mr-2" />
            Continue
          </Button>
        ) : (
          <Button 
            className="bg-web3-gradient hover:brightness-110 transition-all text-white"
            onClick={() => onEnroll(course.id)}
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Enroll
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
