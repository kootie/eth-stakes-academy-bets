
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Circle, CircleCheck, CircleX } from "lucide-react";

interface CheerData {
  id: string;
  studentName: string;
  courseName: string;
  prediction: "complete" | "incomplete";
  amount: number;
  grade?: string;
  odds: number;
  potentialReturn: number;
  status: "active" | "won" | "lost";
  timestamp: string;
}

interface ActiveCheersProps {
  cheers: CheerData[];
}

const ActiveCheers: React.FC<ActiveCheersProps> = ({ cheers }) => {
  if (cheers.length === 0) {
    return (
      <Card className="border-web3-primary/20">
        <CardHeader>
          <CardTitle>Active Cheers</CardTitle>
          <CardDescription>Cheers you've placed on student outcomes</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-8">No active cheers yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-web3-primary/20">
      <CardHeader>
        <CardTitle>Active Cheers</CardTitle>
        <CardDescription>Cheers you've placed on student outcomes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cheers.map((cheer) => (
            <Card key={cheer.id} className="overflow-hidden border-gray-200">
              <div className="border-l-4 border-web3-primary p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{cheer.studentName}</h4>
                    <p className="text-sm text-gray-600">{cheer.courseName}</p>
                  </div>
                  {cheer.status === "active" && (
                    <Badge className="bg-web3-primary/70 hover:bg-web3-primary">
                      <Circle className="w-3 h-3 mr-1 animate-pulse" />
                      Active
                    </Badge>
                  )}
                  {cheer.status === "won" && (
                    <Badge className="bg-green-500 hover:bg-green-600">
                      <CircleCheck className="w-3 h-3 mr-1" />
                      Won
                    </Badge>
                  )}
                  {cheer.status === "lost" && (
                    <Badge className="bg-red-500 hover:bg-red-600">
                      <CircleX className="w-3 h-3 mr-1" />
                      Lost
                    </Badge>
                  )}
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Prediction:</span>
                  <span className="font-medium">
                    {cheer.prediction === "complete" ? (
                      <>Will complete {cheer.grade && `(Grade: ${cheer.grade})`}</>
                    ) : (
                      <>Will not complete</>
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Amount:</span>
                  <span className="eth-icon font-medium">{cheer.amount} ETH</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Potential Return:</span>
                  <span className="eth-icon font-medium">{cheer.potentialReturn.toFixed(4)} ETH</span>
                </div>
                
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Placed on:</span>
                  <span>{new Date(cheer.timestamp).toLocaleDateString()}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveCheers;
