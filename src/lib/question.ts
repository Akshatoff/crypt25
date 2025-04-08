import question from "@/app/question.json";

export function getQuestionByLevel(level: number) {
  return question.levels.find((q) => q.level === level);
}
