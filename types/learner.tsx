export type Learner = {
    id: string;
    name: string;
    email: string;
    language: string;
    level: string;
    progress: number;
    lastActivity: string;
}

export const learners: Learner[] = [
    {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        language: "English",
        level: "Beginner",
        progress: 50,
        lastActivity: "2024-01-01"
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        language: "Spanish",
        level: "Intermediate",
        progress: 75,
        lastActivity: "2024-01-02"
    },
    {
        id: "3",
        name: "Alice Johnson",
        email: "alice.johnson@example.com", 
        language: "French",
        level: "Advanced",
        progress: 90,
        lastActivity: "2024-01-03"
    },
    {
        id: "4",
        name: "Bob Brown",
        email: "bob.brown@example.com",
        language: "German",
        level: "Beginner",
        progress: 30,
        lastActivity: "2024-01-04"
    }
        
]
