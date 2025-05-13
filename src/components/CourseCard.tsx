
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Course } from '@/data/mockData';
import { useWalletContext } from '@/contexts/WalletContext';

interface CourseCardProps {
  course: Course;
  onEnroll: (courseId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll }) => {
  const { wallet } = useWalletContext();
  
  const isEnrolled = wallet.isConnected && Math.random() > 0.7; // Simulated enrollment check
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-web3-primary/20">
      <div className="relative h-48 w-full">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex gap-2 flex-wrap">
            {course.tags.map((tag, index) => (
              <Badge key={index} className="bg-web3-primary/70 hover:bg-web3-primary text-white">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-bold">{course.title}</CardTitle>
        <CardDescription className="text-gray-600">{course.duration} • {course.modules} Modules</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-3">{course.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div>
          <span className="eth-icon text-sm font-medium">{course.stakingAmount} ETH stake</span>
          <p className="text-xs text-gray-500">{course.enrolled} enrolled</p>
        </div>
        {isEnrolled ? (
          <Button variant="outline" className="border-web3-primary text-web3-primary">
            Continue Learning
          </Button>
        ) : (
          <Button 
            className="bg-web3-gradient hover:brightness-110 transition-all text-white"
            onClick={() => onEnroll(course.id)}
          >
            Enroll Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
