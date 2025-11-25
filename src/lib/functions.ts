import { Attempt } from "../types/Attempt"
import { Category } from "../types/Category"
import { Question } from "../types/Question"
import { defaultVallgazdNotes } from "./constants"
import { Difficulty } from "./enums"

export function getCustomCategories(): Category[] {
  if (typeof window === "undefined") {
    return []
  }
  let categories: Category[] = []

  const categoryStringArray = window.localStorage.getItem("categories")?.split("],") ?? []
  categoryStringArray.forEach((c) => {
    let deserialized = Category.deserializeFromString(c)
    console.log(c)
    if (deserialized) {
      categories.push(deserialized)
    }
  })
  return categories
}
export function saveCategory(category: Category) {
  const serialized = category.serializeToString();
  window.localStorage.getItem("categories")?.concat(serialized);
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
  window.localStorage.setItem("questions", [...prevQuestions, question].map((q) => q.serializeToString!()).join("###"))
}

export function getQuestions(): Question[] {
  if (typeof window === "undefined") {
    return []
  }
  const serialized = window.localStorage.getItem("questions")
  if (!serialized) return [];
  const s2: string[] = serialized.split("###")
  try {
    return [...defaultVallgazdNotes, ...s2.map((s) => Question.deserializeFromString(s))]
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