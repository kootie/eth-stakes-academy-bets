
// Mock data for the Technical Skills for Industry platform

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  modules: number;
  stakingAmount: number;
  enrolled: number;
  tags: string[];
  image: string;
  difficulty: "Foundation" | "Intermediate" | "Advanced" | "Professional";
  prerequisites?: string[];
  courseNumber: number; // Sequential course number 1-10
  category: "Electrical" | "Plumbing" | "Mechanics" | "Engineering" | "Metalwork";
}

export interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  courseId: string;
  type: "theory" | "hands-on" | "ai-training" | "blockchain" | "assessment" | "project";
  attendanceRequired: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  walletAddress: string;
  avatar: string;
  stakingBalance: number;
  enrolledCourses: string[];
  completedCourses: string[];
  attendanceRecord: { [courseId: string]: number }; // percentage attendance
  currentCourseNumber: number; // Sequential progression
}

// Sequential Technical Skills Courses (1-10)
export const mockCourses: Course[] = [
  {
    id: "1",
    courseNumber: 1,
    category: "Electrical",
    title: "Course 1: Electrical Fundamentals & Safety",
    description: "Foundation course covering electrical safety, basic circuits, and AI-powered diagnostic tools. Essential starting point for all technical trades.",
    duration: "8 weeks",
    modules: 12,
    stakingAmount: 0.5,
    enrolled: 245,
    difficulty: "Foundation",
    tags: ["Safety", "Basic Circuits", "AI Diagnostics", "OSHA"],
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: "2",
    courseNumber: 2,
    category: "Plumbing",
    title: "Course 2: Plumbing Systems & Smart Sensors",
    description: "Water systems, pipe fitting, and IoT sensor integration for leak detection and flow monitoring.",
    duration: "10 weeks",
    modules: 15,
    stakingAmount: 0.6,
    enrolled: 198,
    difficulty: "Foundation",
    tags: ["Water Systems", "IoT Sensors", "Leak Detection", "Installation"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1470&auto=format&fit=crop",
    prerequisites: ["Course 1: Electrical Fundamentals & Safety"]
  },
  {
    id: "3",
    courseNumber: 3,
    category: "Mechanics",
    title: "Course 3: Mechanical Systems & AI Diagnostics",
    description: "Engine fundamentals, hydraulics, and AI-powered diagnostic tools for predictive maintenance.",
    duration: "12 weeks",
    modules: 18,
    stakingAmount: 0.7,
    enrolled: 167,
    difficulty: "Intermediate",
    tags: ["Engines", "Hydraulics", "Predictive Maintenance", "AI Tools"],
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1470&auto=format&fit=crop",
    prerequisites: ["Course 1", "Course 2"]
  },
  {
    id: "4",
    courseNumber: 4,
    category: "Engineering",
    title: "Course 4: Blueprint Reading & CAD Systems",
    description: "Technical drawing interpretation, CAD software, and AI-assisted design optimization for industrial applications.",
    duration: "10 weeks",
    modules: 16,
    stakingAmount: 0.8,
    enrolled: 134,
    difficulty: "Intermediate",
    tags: ["Blueprints", "CAD", "Design", "AI Optimization"],
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1470&auto=format&fit=crop",
    prerequisites: ["Course 1", "Course 2", "Course 3"]
  },
  {
    id: "5",
    courseNumber: 5,
    category: "Metalwork",
    title: "Course 5: Welding & Fabrication Fundamentals",
    description: "Welding techniques, metal fabrication, and blockchain quality tracking for certification and project history.",
    duration: "14 weeks",
    modules: 20,
    stakingAmount: 0.9,
    enrolled: 112,
    difficulty: "Intermediate",
    tags: ["Welding", "Fabrication", "Quality Control", "Blockchain Tracking"],
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1470&auto=format&fit=crop",
    prerequisites: ["Course 1", "Course 2", "Course 3", "Course 4"]
  },
  {
    id: "6",
    courseNumber: 6,
    category: "Electrical",
    title: "Course 6: Advanced Electrical & Smart Grid Systems",
    description: "Industrial electrical systems, smart grid technology, and blockchain-based energy management for AI data centers.",
    duration: "12 weeks",
    modules: 18,
    stakingAmount: 1.0,
    enrolled: 89,
    difficulty: "Advanced",
    tags: ["Smart Grid", "Industrial Systems", "Energy Management", "AI Infrastructure"],
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1470&auto=format&fit=crop",
    prerequisites: ["Course 1", "Course 2", "Course 3", "Course 4", "Course 5"]
  },
  {
    id: "7",
    courseNumber: 7,
    category: "Mechanics",
    title: "Course 7: Robotics & Automated Systems Maintenance",
    description: "Robotic system maintenance, AI troubleshooting, and blockchain maintenance logs for industrial automation.",
    duration: "16 weeks",
    modules: 24,
    stakingAmount: 1.1,
    enrolled: 76,
    difficulty: "Advanced",
    tags: ["Robotics", "Automation", "AI Troubleshooting", "Maintenance"],
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1470&auto=format&fit=crop",
    prerequisites: ["Course 1", "Course 2", "Course 3", "Course 4", "Course 5", "Course 6"]
  },
  {
    id: "8",
    courseNumber: 8,
    category: "Engineering",
    title: "Course 8: AI System Infrastructure & Cooling",
    description: "Specialized training for maintaining AI data center infrastructure, cooling systems, and power management.",
    duration: "14 weeks",
    modules: 22,
    stakingAmount: 1.2,
    enrolled: 64,
    difficulty: "Advanced",
    tags: ["AI Infrastructure", "Data Centers", "Cooling Systems", "Power Management"],
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1470&auto=format&fit=crop",
    prerequisites: ["Course 1", "Course 2", "Course 3", "Course 4", "Course 5", "Course 6", "Course 7"]
  },
  {
    id: "9",
    courseNumber: 9,
    category: "Metalwork",
    title: "Course 9: Precision Manufacturing & Quality Systems",
    description: "Advanced manufacturing techniques, AI-driven quality control, and blockchain supply chain verification.",
    duration: "16 weeks",
    modules: 26,
    stakingAmount: 1.3,
    enrolled: 52,
    difficulty: "Professional",
    tags: ["Precision Manufacturing", "Quality Control", "Supply Chain", "Advanced AI"],
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1470&auto=format&fit=crop",
    prerequisites: ["Course 1", "Course 2", "Course 3", "Course 4", "Course 5", "Course 6", "Course 7", "Course 8"]
  },
  {
    id: "10",
    courseNumber: 10,
    category: "Engineering",
    title: "Course 10: Technical Leadership & Project Management",
    description: "Capstone course covering project management, team leadership, blockchain project tracking, and AI-assisted decision making.",
    duration: "18 weeks",
    modules: 30,
    stakingAmount: 1.5,
    enrolled: 43,
    difficulty: "Professional",
    tags: ["Leadership", "Project Management", "Team Building", "Advanced Systems"],
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1470&auto=format&fit=crop",
    prerequisites: ["Course 1", "Course 2", "Course 3", "Course 4", "Course 5", "Course 6", "Course 7", "Course 8", "Course 9"]
  }
];

// Mock Modules for Course 1: Electrical Fundamentals
export const mockModules: Module[] = [
  {
    id: "m1",
    title: "Safety Protocols & OSHA Standards",
    description: "Essential safety protocols, personal protective equipment, and OSHA compliance for electrical work.",
    duration: "4 hours",
    completed: true,
    courseId: "1",
    type: "theory",
    attendanceRequired: true
  },
  {
    id: "m2",
    title: "Basic Circuit Theory",
    description: "Understanding voltage, current, resistance, and power calculations with hands-on experiments.",
    duration: "6 hours",
    completed: true,
    courseId: "1",
    type: "hands-on",
    attendanceRequired: true
  },
  {
    id: "m3",
    title: "AI Diagnostic Tools Training",
    description: "Learning to use AI-powered multimeters and diagnostic equipment for electrical troubleshooting.",
    duration: "4 hours",
    completed: false,
    courseId: "1",
    type: "ai-training",
    attendanceRequired: true
  },
  {
    id: "m4",
    title: "Blockchain Certification System",
    description: "Understanding how blockchain technology tracks certifications, work history, and skill verification.",
    duration: "3 hours",
    completed: false,
    courseId: "1",
    type: "blockchain",
    attendanceRequired: false
  },
  {
    id: "m5",
    title: "Practical Wiring Assessment",
    description: "Hands-on assessment of basic wiring skills with AI-powered quality evaluation.",
    duration: "5 hours",
    completed: false,
    courseId: "1",
    type: "assessment",
    attendanceRequired: true
  },
  {
    id: "m6",
    title: "Smart Home Installation Project",
    description: "Complete project installing smart electrical systems with IoT integration and blockchain logging.",
    duration: "8 hours",
    completed: false,
    courseId: "1",
    type: "project",
    attendanceRequired: true
  }
];

// Mock User Profile with attendance tracking
export const mockUser: UserProfile = {
  id: "u1",
  name: "Jordan Martinez",
  walletAddress: "0x1234...5678",
  avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Jordan",
  stakingBalance: 3.2,
  enrolledCourses: ["1"],
  completedCourses: [],
  attendanceRecord: {
    "1": 85 // 85% attendance in course 1
  },
  currentCourseNumber: 1
};
