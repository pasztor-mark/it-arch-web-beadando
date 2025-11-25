import type { Difficulty } from "../lib/enums";

export class QuestionValidation {
  id: string
  query: string;
  answer: string;
  topic: string;
  uniWeek: string;
  dateAdded: string;
  important: string;
  difficulty: string;
  labelColor: string;

  constructor(id: string,
    query: string,
    answer: string,
    topic: string,
    uniWeek: string,
    dateAdded: string,
    important: string,
    difficulty: string,
    labelColor: string,) {
    this.id = id
    this.query = query;
    this.answer = answer;
    this.topic = topic;
    this.uniWeek = uniWeek;
    this.dateAdded = dateAdded;
    this.important = important;
    this.difficulty = difficulty;
    this.labelColor = labelColor;
  };

  static isValid(validation: QuestionValidation) {
    return (validation.id === "" &&
      validation.query === "" &&
      validation.answer === "" &&
      validation.topic === "" &&
      validation.uniWeek === "" &&
      validation.dateAdded === "" &&
      validation.important === "" &&
      validation.difficulty === "" &&
      validation.labelColor === "");
  };
}

export const emptyQuestionValidation: QuestionValidation = {
  id: "",
  query: "",
  answer: "",
  topic: "",
  uniWeek: "",
  dateAdded: "",
  important: "",
  difficulty: "",
  labelColor: ""
}

export function validateQuestion(query: string, answer: string, topic: string, uniWeek: number, dateAdded: Date, important: boolean, difficulty: Difficulty, labelColor: string): QuestionValidation {
  let validationResult = emptyQuestionValidation;
  validationResult = { ...validationResult };
  if (query.length < 3) {
    validationResult.query = "A kérdés legalább 3 karakterből álljon."
  }
  if (query.length > 128) {
    validationResult.query = "A kérdés max 128 karakterből állhat."
  }

  // answer
  if (answer.length < 3) {
    validationResult.answer = "A válasz legalább 3 karakter legyen.";
  } else if (answer.length > 2048) {
    validationResult.answer = "A válasz maximum 2048 karakter lehet.";
  }

  // topic
  if (topic.trim().length === 0) {
    validationResult.topic = "A téma megadása kötelező.";
  } else if (topic.length > 64) {
    validationResult.topic = "A téma maximum 64 karakter lehet.";
  }

  // uniWeek
  if (!Number.isInteger(uniWeek) || uniWeek < 1 || uniWeek > 16) {
    validationResult.uniWeek = "A hét számának 1 és 16 között kell lennie.";
  }

  // dateAdded
  if (!(dateAdded instanceof Date) || isNaN(dateAdded.getTime())) {
    validationResult.dateAdded = "Érvénytelen dátum.";
  } else {
    const now = new Date();
    now.setHours(23, 59, 59, 999);
    if (dateAdded.getTime() > now.getTime()) {
      validationResult.dateAdded = "A dátum nem lehet a jövőben.";
    }
  }

  // important
  if (typeof important !== "boolean") {
    validationResult.important = "Az 'important' mező logikai érték legyen.";
  }

  // difficulty
  if (difficulty === null || difficulty === undefined || String(difficulty).trim() === "") {
    validationResult.difficulty = "A nehézség megadása kötelező.";
  }

  // labelColor
  if (labelColor.trim().length === 0) {
    validationResult.labelColor = "A címkeszín megadása kötelező.";
  } else if (!/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(labelColor)) {
    validationResult.labelColor = "A címkeszín hex formátumban legyen (pl. #RRGGBB).";
  }
  return validationResult
}