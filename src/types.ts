export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
}

export interface Module {
  id: string;
  title: string;
  label: string;
  description: string;
  topics: string[];
  explanation: string;
  notes: string[];
  pptUrl?: string;
  pdfUrl?: string;
  testPaper: Question[];
  methodologies: {
    title: string;
    description: string;
    icon: string;
  }[];
  simulationType: 'ions' | 'orbitals' | 'spectrum' | 'galvanic' | 'graphene';
  quiz: Question[];
}

export interface LabExperiment {
  id: string;
  title: string;
  aim: string;
  apparatus: string[];
  chemicals: string[];
  procedure: string[];
  observations: string[];
  result: string;
  precautions: string[];
}

export interface UserProgress {
  completedModules: string[];
  quizScores: Record<string, number>;
  completionHistory: { date: string; count: number }[];
  userNotes: Record<string, string>;
  profile: {
    name: string;
    university: string;
    branch: string;
    year: string;
    avatar?: string;
    bio: string;
    email: string;
  };
}
