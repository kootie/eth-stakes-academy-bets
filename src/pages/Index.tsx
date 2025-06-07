
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';
import StakingForm from '@/components/StakingForm';
import BettingInterface from '@/components/BettingInterface';
import CurriculumView from '@/components/CurriculumView';
import UserProfile from '@/components/UserProfile';
import ActiveCheers from '@/components/ActiveCheers';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { mockCourses, mockModules, mockUser } from '@/data/mockData';
import { useToast } from "@/hooks/use-toast";
import { useLocation, useNavigate } from 'react-router-dom';
import { useWalletContext } from '@/contexts/WalletContext';
import { TrendingUp, Users, BookOpen, Award, Target, Clock, CheckCircle } from 'lucide-react';

const Index = () => {
  const [modules, setModules] = useState(mockModules);
  const [user, setUser] = useState(mockUser);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeCheers, setActiveCheers] = useState<any[]>([
    {
      id: "cheer-1",
      studentName: "Alex Rodriguez",
      courseName: "Course 1: Electrical Fundamentals & Safety",
      prediction: "complete",
      amount: 0.1,
      grade: "A",
      odds: 1.5,
      potentialReturn: 0.15,
      status: "active",
      timestamp: new Date().toISOString(),
      cheerGiver: "Mom"
    },
    {
      id: "cheer-2",
      studentName: "Jordan Martinez",
      courseName: "Course 2: Basic Plumbing Systems",
      prediction: "complete",
      amount: 0.05,
      odds: 1.8,
      potentialReturn: 0.09,
      status: "active",
      timestamp: new Date().toISOString(),
      cheerGiver: "Uncle Mike"
    }
  ]);
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
      cheerGiver: "Family"
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

  // Calculate dashboard stats
  const totalStaked = enrolledCourses.reduce((sum, course) => sum + course.stakingAmount, 0);
  const totalCheersReceived = activeCheers.reduce((sum, cheer) => sum + cheer.amount, 0);
  const averageAttendance = enrolledCourses.length > 0 
    ? enrolledCourses.reduce((sum, course) => sum + (user.attendanceRecord[course.id] || 0), 0) / enrolledCourses.length 
    : 0;

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
              <TabsList className="mb-6 grid w-full grid-cols-4">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="staking">Staking</TabsTrigger>
                <TabsTrigger value="cheering">Cheering</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard" id="dashboard" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Staked</CardTitle>
                      <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold eth-icon">{totalStaked} ETH</div>
                      <p className="text-xs text-muted-foreground">
                        Across {enrolledCourses.length} courses
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Community Cheers</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold eth-icon">{totalCheersReceived.toFixed(3)} ETH</div>
                      <p className="text-xs text-muted-foreground">
                        From {activeCheers.length} supporters
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{averageAttendance.toFixed(0)}%</div>
                      <Progress value={averageAttendance} className="mt-2" />
                    </CardContent>
                  </Card>
                </div>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Active Courses</h2>
                  {wallet.isConnected && user.enrolledCourses.length > 0 ? (
                    <div className="space-y-4">
                      {enrolledCourses.map(course => (
                        <Card key={course.id}>
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg">{course.title}</CardTitle>
                                <CardDescription>Course {course.courseNumber} • {course.category}</CardDescription>
                              </div>
                              <Badge className="bg-web3-primary text-white">
                                {user.attendanceRecord[course.id] || 0}% Attendance
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="flex items-center space-x-2">
                                <Target className="h-4 w-4 text-web3-primary" />
                                <span className="text-sm">Staked: <span className="eth-icon font-medium">{course.stakingAmount} ETH</span></span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <BookOpen className="h-4 w-4 text-web3-secondary" />
                                <span className="text-sm">Progress: 65%</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Award className="h-4 w-4 text-web3-success" />
                                <span className="text-sm">Expected Refund: {(course.stakingAmount * 0.85).toFixed(3)} ETH</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      
                      <CurriculumView 
                        modules={modules} 
                        courseName="Course 1: Electrical Fundamentals & Safety" 
                        onModuleComplete={handleModuleComplete} 
                      />
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="text-center py-8">
                        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-medium mb-2">Start Your Technical Journey</h3>
                        <p className="text-gray-600 mb-6">Begin with Course 1 and progress through our sequential program to master industrial skills.</p>
                        {nextCourse && (
                          <StakingForm 
                            courseTitle={nextCourse.title} 
                            courseId={nextCourse.id}
                            minimumStake={nextCourse.stakingAmount} 
                            onStake={handleStake} 
                          />
                        )}
                      </CardContent>
                    </Card>
                  )}
                </section>
              </TabsContent>
              
              <TabsContent value="courses" id="courses">
                <section>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-2xl font-bold">Course Sequence (1-10)</h2>
                      <p className="text-gray-600">Sequential learning path from foundation to professional level</p>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      Next: Course {user.currentCourseNumber}
                    </Badge>
                  </div>
                  
                  <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h3 className="font-medium text-amber-900 mb-2">Learning Path Requirements</h3>
                    <ul className="text-sm text-amber-800 space-y-1">
                      <li>• Courses must be completed in sequential order (1-10)</li>
                      <li>• Each course builds on previous knowledge and skills</li>
                      <li>• Minimum 80% attendance required to progress</li>
                      <li>• AI and blockchain components integrated throughout</li>
                    </ul>
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
                    <h2 className="text-2xl font-bold mb-2">Staking Dashboard</h2>
                    <p className="text-gray-600">Manage your course enrollments and track refund potential</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Your Staking Portfolio</CardTitle>
                        <CardDescription>Current stakes and potential returns</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Available Balance</span>
                          <span className="eth-icon font-bold">{user.stakingBalance} ETH</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Total Staked</span>
                          <span className="eth-icon">{totalStaked} ETH</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Potential Refund</span>
                          <span className="eth-icon text-web3-success">{(totalStaked * 0.85).toFixed(3)} ETH</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Refund Calculation</CardTitle>
                        <CardDescription>Based on attendance and completion</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Course Completion (70%)</span>
                            <span className="font-medium">85%</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Attendance Rate (30%)</span>
                            <span className="font-medium">{averageAttendance.toFixed(0)}%</span>
                          </div>
                          <Progress value={averageAttendance} className="h-2" />
                        </div>
                        <div className="pt-2 border-t">
                          <div className="flex justify-between font-medium">
                            <span>Expected Refund Rate</span>
                            <span className="text-web3-success">85%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4">Enrolled Courses</h3>
                    {enrolledCourses.length > 0 ? (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {enrolledCourses.map(course => (
                          <Card key={course.id}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h4 className="font-medium text-sm">{course.title}</h4>
                                  <p className="text-xs text-gray-500">Course {course.courseNumber}</p>
                                </div>
                                <Badge variant="outline">
                                  {user.attendanceRecord[course.id] || 0}%
                                </Badge>
                              </div>
                              <div className="space-y-2 text-xs">
                                <div className="flex justify-between">
                                  <span>Staked Amount:</span>
                                  <span className="eth-icon">{course.stakingAmount} ETH</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Expected Refund:</span>
                                  <span className="eth-icon text-web3-success">{(course.stakingAmount * 0.85).toFixed(3)} ETH</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Status:</span>
                                  <span className="text-web3-primary">In Progress</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <Card>
                        <CardContent className="text-center py-8">
                          <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600">No active stakes. Enroll in courses to start your journey.</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4">Available for Enrollment</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <h4 className="font-medium text-blue-900 mb-2">Staking & Refund Policy</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Stake ETH to secure your spot in courses</li>
                        <li>• Refunds calculated: 70% completion + 30% attendance</li>
                        <li>• Minimum 80% attendance required for full refund eligibility</li>
                        <li>• Community cheering provides additional motivation and rewards</li>
                        <li>• Blockchain tracking ensures transparent and fair assessment</li>
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
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Community Cheering Dashboard</h2>
                    <p className="text-gray-600">Family and community support for student success</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Cheers Received</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold eth-icon">{totalCheersReceived.toFixed(3)} ETH</div>
                        <p className="text-xs text-muted-foreground">
                          From {activeCheers.length} supporters
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Cheers</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{activeCheers.length}</div>
                        <p className="text-xs text-muted-foreground">
                          Pending outcomes
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Potential Returns</CardTitle>
                        <Award className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold eth-icon">
                          {activeCheers.reduce((sum, cheer) => sum + cheer.potentialReturn, 0).toFixed(3)} ETH
                        </div>
                        <p className="text-xs text-muted-foreground">
                          If all predictions succeed
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
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
                      <h3 className="text-xl font-medium mb-4">Active Community Cheers</h3>
                      <ActiveCheers cheers={activeCheers} />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-4">Detailed Cheer History</h3>
                    <Card>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {activeCheers.map((cheer, index) => (
                            <div key={cheer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3">
                                  <div className="flex-shrink-0">
                                    <div className="h-10 w-10 bg-web3-primary/20 rounded-full flex items-center justify-center">
                                      <Users className="h-5 w-5 text-web3-primary" />
                                    </div>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900">
                                      {cheer.cheerGiver} cheered for {cheer.studentName}
                                    </p>
                                    <p className="text-sm text-gray-500">{cheer.courseName}</p>
                                    <p className="text-xs text-gray-400">
                                      Prediction: {cheer.prediction} • Grade: {cheer.grade || 'Any'}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end space-y-1">
                                <span className="eth-icon text-sm font-medium">{cheer.amount} ETH</span>
                                <span className="text-xs text-web3-success">
                                  Potential: {cheer.potentialReturn.toFixed(3)} ETH
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {cheer.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                    <h3 className="text-xl font-medium mb-4">Supporting Technical Education</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4 text-sm">
                        <p className="text-gray-700">
                          Family, friends, and community members support students by placing "cheers" - 
                          financial backing that creates accountability and motivation for technical training success.
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-web3-primary mt-0.5" />
                            <span className="text-gray-700">
                              <strong>Motivate Students:</strong> Financial backing creates accountability and drives performance
                            </span>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-web3-secondary mt-0.5" />
                            <span className="text-gray-700">
                              <strong>Earn Returns:</strong> Successful students generate returns for their supporters
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-web3-success mt-0.5" />
                          <span className="text-gray-700">
                            <strong>Build Workforce:</strong> Community investment in skilled trades training for the future
                          </span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-web3-warning mt-0.5" />
                          <span className="text-gray-700">
                            <strong>Verified Results:</strong> Blockchain tracking ensures transparent attendance and completion records
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
