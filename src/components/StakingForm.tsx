
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface StakingFormProps {
  courseTitle: string;
  minimumStake: number;
  onStake: (amount: number) => void;
}

const StakingForm: React.FC<StakingFormProps> = ({ courseTitle, minimumStake, onStake }) => {
  const [amount, setAmount] = useState<number>(minimumStake);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleStake = () => {
    if (amount < minimumStake) {
      toast({
        title: "Invalid stake amount",
        description: `Minimum stake for this course is ${minimumStake} ETH`,
        variant: "destructive",
      });
      return;
    }
    
    onStake(amount);
    toast({
      title: "Stake successful!",
      description: `You have staked ${amount} ETH for ${courseTitle}`,
    });
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-web3-gradient hover:brightness-110 transition-all text-white">
          Stake to Enroll
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Stake ETH for Course</DialogTitle>
          <DialogDescription>
            Stake ETH to enroll in "{courseTitle}". You'll recover your stake upon successful completion.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="stake-amount" className="text-right text-sm">
              Amount (ETH)
            </label>
            <div className="col-span-3 relative">
              <Input
                id="stake-amount"
                type="number"
                value={amount}
                min={minimumStake}
                step={0.01}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="pr-12"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                ETH
              </div>
            </div>
          </div>
          <div className="col-span-4 mt-2">
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="pt-4 pb-2">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> Your stake will be locked until you complete the course. 
                  You'll earn it back upon successful completion, with potential rewards from others' bets.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button 
            className="bg-web3-gradient hover:brightness-110 transition-all text-white"
            onClick={handleStake}
          >
            Confirm Stake
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StakingForm;
