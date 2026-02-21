"use client";

import { createContext, useContext, useMemo, useReducer } from "react";

interface GameState {
  xp: number;
  streak: number;
  completedChallenges: string[];
}

type GameAction =
  | { type: "COMPLETE_CHALLENGE"; challengeId: string; xp: number }
  | { type: "ANSWER_INCORRECT" };

interface GameContextValue extends GameState {
  level: number;
  completeChallenge: (challengeId: string, xp: number) => void;
  markIncorrect: () => void;
}

const XP_PER_LEVEL = 100;

const initialState: GameState = {
  xp: 0,
  streak: 0,
  completedChallenges: [],
};

function gameReducer(state: GameState, action: GameAction): GameState {
  if (action.type === "COMPLETE_CHALLENGE") {
    const alreadyCompleted = state.completedChallenges.includes(action.challengeId);
    return {
      xp: state.xp + (alreadyCompleted ? 0 : action.xp),
      streak: state.streak + 1,
      completedChallenges: alreadyCompleted
        ? state.completedChallenges
        : [...state.completedChallenges, action.challengeId],
    };
  }

  return {
    ...state,
    streak: 0,
  };
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const value = useMemo(
    () => ({
      ...state,
      level: Math.floor(state.xp / XP_PER_LEVEL) + 1,
      completeChallenge: (challengeId: string, xp: number) =>
        dispatch({ type: "COMPLETE_CHALLENGE", challengeId, xp }),
      markIncorrect: () => dispatch({ type: "ANSWER_INCORRECT" }),
    }),
    [state]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used inside GameProvider");
  }
  return context;
}
