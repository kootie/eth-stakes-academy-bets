
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

  // Get next available course based on sequential progression
  const getNextAvailableCourse = () => {
    return mockCourses.find(course => course.courseNumber === user.currentCourseNumber);
  };

  const handleEnroll = (courseId: string) => {
    const course = mockCourses.find(c => c.id === courseId);
    if (course) {
      // Check if course is in sequence
      if (course.courseNumber !== user.currentCourseNumber) {
        toast({
          title: "Course sequence required",
          description: `You must complete courses in order. Next course: Course ${user.currentCourseNumber}`,
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Ready to enroll",
        description: `Click stake to enroll in ${course.title}`,
      });
    }
  };

  const handleStake = (courseId: string, amount: number) => {
    const updatedUser = { 
      ...user, 
      stakingBalance: user.stakingBalance - amount,
      enrolledCourses: [...user.enrolledCourses, courseId]
    };
    
    setUser(updatedUser);
    
    toast({
      title: "Enrollment successful!",
      description: "Your stake will be refunded based on attendance and completion.",
    });
  };

  const handleBet = (prediction: "complete" | "incomplete", amount: number, grade?: string) => {
    toast({
      title: "Cheer placed",
      description: `You've cheered with ${amount} ETH. Supporting student success!`,
    });

    const newCheer = {
      id: `cheer-${Date.now()}`,
      studentName: "Alex Rodriguez",
      courseName: "Course 1: Electrical Fundamentals & Safety",
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

  const nextCourse = getNextAvailableCourse();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="web3-gradient-text">Technical Skills for Industry</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Master essential technical trades through a sequential 10-course program. 
            Learn plumbing, electrical, mechanics, engineering, and metalwork enhanced with AI and blockchain technology. 
            Build the skills needed to maintain tomorrow's industrial and AI systems.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-8">
            <span className="flex items-center">
              <div className="w-2 h-2 bg-web3-primary rounded-full mr-2"></div>
              Sequential Learning Path
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-web3-secondary rounded-full mr-2"></div>
              AI-Enhanced Training
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-web3-success rounded-full mr-2"></div>
              Blockchain Certified
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-web3-warning rounded-full mr-2"></div>
              Family & Community Support
            </span>
          </div>
        </section>

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
                <TabsTrigger value="courses">Course Sequence</TabsTrigger>
                <TabsTrigger value="staking">Enrollment</TabsTrigger>
                <TabsTrigger value="cheering">Family Support</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard" id="dashboard" className="space-y-6">
                <section>
                  <h2 className="text-2xl font-bold mb-4">Your Learning Journey</h2>
                  {wallet.isConnected && user.enrolledCourses.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      <CurriculumView 
                        modules={modules} 
                        courseName="Course 1: Electrical Fundamentals & Safety" 
                        onModuleComplete={handleModuleComplete} 
                      />
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="font-medium text-blue-900 mb-2">Attendance & Payment</h3>
                        <p className="text-sm text-blue-800">
                          Your stake refund is based on course completion and attendance. Current attendance: {user.attendanceRecord["1"] || 0}%
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white p-6 rounded-lg shadow text-center">
                      <h3 className="text-xl font-medium mb-2">Start Your Technical Career</h3>
                      <p className="mb-4">Begin with Course 1 and progress through our 10-course sequence to master industrial skills.</p>
                      {nextCourse && (
                        <StakingForm 
                          courseTitle={nextCourse.title} 
                          courseId={nextCourse.id}
                          minimumStake={nextCourse.stakingAmount} 
                          onStake={handleStake} 
                        />
                      )}
                    </div>
                  )}
                </section>
                
                <section>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Course Progression</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockCourses.slice(0, 4).map(course => (
                      <CourseCard key={course.id} course={course} onEnroll={handleEnroll} />
                    ))}
                  </div>
                </section>
              </TabsContent>
              
              <TabsContent value="courses" id="courses">
                <section>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">10-Course Technical Sequence</h2>
                  </div>
                  <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-sm text-amber-800">
                      <strong>Sequential Learning:</strong> Courses must be completed in order (1-10). 
                      Each course builds on previous knowledge and skills.
                    </p>
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
                    <h2 className="text-2xl font-bold mb-4">Course Enrollment</h2>
                    <div className="bg-white p-6 rounded-lg shadow">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Your Stakes</h3>
                        <span className="eth-icon font-medium">{user.stakingBalance} ETH</span>
                      </div>
                      
                      <div className="space-y-4 mt-6">
                        <h4 className="text-md font-medium">Enrolled Courses</h4>
                        {user.enrolledCourses.length > 0 ? (
                          <div className="space-y-2">
                            {enrolledCourses.map(course => (
                              <div key={course.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                                <div>
                                  <span className="font-medium">{course.title}</span>
                                  <p className="text-xs text-gray-500">
                                    Attendance: {user.attendanceRecord[course.id] || 0}%
                                  </p>
                                </div>
                                <span className="eth-icon">{course.stakingAmount} ETH</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">No enrolled courses</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Available for Enrollment</h2>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <h3 className="font-medium text-blue-900 mb-2">Payment & Refund Policy</h3>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Stake ETH to enroll in courses</li>
                        <li>• Refunds based on course completion (70%) and attendance (30%)</li>
                        <li>• Minimum 80% attendance required for full refund</li>
                        <li>• Community cheering provides additional rewards</li>
                      </ul>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {mockCourses.slice(user.currentCourseNumber - 1, user.currentCourseNumber + 2).map(course => (
                        <CourseCard key={course.id} course={course} onEnroll={handleEnroll} />
                      ))}
                    </div>
                  </div>
                </section>
              </TabsContent>
              
              <TabsContent value="cheering" id="cheering">
                <section className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">Family & Community Support</h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-medium mb-4">Cheer a Student</h3>
                      <BettingInterface 
                        course={mockCourses[0]} 
                        studentName="Jordan Martinez" 
                        onPlaceBet={handleBet} 
                      />
                    </div>
                    
                    <div>
                      <ActiveCheers cheers={activeCheers} />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                    <h3 className="text-xl font-medium mb-4">Supporting Technical Education</h3>
                    <div className="space-y-4 text-sm">
                      <p className="text-gray-700">
                        Family, friends, and community members can support students by placing "cheers" - 
                        bets on their success in technical training programs.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start space-x-3">
                          <div className="h-3 w-3 bg-web3-primary rounded-full mt-1"></div>
                          <span className="text-gray-700">
                            <strong>Motivate Students:</strong> Financial backing creates accountability and motivation
                          </span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="h-3 w-3 bg-web3-secondary rounded-full mt-1"></div>
                          <span className="text-gray-700">
                            <strong>Earn Returns:</strong> Successful students generate returns for supporters
                          </span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="h-3 w-3 bg-web3-success rounded-full mt-1"></div>
                          <span className="text-gray-700">
                            <strong>Build Workforce:</strong> Community investment in skilled trades training
                          </span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="h-3 w-3 bg-web3-warning rounded-full mt-1"></div>
                          <span className="text-gray-700">
                            <strong>Verified Results:</strong> Blockchain tracking of attendance and completion
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <footer className="bg-web3-dark text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold web3-gradient-text mb-4">Technical Skills for Industry</h2>
              <p className="text-gray-400 mb-4">
                Preparing skilled technicians for the AI-driven industrial future. 
                Sequential 10-course program combining traditional trades with cutting-edge technology.
              </p>
              <div className="flex space-x-4 text-sm">
                <span className="bg-web3-primary/20 px-3 py-1 rounded">Sequential Learning</span>
                <span className="bg-web3-secondary/20 px-3 py-1 rounded">AI-Enhanced</span>
                <span className="bg-web3-success/20 px-3 py-1 rounded">Family Supported</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Course Categories</h3>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>Electrical Systems</li>
                <li>Plumbing & Hydraulics</li>
                <li>Mechanical Systems</li>
                <li>Engineering & CAD</li>
                <li>Metalwork & Fabrication</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Support System</h3>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>Family Cheering</li>
                <li>Community Investment</li>
                <li>Attendance Tracking</li>
                <li>Performance Rewards</li>
                <li>Career Placement</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Technical Skills for Industry. Building tomorrow's skilled workforce today.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
