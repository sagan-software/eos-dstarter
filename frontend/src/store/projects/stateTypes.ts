import { Category } from './categories';

export interface Project {
    readonly projectName: string; // eosio name
    readonly creator: string; // eosio name
    readonly title: string;
    readonly subtitle: string;
    readonly goalAmount: string; // asset
    readonly goalType: ProjectGoalType;
    readonly stage: ProjectStage;
    readonly category: Category;
    readonly tags: ReadonlyArray<string>;
    readonly imageHash: string; // ipfs hash
    readonly videoHash: string; // ipfs hash
    readonly storyHash: string; // ipfs hash
    readonly rewards: ReadonlyArray<ProjectReward>;
    readonly startTime: Date;
    readonly endTime: Date;
    readonly durationDays: number;
    readonly pledgedTotal: number;
    readonly pledgedClaimed: number;
}

export enum ProjectGoalType {
    AllOrNothing = 1,
    Flexible = 2,
}

export enum ProjectStage {
    Concept = 1,
    Prototype = 2,
    Production = 3,
    Shipping = 4,
}

export interface ProjectReward {
    readonly title: string;
    readonly description: string;
    readonly pledgeAmount: string; // asset
    readonly items: ReadonlyArray<ProjectRewardItem>;
    readonly estimatedDelivery: Date;
    readonly startQuantity: number;
    readonly currentQuantity: number;
    readonly startTime: Date;
    readonly endTime: Date;
}

export interface ProjectRewardItem {
    readonly name: string;
    readonly quantity: number;
}
