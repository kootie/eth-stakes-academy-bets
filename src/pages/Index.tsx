
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';
import StakingForm from '@/components/StakingForm';
import BettingInterface from '@/components/BettingInterface';
import CurriculumView from '@/components/CurriculumView';
import UserProfile from '@/components/UserProfile';
import ActiveCheers from '@/components/ActiveCheers';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockCourses, mockModules, mockUser } from '@/data/mockData';
import { useToast } from "@/hooks/use-toast";
import { useLocation, useNavigate } from 'react-router-dom';
import { useWalletContext } from '@/contexts/WalletContext';

const Index = () => {
  const [modules, setModules] = useState(mockModules);
  const [user, setUser] = useState(mockUser);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeCheers, setActiveCheers] = useState<any[]>([]);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const { wallet } = useWalletContext();

  // Handle hash navigation
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && ['dashboard', 'courses', 'staking', 'cheering'].includes(hash)) {
      setActiveTab(hash);
    }
  }, [location]);

  useEffect(() => {
    // Update user data when wallet changes
    if (wallet.isConnected) {
      setUser((prevUser) => ({
        ...prevUser,
        walletAddress: wallet.address,
        stakingBalance: parseFloat(wallet.balance)
      }));
    }
  }, [wallet]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/#${value}`, { replace: true });
  };

  // Find courses that the user is enrolled in
  const enrolledCourses = mockCourses.filter(course => 
    user.enrolledCourses.includes(course.id)
  );
  
  const enrolledCourseTitles = enrolledCourses.map(course => course.title);

  const handleEnroll = (courseId: string) => {
    // In a real app, this would open the staking dialog
    const course = mockCourses.find(c => c.id === courseId);
    if (course) {
      toast({
        title: "Ready to enroll",
        description: `Click stake to enroll in ${course.title}`,
      });
    }
  };

  const handleStake = (courseId: string, amount: number) => {
    // In a real app, this would connect to a wallet and stake ETH
    const updatedUser = { 
      ...user, 
      stakingBalance: user.stakingBalance - amount,
      enrolledCourses: [...user.enrolledCourses, courseId]
    };
    
    setUser(updatedUser);
  };

  const handleBet = (prediction: "complete" | "incomplete", amount: number, grade?: string) => {
    // In a real app, this would connect to a wallet and place a bet
    toast({
      title: "Cheer placed",
      description: `You've cheered with ${amount} ETH. Good luck!`,
    });

    // Create a new cheer and add it to active cheers
    const newCheer = {
      id: `cheer-${Date.now()}`,
      studentName: "Alex Rodriguez",
      courseName: "Web3 Startup Fundamentals",
      prediction,
      amount,
      grade,
      odds: prediction === "complete" ? 1.5 : 2.5,
      potentialReturn: amount * (prediction === "complete" ? 1.5 : 2.5),
      status: "active",
      timestamp: new Date().toISOString(),
    };

    setActiveCheers([newCheer, ...activeCheers]);
  };

  const handleModuleComplete = (moduleId: string, isComplete: boolean) => {
    const updatedModules = modules.map(module => 
      module.id === moduleId ? { ...module, completed: isComplete } : module
    );
    setModules(updatedModules);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar with user profile */}
          <div className="lg:col-span-1">
            <UserProfile user={user} enrolledCourseTitles={enrolledCourseTitles} />
          </div>
          
          {/* Main content area */}
          <div className="lg:col-span-3">
            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="mb-6">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="courses">All Courses</TabsTrigger>
                <TabsTrigger value="staking">Staking</TabsTrigger>
                <TabsTrigger value="cheering">Cheering</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard" id="dashboard" className="space-y-6">
                <section>
                  <h2 className="text-2xl font-bold mb-4">Your Learning Journey</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {wallet.isConnected && user.enrolledCourses.length > 0 ? (
                      <CurriculumView 
                        modules={modules} 
                        courseName="Web3 Startup Fundamentals" 
                        onModuleComplete={handleModuleComplete} 
                      />
                    ) : (
                      <div className="bg-white p-6 rounded-lg shadow text-center">
                        <h3 className="text-xl font-medium mb-2">Get Started</h3>
                        <p className="mb-4">Enroll in a course to begin your Web3 learning journey.</p>
                        <StakingForm 
                          courseTitle="Web3 Startup Fundamentals" 
                          courseId="1"
                          minimumStake={0.5} 
                          onStake={handleStake} 
                        />
                      </div>
                    )}
                  </div>
                </section>
                
                <section>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Recommended Courses</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockCourses.slice(0, 2).map(course => (
                      <CourseCard key={course.id} course={course} onEnroll={handleEnroll} />
                    ))}
                  </div>
                </section>
              </TabsContent>
              
              <TabsContent value="courses" id="courses">
                <section>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">All Courses</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockCourses.map(course => (
                      <CourseCard key={course.id} course={course} onEnroll={handleEnroll} />
                    ))}
                  </div>
                </section>
              </TabsContent>
              
              <TabsContent value="staking" id="staking">
                <section className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Your Stakes</h2>
                    <div className="bg-white p-6 rounded-lg shadow">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Total Staked</h3>
                        <span className="eth-icon font-medium">{user.stakingBalance} ETH</span>
                      </div>
                      
                      <div className="space-y-4 mt-6">
                        <h4 className="text-md font-medium">Active Stakes</h4>
                        {user.enrolledCourses.length > 0 ? (
                          <div className="space-y-2">
                            {enrolledCourses.map(course => (
                              <div key={course.id} className="flex justify-between bg-gray-50 p-3 rounded-md">
                                <span>{course.title}</span>
                                <span className="eth-icon">{course.stakingAmount} ETH</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">No active stakes</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Stake in a New Course</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {mockCourses.slice(0, 3).map(course => (
                        <CourseCard key={course.id} course={course} onEnroll={handleEnroll} />
                      ))}
                    </div>
                  </div>
                </section>
              </TabsContent>
              
              <TabsContent value="cheering" id="cheering">
                <section className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">Cheering Dashboard</h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-medium mb-4">Cheer a Student</h3>
                      <BettingInterface 
                        course={mockCourses[0]} 
                        studentName="Alex Rodriguez" 
                        onPlaceBet={handleBet} 
                      />
                    </div>
                    
                    <div>
                      <ActiveCheers cheers={activeCheers} />
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-medium mb-4">How Cheering Works</h3>
                    <div className="space-y-4 text-sm">
                      <p>You can cheer students on whether they will complete courses and what grades they'll achieve.</p>
                      <div className="flex space-x-2 items-center">
                        <div className="h-2 w-2 bg-web3-primary rounded-full"></div>
                        <span>If your prediction is correct, you earn returns based on the odds.</span>
                      </div>
                      <div className="flex space-x-2 items-center">
                        <div className="h-2 w-2 bg-web3-primary rounded-full"></div>
                        <span>Students who complete courses earn their stake back plus a share of losing cheers.</span>
                      </div>
                      <div className="flex space-x-2 items-center">
                        <div className="h-2 w-2 bg-web3-primary rounded-full"></div>
                        <span>The platform ensures fair distribution of funds between all participants.</span>
                      </div>
                    </div>
                  </div>
                </section>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <footer className="bg-web3-dark text-white py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold web3-gradient-text">Web3 Academy</h2>
              <p className="text-gray-400 text-sm mt-1">Learn, Stake, Earn</p>
            </div>
            <div className="flex space-x-8">
              <div>
                <h3 className="font-medium mb-2">Platform</h3>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>Courses</li>
                  <li>Staking</li>
                  <li>Cheering</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Resources</h3>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>Documentation</li>
                  <li>Community</li>
                  <li>Support</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Web3 Academy DAO. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
