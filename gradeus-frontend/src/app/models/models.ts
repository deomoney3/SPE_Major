export interface Class {
    classId: number;
    name: string;
    description: string;
    teacher: number;
}

export interface ClassGroup {
    classGroupId: number;
    name: string;
    description: string;
    classObj: number;
}

export interface Topic {
    topicId: number;
    name: string;
    description: string;
    classObj: number;
}

export interface User {
    id: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    role: string;
}

export interface Score {
    scoreId?: number;
    scoreValue: number;
    student: number;
    scorer?: number;
    topic: number;
}

export interface ScoreFull {
    scoreId?: number;
    scoreValue: number;
    student: User;
    scorer?: User;
    topic: number;
}

export interface ScoreRequest {
    scoreId?: number;
    scoreValue: number;
    studentId: number;
    scorerId?: number;
    topicId: number;
}

export interface ScoreResponse {
    scoreValue: number;
    present: boolean;
}