
export type Course = {
  id: string;
  title: string;
  description: string;
  duration: string;
  modules: number;
  stakingAmount: number;
  enrolled: number;
  image: string;
  tags: string[];
};

export type Module = {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
};

export type Bet = {
  id: string;
  studentId: string;
  courseId: string;
  amount: number;
  prediction: "complete" | "incomplete";
  predictedGrade?: string;
  odds: number;
  status: "active" | "won" | "lost";
};

export type UserProfile = {
  id: string;
  name: string;
  avatar: string;
  walletAddress: string;
  stakingBalance: number;
  enrolledCourses: string[];
  completedCourses: string[];
  bets: Bet[];
};

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Web3 Startup Fundamentals",
    description: "Learn how to build and launch a Web3 startup from ideation to execution.",
    duration: "8 weeks",
    modules: 6,
    stakingAmount: 0.5,
    enrolled: 124,
    image: "https://source.unsplash.com/random/300x200/?blockchain",
    tags: ["startup", "web3", "business"]
  },
  {
    id: "2",
    title: "Smart Contract Development",
    description: "Build secure and efficient smart contracts for your decentralized applications.",
    duration: "6 weeks",
    modules: 8,
    stakingAmount: 0.75,
    enrolled: 86,
    image: "https://source.unsplash.com/random/300x200/?code",
    tags: ["development", "solidity", "ethereum"]
  },
  {
    id: "3",
    title: "DAO Governance & Structure",
    description: "Understand how to create and manage a Decentralized Autonomous Organization.",
    duration: "4 weeks",
    modules: 5,
    stakingAmount: 0.3,
    enrolled: 56,
    image: "https://source.unsplash.com/random/300x200/?network",
    tags: ["governance", "dao", "community"]
  },
  {
    id: "4",
    title: "Tokenomics & Market Design",
    description: "Learn how to design token economics for your project that align incentives.",
    duration: "5 weeks",
    modules: 7,
    stakingAmount: 0.6,
    enrolled: 92,
    image: "https://source.unsplash.com/random/300x200/?cryptocurrency",
    tags: ["tokenomics", "economics", "incentives"]
  }
];

export const mockModules: Module[] = [
  {
    id: "m1",
    courseId: "1",
    title: "Ideation & Market Research",
    description: "How to identify opportunities in the Web3 space and validate your ideas.",
    duration: "1 week",
    completed: false
  },
  {
    id: "m2",
    courseId: "1",
    title: "Business Model Canvas for Web3",
    description: "Creating a business model that works in the decentralized economy.",
    duration: "1 week",
    completed: false
  },
  {
    id: "m3",
    courseId: "1",
    title: "Legal Structure & Compliance",
    description: "Navigate the complex legal landscape of crypto startups.",
    duration: "2 weeks",
    completed: false
  },
  {
    id: "m4",
    courseId: "1",
    title: "Community Building",
    description: "Strategies for building and engaging a community around your project.",
    duration: "1 week",
    completed: false
  },
  {
    id: "m5",
    courseId: "1",
    title: "Fundraising Strategies",
    description: "From token sales to VC funding - choose the right approach for your project.",
    duration: "2 weeks",
    completed: false
  },
  {
    id: "m6",
    courseId: "1",
    title: "Launch & Growth",
    description: "Planning and executing a successful product launch and growth strategy.",
    duration: "1 week",
    completed: false
  }
];

export const mockUser: UserProfile = {
  id: "u1",
  name: "Alex Rodriguez",
  avatar: "https://source.unsplash.com/random/100x100/?portrait",
  walletAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  stakingBalance: 1.25,
  enrolledCourses: ["1"],
  completedCourses: [],
  bets: []
};

export const mockBets: Bet[] = [
  {
    id: "b1",
    studentId: "u2",
    courseId: "1",
    amount: 0.2,
    prediction: "complete",
    predictedGrade: "A",
    odds: 1.5,
    status: "active"
  },
  {
    id: "b2",
    studentId: "u3",
    courseId: "2",
    amount: 0.1,
    prediction: "incomplete",
    odds: 2.3,
    status: "active"
  },
  {
    id: "b3",
    studentId: "u4",
    courseId: "3",
    amount: 0.3,
    prediction: "complete",
    predictedGrade: "B",
    odds: 1.8,
    status: "won"
  }
];
