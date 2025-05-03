
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserProfile as UserProfileType } from '@/data/mockData';

interface UserProfileProps {
  user: UserProfileType;
  enrolledCourseTitles: string[];
}

const UserProfile: React.FC<UserProfileProps> = ({ user, enrolledCourseTitles }) => {
  // Format the wallet address for display
  const displayAddress = user.walletAddress.length > 10 
    ? `${user.walletAddress.substring(0, 6)}...${user.walletAddress.substring(user.walletAddress.length - 4)}`
    : user.walletAddress;
  
  return (
    <Card className="border-web3-primary/20">
      <CardHeader className="pb-2">
        <CardTitle>Student Profile</CardTitle>
        <CardDescription>Your learning journey</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-web3-primary text-white">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="text-center">
            <h3 className="text-lg font-medium">{user.name}</h3>
            <p className="text-sm text-gray-500">{displayAddress}</p>
          </div>
          
          <div className="flex items-center justify-center space-x-2 px-3 py-1 bg-web3-primary/10 rounded-full">
            <div className="h-3 w-3 bg-web3-success rounded-full animate-pulse"></div>
            <span className="eth-icon text-sm">{user.stakingBalance} ETH staked</span>
          </div>
          
          <div className="w-full">
            <h4 className="text-sm font-medium mb-2">Enrolled Courses</h4>
            {enrolledCourseTitles.length > 0 ? (
              <div className="space-y-2">
                {enrolledCourseTitles.map((courseTitle, index) => (
                  <div key={index} className="bg-gray-50 p-2 rounded-md">
                    <p className="text-sm">{courseTitle}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No courses enrolled yet</p>
            )}
          </div>
          
          <div className="w-full">
            <div className="flex justify-between mb-2">
              <h4 className="text-sm font-medium">Your Achievements</h4>
              <span className="text-xs text-gray-500">{user.completedCourses.length} completed</span>
            </div>
            
            {user.completedCourses.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-web3-primary hover:bg-web3-primary text-white">Course Completed</Badge>
                <Badge className="bg-web3-secondary hover:bg-web3-secondary text-white">Top Performer</Badge>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Complete courses to earn achievements</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
