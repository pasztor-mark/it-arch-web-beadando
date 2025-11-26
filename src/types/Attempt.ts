import { QuestionResult } from "./QuestionResult";

export class Attempt {
  results: QuestionResult[]
  topics: string[]
  savedAt: Date

   constructor(results: QuestionResult[], topics: string[], savedAt?: Date) {
    this.results = results
    this.topics = topics
    this.savedAt = savedAt ?? new Date()
  }

  serializeToString() {
    return `${this.savedAt.getTime()}|${this.topics.join(";")}|${this.results.map((qr) => qr.serializeToString())}`
  }

  static deserializeFromString(serialized: string): Attempt {
    const s = serialized.split("|")
    const savedAt = new Date(Number(s[0]))
    const topics = s[1]?.split(";") ?? s[1]
    const results = s[2]?.split("!").map((r: string) => QuestionResult.deserializeFromString(r))
    return new Attempt(results, topics, savedAt)
  }
}