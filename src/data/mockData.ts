
// Mock data for the Web3 Academy platform

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
}

export interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  courseId: string;
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

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Web3 Startup Fundamentals",
    description: "Learn how to build, launch, and scale Web3 startups from ideation to product-market fit. This course covers tokenomics, community building, and decentralized governance.",
    duration: "8 weeks",
    modules: 12,
    stakingAmount: 0.5,
    enrolled: 342,
    tags: ["Startup", "Tokenomics", "Governance"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "Smart Contract Development",
    description: "Master Solidity and build secure, gas-efficient smart contracts. Covers best practices, security patterns, upgradability, and integration with frontends.",
    duration: "10 weeks",
    modules: 15,
    stakingAmount: 0.75,
    enrolled: 256,
    tags: ["Solidity", "Security", "Development"],
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "DeFi Protocols & Mechanisms",
    description: "Deep dive into decentralized finance protocols, including AMMs, lending, yield farming, and insurance. Understand economic security and liquidity dynamics.",
    duration: "6 weeks",
    modules: 9,
    stakingAmount: 0.6,
    enrolled: 198,
    tags: ["DeFi", "Lending", "AMM"],
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: "4",
    title: "NFT Creation & Marketing",
    description: "Learn to design, mint, and market NFT collections. Covers metadata, rarity, marketplaces, and community growth strategies.",
    duration: "5 weeks",
    modules: 8,
    stakingAmount: 0.45,
    enrolled: 275,
    tags: ["NFT", "Art", "Marketing"],
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: "5",
    title: "DAOs & Community Governance",
    description: "Master the art of building and maintaining decentralized autonomous organizations. Learn voting mechanisms, treasury management, and coordination tools.",
    duration: "7 weeks",
    modules: 10,
    stakingAmount: 0.65,
    enrolled: 167,
    tags: ["DAO", "Governance", "Treasury"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: "6",
    title: "Blockchain Fundamentals",
    description: "Understand the core principles behind blockchain technology, including consensus mechanisms, cryptography, and network incentives.",
    duration: "4 weeks",
    modules: 6,
    stakingAmount: 0.3,
    enrolled: 421,
    tags: ["Blockchain", "Consensus", "Crypto"],
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1470&auto=format&fit=crop"
  },
];

// Mock Modules for Web3 Startup Fundamentals course
export const mockModules: Module[] = [
  {
    id: "m1",
    title: "Web3 Startup Landscape",
    description: "Overview of the current Web3 startup ecosystem, key players, and emerging trends.",
    duration: "2 hours",
    completed: true,
    courseId: "1"
  },
  {
    id: "m2",
    title: "Building a Web3 Business Model",
    description: "Learn how to create sustainable tokenomics and revenue models for your Web3 startup.",
    duration: "3 hours",
    completed: true,
    courseId: "1"
  },
  {
    id: "m3",
    title: "Decentralized Governance",
    description: "Explore different governance mechanisms and how to implement them effectively.",
    duration: "2.5 hours",
    completed: false,
    courseId: "1"
  },
  {
    id: "m4",
    title: "Community Building Strategies",
    description: "Techniques for building and nurturing an engaged community around your Web3 project.",
    duration: "2 hours",
    completed: false,
    courseId: "1"
  },
  {
    id: "m5",
    title: "Fundraising in Web3",
    description: "Understand different fundraising options from token sales to VC investment in the Web3 space.",
    duration: "3 hours",
    completed: false,
    courseId: "1"
  },
  {
    id: "m6",
    title: "Legal & Regulatory Considerations",
    description: "Navigate the complex legal landscape of blockchain and cryptocurrency startups.",
    duration: "2.5 hours",
    completed: false,
    courseId: "1"
  }
];

// Mock User Profile
export const mockUser: UserProfile = {
  id: "u1",
  name: "Alex Rodriguez",
  walletAddress: "0x1234...5678",
  avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Alex",
  stakingBalance: 2.5,
  enrolledCourses: ["1"],
  completedCourses: []
};
