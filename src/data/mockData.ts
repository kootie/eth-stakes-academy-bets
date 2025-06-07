
// Mock data for the Technical Skills Academy platform

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
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  prerequisites?: string[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  courseId: string;
  type: "video" | "hands-on" | "assessment" | "project";
}

export interface UserProfile {
  id: string;
  name: string;
  walletAddress: string;
  avatar: string;
  stakingBalance: number;
  enrolledCourses: string[];
  completedCourses: string[];
}

// Mock Courses focused on technical trades
export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Smart Electrical Systems",
    description: "Master electrical work with AI-powered diagnostics and blockchain-verified certifications. Learn wiring, circuit design, and smart home automation systems.",
    duration: "12 weeks",
    modules: 18,
    stakingAmount: 0.8,
    enrolled: 142,
    difficulty: "Intermediate",
    tags: ["Electrical", "Smart Systems", "IoT", "Safety"],
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1470&auto=format&fit=crop",
    prerequisites: ["Basic Electronics"]
  },
  {
    id: "2",
    title: "AI-Enhanced Plumbing",
    description: "Traditional plumbing skills enhanced with smart sensors, leak detection AI, and blockchain maintenance records. Perfect for modern infrastructure.",
    duration: "10 weeks",
    modules: 15,
    stakingAmount: 0.7,
    enrolled: 98,
    difficulty: "Beginner",
    tags: ["Plumbing", "Smart Sensors", "Maintenance", "IoT"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "Automotive Mechanics + AI Diagnostics",
    description: "Modern automotive repair combining traditional mechanical skills with AI diagnostic tools and blockchain vehicle history tracking.",
    duration: "14 weeks",
    modules: 20,
    stakingAmount: 0.9,
    enrolled: 186,
    difficulty: "Intermediate",
    tags: ["Automotive", "AI Diagnostics", "Blockchain", "Repair"],
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1470&auto=format&fit=crop",
    prerequisites: ["Basic Mechanics"]
  },
  {
    id: "4",
    title: "HVAC & Smart Climate Control",
    description: "Heating, ventilation, and air conditioning with IoT integration and AI-optimized energy management systems.",
    duration: "11 weeks",
    modules: 16,
    stakingAmount: 0.75,
    enrolled: 134,
    difficulty: "Intermediate",
    tags: ["HVAC", "Climate Control", "Energy", "Smart Systems"],
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: "5",
    title: "Construction Tech & Blockchain",
    description: "Modern construction techniques with blockchain project management, smart contracts for supply chain, and AI safety monitoring.",
    duration: "16 weeks",
    modules: 24,
    stakingAmount: 1.0,
    enrolled: 89,
    difficulty: "Advanced",
    tags: ["Construction", "Project Management", "Safety", "Blockchain"],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1470&auto=format&fit=crop",
    prerequisites: ["Basic Construction", "Safety Certification"]
  },
  {
    id: "6",
    title: "Welding & Materials Science",
    description: "Advanced welding techniques with AI quality control, blockchain certification tracking, and smart material analysis.",
    duration: "13 weeks",
    modules: 19,
    stakingAmount: 0.85,
    enrolled: 76,
    difficulty: "Advanced",
    tags: ["Welding", "Materials", "Quality Control", "Certification"],
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1470&auto=format&fit=crop",
    prerequisites: ["Basic Metalwork", "Safety Training"]
  },
];

// Mock Modules for Smart Electrical Systems course
export const mockModules: Module[] = [
  {
    id: "m1",
    title: "Electrical Safety & Code Compliance",
    description: "Essential safety protocols, OSHA standards, and local electrical codes for professional electricians.",
    duration: "3 hours",
    completed: true,
    courseId: "1",
    type: "video"
  },
  {
    id: "m2",
    title: "Basic Circuit Theory & Analysis",
    description: "Understanding voltage, current, resistance, and power calculations for practical applications.",
    duration: "4 hours",
    completed: true,
    courseId: "1",
    type: "video"
  },
  {
    id: "m3",
    title: "Hands-On: Wiring a Smart Switch",
    description: "Install and configure smart switches with app connectivity and voice control integration.",
    duration: "3 hours",
    completed: false,
    courseId: "1",
    type: "hands-on"
  },
  {
    id: "m4",
    title: "AI Diagnostic Tools",
    description: "Using AI-powered multimeters and diagnostic equipment to troubleshoot electrical issues.",
    duration: "2.5 hours",
    completed: false,
    courseId: "1",
    type: "video"
  },
  {
    id: "m5",
    title: "Smart Home Integration Project",
    description: "Complete a full smart home electrical system with IoT sensors and automation.",
    duration: "6 hours",
    completed: false,
    courseId: "1",
    type: "project"
  },
  {
    id: "m6",
    title: "Blockchain Certification System",
    description: "Learn how blockchain technology tracks your certifications and work history.",
    duration: "2 hours",
    completed: false,
    courseId: "1",
    type: "video"
  }
];

// Mock User Profile
export const mockUser: UserProfile = {
  id: "u1",
  name: "Jordan Martinez",
  walletAddress: "0x1234...5678",
  avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Jordan",
  stakingBalance: 3.2,
  enrolledCourses: ["1"],
  completedCourses: []
};
