
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from 'date-fns';

interface Cheer {
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
  cheers: Cheer[];
}

const ActiveCheers: React.FC<ActiveCheersProps> = ({ cheers }) => {
  return (
    <Card className="border-web3-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Your Active Cheers</span>
        </CardTitle>
        <CardDescription>
          Track the status of your active cheers
        </CardDescription>
      </CardHeader>
      <CardContent>
        {cheers.length > 0 ? (
          <div className="space-y-4">
            {cheers.map((cheer) => (
              <div 
                key={cheer.id} 
                className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{cheer.studentName}</h4>
                    <p className="text-sm text-gray-600">{cheer.courseName}</p>
                  </div>
                  <Badge 
                    className={`
                      ${cheer.status === 'active' ? 'bg-amber-400 hover:bg-amber-500' : 
                        cheer.status === 'won' ? 'bg-emerald-500 hover:bg-emerald-600' : 
                        'bg-red-500 hover:bg-red-600'} 
                      text-white
                    `}
                  >
                    {cheer.status.charAt(0).toUpperCase() + cheer.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Prediction: <span className="font-medium">
                      {cheer.prediction === 'complete' ? 'Will complete' : 'Will not complete'}
                      {cheer.grade ? ` with ${cheer.grade}` : ''}
                    </span>
                  </span>
                </div>
                
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-600">Amount staked:</span>
                  <span className="eth-icon font-medium">{cheer.amount} ETH</span>
                </div>
                
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-600">Potential return:</span>
                  <span className="eth-icon font-medium">{cheer.potentialReturn.toFixed(4)} ETH</span>
                </div>
                
                <div className="flex justify-between text-sm mt-1 text-gray-500 pt-2 border-t border-gray-100">
                  <span>Odds: {cheer.odds}x</span>
                  <span>{formatDistanceToNow(new Date(cheer.timestamp))} ago</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <p>You don't have any active cheers yet.</p>
            <p className="text-sm mt-1">Start cheering on students to see them here!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActiveCheers;
