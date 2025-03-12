import { Auditable } from "./auditable";

export type Lesson = Auditable & {
  id: string;
  accountId: string;
  title: string;
  level: string;
  topic: string;
  learningObjectives: string;
  vocabulary: string;
  conversationStructure: string;
  durationEstimation: number;

};

export const lessons: Lesson[] = [
  {
    id: "1",
    title: "Lesson 1",
    level: "Level 1",
    topic: "Topic 1",
    learningObjectives: "Learning Objectives 1",
    vocabulary: "Vocabulary 1",
    conversationStructure: "Conversation Structure 1",
    durationEstimation: 10,
    accountId: "1",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "2",
    title: "Lesson 2",
    level: "Level 2",
    topic: "Topic 2",
    learningObjectives: "Learning Objectives 2",
    vocabulary: "Vocabulary 2",
    conversationStructure: "Conversation Structure 2",
    durationEstimation: 20,
    accountId: "2",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "3",
    title: "Lesson 3",
    level: "Level 3",
    topic: "Topic 3",
    learningObjectives: "Learning Objectives 3",
    vocabulary: "Vocabulary 3",
    conversationStructure: "Conversation Structure 3",
    durationEstimation: 30,
    accountId: "3",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "4",
    title: "Lesson 4",
    level: "Level 4",
    topic: "Topic 4",
    learningObjectives: "Learning Objectives 4",
    vocabulary: "Vocabulary 4",
    conversationStructure: "Conversation Structure 4",
    durationEstimation: 40,
    accountId: "4",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "5",
    title: "Lesson 5",
    level: "Level 5",
    topic: "Topic 5",
    learningObjectives: "Learning Objectives 5",
    vocabulary: "Vocabulary 5",
    conversationStructure: "Conversation Structure 5",
    durationEstimation: 50,
    accountId: "5",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
];

