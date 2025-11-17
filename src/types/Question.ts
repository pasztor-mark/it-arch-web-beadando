import { Difficulty } from "../lib/enums";

export class Question {
  id: number
  query: string;
  answer: string;
  topic: string;
  uniWeek: number;
  dateAdded: Date;
  important: boolean;
  difficulty: Difficulty;
  labelColor: string;

  constructor(id: number, query: string, answer: string, topic: string, uniWeek: number, dateAdded?: Date, important?: boolean, difficulty?: Difficulty, labelColor?: string) {
    this.id = id;
    this.query = query;
    this.answer = answer;
    this.topic = topic;
    this.uniWeek = uniWeek;
    this.dateAdded = dateAdded ?? new Date();
    this.important = important ?? false
    this.difficulty = difficulty ?? Difficulty.MEDIUM
    this.labelColor = labelColor ?? "#423e35"
  }
}