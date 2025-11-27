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
  serializeToString?() {
    return `${this.id};${this.query};${this.answer};${this.topic};${this.uniWeek};${this.dateAdded.getTime()};${this.important};${this.difficulty};${this.labelColor}###`
  }
  static deserializeFromString(serialized: string) : Question {
    const arr = serialized.split(";")
    const id = Number(arr[0])
    const query = (arr[1])
    const answer = (arr[2])
    const topic = (arr[3])
    const uniWeek = Number(arr[4])
    const dateAdded = new Date(arr[5])
    const important = Boolean(arr[6]) ?? false
    const ndifficulty = Number(arr[7])
    const difficulty = ndifficulty === 0 ? Difficulty.EASY : ndifficulty === 1 ? Difficulty.MEDIUM : Difficulty.HARD
    const labelColor = (arr[8])

    return new Question(id, query, answer, topic, uniWeek, dateAdded, important, difficulty, labelColor)
  }
}