
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Course } from '@/data/mockData';
import { useToast } from "@/hooks/use-toast";
import { useWalletContext } from '@/contexts/WalletContext';
import { Wallet, Cheering } from "lucide-react";

interface BettingInterfaceProps {
  course: Course;
  studentName: string;
  onPlaceBet: (prediction: "complete" | "incomplete", amount: number, grade?: string) => void;
}

const BettingInterface: React.FC<BettingInterfaceProps> = ({ course, studentName, onPlaceBet }) => {
  const [prediction, setPrediction] = useState<"complete" | "incomplete">("complete");
  const [amount, setAmount] = useState<number>(0.1);
  const [grade, setGrade] = useState<string>("");
  const [isPlacingBet, setIsPlacingBet] = useState(false);
  const { toast } = useToast();
  const { wallet, connectWallet } = useWalletContext();
  
  const handleBetSubmit = async () => {
    if (amount <= 0) {
      toast({
        title: "Invalid cheer amount",
        description: "Please enter a valid amount to cheer with",
        variant: "destructive",
      });
      return;
    }

    if (!wallet.isConnected) {
      const connected = await connectWallet();
      if (!connected) return;
    }

    if (parseFloat(wallet.balance) < amount) {
      toast({
        title: "Insufficient funds",
        description: `You need at least ${amount} ETH to place this cheer`,
        variant: "destructive",
      });
      return;
    }

    setIsPlacingBet(true);

    try {
      // In a real application, this would be a blockchain transaction
      // Simulating transaction time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onPlaceBet(prediction, amount, prediction === "complete" ? grade : undefined);
      
      toast({
        title: "Cheer placed successfully!",
        description: `You cheered ${amount} ETH that ${studentName} will ${prediction === 'complete' ? 'complete' : 'not complete'} the course${grade ? ` with a grade of ${grade}` : ''}`,
      });
    } catch (error) {
      console.error("Error placing bet:", error);
      toast({
        title: "Failed to place cheer",
        description: "There was an error processing your cheer",
        variant: "destructive",
      });
    } finally {
      setIsPlacingBet(false);
    }
  };

  // Calculate potential returns based on odds (this would be more complex in a real app)
  const odds = prediction === "complete" ? 1.5 : 2.5;
  const potentialReturn = amount * odds;
  
  return (
    <Card className="border-web3-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Cheering className="h-5 w-5 text-web3-primary" />
          <span>Place a Cheer</span>
        </CardTitle>
        <CardDescription>
          Cheer on whether {studentName} will complete "{course.title}"
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
            <Label htmlFor="bet-amount">Cheer Amount (ETH)</Label>
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
            {wallet.isConnected && (
              <div className="flex justify-between mt-1 pt-2 border-t border-gray-200">
                <span className="text-gray-600">Your Balance:</span>
                <span className="font-medium eth-icon">{wallet.balance} ETH</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-web3-gradient hover:brightness-110 transition-all text-white"
          onClick={handleBetSubmit}
          disabled={isPlacingBet}
        >
          {!wallet.isConnected ? (
            <>
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet to Cheer
            </>
          ) : isPlacingBet ? (
            "Processing..."
          ) : (
            <>
              <Cheering className="mr-2 h-4 w-4" />
              Place Cheer
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BettingInterface;
