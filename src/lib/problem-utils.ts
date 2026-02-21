import problems from "@/data/problems.json";
import { AlgorithmProblem } from "@/types/dsa";

export const algorithmProblems = problems as AlgorithmProblem[];

export const getProblemById = (id: string): AlgorithmProblem | undefined =>
  algorithmProblems.find((problem) => problem.id === id);
