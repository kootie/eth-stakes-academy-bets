
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Module } from '@/data/mockData';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Clock, Award, Wrench, BookOpen, Brain, Shield, Users } from 'lucide-react';

interface CurriculumViewProps {
  modules: Module[];
  courseName: string;
  onModuleComplete: (moduleId: string, isComplete: boolean) => void;
}

const CurriculumView: React.FC<CurriculumViewProps> = ({ modules, courseName, onModuleComplete }) => {
  const totalModules = modules.length;
  const completedModules = modules.filter(module => module.completed).length;
  const progressPercentage = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;
  
  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'hands-on': return <Wrench className="h-4 w-4 text-orange-600" />;
      case 'project': return <Award className="h-4 w-4 text-purple-600" />;
      case 'assessment': return <Shield className="h-4 w-4 text-blue-600" />;
      case 'ai-training': return <Brain className="h-4 w-4 text-pink-600" />;
      case 'blockchain': return <Users className="h-4 w-4 text-indigo-600" />;
      default: return <BookOpen className="h-4 w-4 text-green-600" />;
    }
  };
  
  const getModuleTypeLabel = (type: string) => {
    switch (type) {
      case 'hands-on': return 'Hands-On Lab';
      case 'project': return 'Capstone Project';
      case 'assessment': return 'Skills Assessment';
      case 'ai-training': return 'AI Training';
      case 'blockchain': return 'Blockchain Module';
      default: return 'Theory Lesson';
    }
  };
  
  const getModuleTypeBadge = (type: string) => {
    switch (type) {
      case 'hands-on': return 'bg-orange-100 text-orange-800';
      case 'project': return 'bg-purple-100 text-purple-800';
      case 'assessment': return 'bg-blue-100 text-blue-800';
      case 'ai-training': return 'bg-pink-100 text-pink-800';
      case 'blockchain': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-green-100 text-green-800';
    }
  };
  
  return (
    <Card className="border-web3-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-web3-primary" />
          Course Curriculum
        </CardTitle>
        <CardDescription>{courseName} - {modules.length} Modules</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Learning Progress</span>
            <span>{completedModules} of {totalModules} modules completed</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Keep going! Building essential technical skills.</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
        </div>
        
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-xs text-amber-800">
            <strong>Attendance Policy:</strong> Modules marked with 🏫 require in-person attendance. 
            Online modules can be completed remotely. Attendance affects your stake refund.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {modules.map((module, index) => (
            <AccordionItem key={module.id} value={module.id}>
              <AccordionTrigger className="hover:bg-gray-50 px-3 rounded-md">
                <div className="flex items-center space-x-4 w-full">
                  <div className={`flex items-center h-8 w-8 rounded-full justify-center font-medium ${
                    module.completed 
                      ? 'bg-web3-success text-white' 
                      : 'bg-web3-primary/10 text-web3-primary'
                  }`}>
                    {module.completed ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center space-x-2">
                      {getModuleIcon(module.type)}
                      <span className="font-medium">{module.title}</span>
                      {module.attendanceRequired && (
                        <span className="text-xs">🏫</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded ${getModuleTypeBadge(module.type)}`}>
                        {getModuleTypeLabel(module.type)}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {module.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="space-y-4 px-3">
                  <p className="text-gray-600 text-sm leading-relaxed">{module.description}</p>
                  
                  {module.type === 'hands-on' && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <p className="text-sm text-orange-800">
                        <strong>🔧 Hands-On Lab:</strong> This module requires physical attendance and hands-on work with tools and equipment. 
                        Safety gear and materials will be provided.
                      </p>
                    </div>
                  )}
                  
                  {module.type === 'ai-training' && (
                    <div className="bg-pink-50 border border-pink-200 rounded-lg p-3">
                      <p className="text-sm text-pink-800">
                        <strong>🧠 AI Training:</strong> Learn to use AI-powered tools and diagnostic equipment. 
                        This module prepares you for modern industrial maintenance.
                      </p>
                    </div>
                  )}
                  
                  {module.type === 'blockchain' && (
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                      <p className="text-sm text-indigo-800">
                        <strong>⛓️ Blockchain Module:</strong> Understanding how blockchain technology tracks certifications, 
                        work history, and quality standards in modern industry.
                      </p>
                    </div>
                  )}
                  
                  {module.type === 'project' && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                      <p className="text-sm text-purple-800">
                        <strong>🏆 Capstone Project:</strong> Apply all learned skills in a comprehensive project. 
                        This demonstrates your readiness for professional work.
                      </p>
                    </div>
                  )}
                  
                  {module.attendanceRequired && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-800">
                        <strong>🏫 Attendance Required:</strong> This module requires in-person attendance. 
                        Missing this session may affect your final grade and stake refund.
                      </p>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`complete-${module.id}`}
                        checked={module.completed}
                        onCheckedChange={(checked) => onModuleComplete(module.id, checked as boolean)}
                      />
                      <label htmlFor={`complete-${module.id}`} className="text-sm cursor-pointer">
                        Mark as completed
                      </label>
                    </div>
                    {!module.completed && (
                      <span className="text-xs text-gray-400">
                        {module.attendanceRequired ? 'Attendance required' : 'Online available'}
                      </span>
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default CurriculumView;
