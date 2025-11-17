export class QuestionResult {
  id: number;
  questionId: number
  isCorrect: boolean

  constructor(id: number, questionId: number, isCorrect: boolean) {
    this.id = id
    this.questionId = questionId;
    this.isCorrect = isCorrect
  }

  serializeToString() {
    return `${this.id}-${this.questionId}-${this.isCorrect ? "T!": "F!"}`
  }
  static deserializeFromString(serialized: string) : QuestionResult {
    const s = serialized.split("-");
    return new QuestionResult(Number(s[0]), Number(s[1]), s[2] === "T")
  }
}