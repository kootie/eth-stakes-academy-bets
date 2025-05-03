
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Module } from '@/data/mockData';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface CurriculumViewProps {
  modules: Module[];
  courseName: string;
  onModuleComplete: (moduleId: string, isComplete: boolean) => void;
}

const CurriculumView: React.FC<CurriculumViewProps> = ({ modules, courseName, onModuleComplete }) => {
  const totalModules = modules.length;
  const completedModules = modules.filter(module => module.completed).length;
  const progressPercentage = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;
  
  return (
    <Card className="border-web3-primary/20">
      <CardHeader>
        <CardTitle>Course Curriculum</CardTitle>
        <CardDescription>{courseName} - {modules.length} Modules</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{completedModules} of {totalModules} modules</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {modules.map((module, index) => (
            <AccordionItem key={module.id} value={module.id}>
              <AccordionTrigger className="hover:bg-gray-50 px-2 rounded-md">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center h-8 w-8 rounded-full justify-center bg-web3-primary/10 text-web3-primary font-medium">
                    {index + 1}
                  </div>
                  <span>{module.title}</span>
                  {module.completed && (
                    <span className="ml-2 h-5 w-5 rounded-full bg-web3-success/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-web3-success">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="space-y-4 px-2">
                  <p className="text-gray-600 text-sm">{module.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Duration: {module.duration}</span>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`complete-${module.id}`}
                        checked={module.completed}
                        onCheckedChange={(checked) => onModuleComplete(module.id, checked as boolean)}
                      />
                      <label htmlFor={`complete-${module.id}`}>
                        Mark as completed
                      </label>
                    </div>
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
