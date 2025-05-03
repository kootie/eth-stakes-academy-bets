
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Course } from '@/data/mockData';
import { useToast } from "@/components/ui/use-toast";

interface BettingInterfaceProps {
  course: Course;
  studentName: string;
  onPlaceBet: (prediction: "complete" | "incomplete", amount: number, grade?: string) => void;
}

const BettingInterface: React.FC<BettingInterfaceProps> = ({ course, studentName, onPlaceBet }) => {
  const [prediction, setPrediction] = useState<"complete" | "incomplete">("complete");
  const [amount, setAmount] = useState<number>(0.1);
  const [grade, setGrade] = useState<string>("");
  const { toast } = useToast();
  
  const handleBetSubmit = () => {
    if (amount <= 0) {
      toast({
        title: "Invalid bet amount",
        description: "Please enter a valid amount to bet",
        variant: "destructive",
      });
      return;
    }
    
    onPlaceBet(prediction, amount, prediction === "complete" ? grade : undefined);
    
    toast({
      title: "Bet placed successfully!",
      description: `You bet ${amount} ETH that ${studentName} will ${prediction === 'complete' ? 'complete' : 'not complete'} the course${grade ? ` with a grade of ${grade}` : ''}`,
    });
  };

  // Calculate potential returns based on odds (this would be more complex in a real app)
  const odds = prediction === "complete" ? 1.5 : 2.5;
  const potentialReturn = amount * odds;
  
  return (
    <Card className="border-web3-primary/20">
      <CardHeader>
        <CardTitle>Place a Bet</CardTitle>
        <CardDescription>
          Bet on whether {studentName} will complete "{course.title}"
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Your Prediction</Label>
            <RadioGroup defaultValue="complete" className="flex flex-col space-y-2 mt-2" onValueChange={(val) => setPrediction(val as "complete" | "incomplete")}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="complete" id="complete" />
                <Label htmlFor="complete">Will complete the course</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="incomplete" id="incomplete" />
                <Label htmlFor="incomplete">Will NOT complete the course</Label>
              </div>
            </RadioGroup>
          </div>
          
          {prediction === "complete" && (
            <div className="space-y-2">
              <Label>Predicted Grade</Label>
              <Select onValueChange={setGrade}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A (90-100%)</SelectItem>
                  <SelectItem value="B">B (80-89%)</SelectItem>
                  <SelectItem value="C">C (70-79%)</SelectItem>
                  <SelectItem value="D">D (60-69%)</SelectItem>
                  <SelectItem value="F">F (Below 60%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="bet-amount">Bet Amount (ETH)</Label>
            <div className="relative">
              <Input
                id="bet-amount"
                type="number"
                value={amount}
                min={0.01}
                step={0.01}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="pr-12"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                ETH
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Odds:</span>
              <span className="font-medium">{odds}x</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-gray-600">Potential Return:</span>
              <span className="font-medium eth-icon">{potentialReturn.toFixed(4)} ETH</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-web3-gradient hover:brightness-110 transition-all text-white"
          onClick={handleBetSubmit}
        >
          Place Bet
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BettingInterface;
