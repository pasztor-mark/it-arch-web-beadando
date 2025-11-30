import { Attempt } from "../types/Attempt"
import { Category } from "../types/Category"
import { Question } from "../types/Question"
import { QuestionResult } from "../types/QuestionResult"
import { Difficulty } from "./enums"
import { CATEGORIES, defaultVallgazdNotes } from "./notes"

export function getCustomCategories(): Category[] {
  if (typeof window === "undefined") {
    return []
  }
  let categories: Category[] = []

  let categoryStringArray = window.localStorage.getItem("categories")?.split("]") ?? []
  categoryStringArray.pop()
  categoryStringArray.forEach((c) => {
    let deserialized = Category.deserializeFromString(c)
    if (deserialized) {
      if (deserialized.title.startsWith(",")) {
        deserialized.title = deserialized.title.substring(1)
      }
      categories.push(deserialized)
    }
  })
  return categories
}
export function saveCategory(category: Category) {
  const serialized = category.serializeToString();
  const items = window.localStorage.getItem("categories") + serialized;
  if (items)
    localStorage.setItem("categories", items)
}
export function saveAttempt(attempt: Attempt) {
  if (typeof window === "undefined") {
    return null
  }
  const prevAttempts = getAttempts();
  window.localStorage.setItem("attempts",
    [...prevAttempts, attempt].map((a) => a.serializeToString()).join("###")
  )
}

export function getAttempts(): Attempt[] {
  if (typeof window === "undefined") {
    return []
  }
  const serialized = window.localStorage.getItem("attempts")
  if (!serialized) return [];
  const s2: string[] = serialized.split("###")
  try {
    return s2.map((s) => Attempt.deserializeFromString(s))
  }
  catch (e) {
    return []
  }
}
export function saveQuestion(question: Question) {
  if (typeof window === "undefined") {
    return null
  }
  const prevQuestions = getQuestions();
  window.localStorage.setItem("questions", [...prevQuestions, question].map((q) => `${q.id};${q.query};${q.answer};${q.topic};${q.uniWeek};${q.dateAdded.getTime()};${q.important};${q.difficulty};${q.labelColor}`).join("###"))
}

export function getQuestions(): Question[] {
  if (typeof window === "undefined") {
    return []
  }
  const serialized = window.localStorage.getItem("questions") ?? ""

  let s2: string[]
  if (serialized && serialized.length > 3) {
    s2 = serialized.split("###")
  }
  else {
    localStorage.setItem("questions", defaultVallgazdNotes.map((q) => `${q.id};${q.query};${q.answer};${q.topic};${q.uniWeek};${q.dateAdded.getTime()};${q.important};${q.difficulty};${q.labelColor}`).join("###"))
    s2 = []
  }
  try {

    return [...s2.map((s) =>
      Question.deserializeFromString(s)
    )]
  }
  catch (e) {
    return []
  }
}
export function getDifficultyColor(difficulty: Difficulty): string {
  switch (difficulty) {
    case (Difficulty.EASY):
      return "#11ff11";
    case (Difficulty.MEDIUM):
      return "#ccc";
    case (Difficulty.HARD):
      return "#ff1111";
  }
}
interface ParsedData {
  categories: Category[];
  questions: Question[];
  attempts: Attempt[];
}
export function parseJsonToClasses(json: any): ParsedData {
  const categories = (json.categories ?? []).map(
    (c: any) => new Category(c.title, c.topics)
  );

  const questions = (json.questions ?? []).map(
    (q: any) =>
      new Question(
        q.id,
        q.query,
        q.answer,
        q.topic,
        q.uniWeek ?? null,
        q.dateAdded ? new Date(q.dateAdded) : new Date(),
        q.important ?? false,
        q.difficulty
          ? q.difficulty === "EASY"
            ? Difficulty.EASY
            : q.difficulty === "MEDIUM"
              ? Difficulty.MEDIUM
              : Difficulty.HARD
          : Difficulty.MEDIUM,
        q.labelColor ?? "#FFFFFF"
      )
  );

  const attempts = (json.attempts ?? []).map((a: any) => {
    const results = (a.results ?? []).map(
      (r: any) => new QuestionResult(r.id, r.questionId, r.isCorrect)
    );
    return new Attempt(results, a.topics ?? [], a.savedAt ? new Date(a.savedAt) : undefined);
  });

  return { categories, questions, attempts };
}

interface exportInterface {
  "categories": Category[],
  "questions": Question[]
  "attempts": Attempt[]
}
export function exportToJson(questions: Question[], attempts: Attempt[], categories: Category[]) {

  const truncatedCategories = categories.filter(
    (c) => !CATEGORIES.some((def) => def.title === c.title)
  )

  const truncatedQuestions = questions.filter(
    (q) => !defaultVallgazdNotes.some((def) => def.id === q.id)
  )
  const savedData: exportInterface = {
    categories: truncatedCategories, questions: truncatedQuestions, attempts: attempts
  }
  const file = new Blob([JSON.stringify(savedData, null, 2)], {
    type: "application/json"
  })
  return URL.createObjectURL(file)
}