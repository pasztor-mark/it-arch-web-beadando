import { Attempt } from "../types/Attempt"
import { Category } from "../types/Category"
import { Difficulty } from "./enums"

export function getCustomCategories(): Category[] {
  if (typeof window === "undefined") {
    return []
  }
  let categories: Category[] = []

  let categoryStringArray = window.localStorage.getItem("categories")?.split("]") ?? []
  categoryStringArray.forEach((c) => {
    let deserialized = Category.deserializeFromString(c)
    console.log(c)
    if (deserialized) {
      categories.push(deserialized)
    }
  })
  return categories
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