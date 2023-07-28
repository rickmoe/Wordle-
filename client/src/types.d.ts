/* Word checking/matching types */
// Results follow the following convention: "green" is in
// the final word and in the correct spot, "yellow" is in
// the final word but in the wrong spot, and "gray" is not
// in the final word
export type Result = "green" | "yellow" | "gray";
type CheckedGuess = { word: string; results: Result[] };
type Guesses = { current: string; past: CheckedGuess[] };

/* Game display types */
export type TileData = { letter: string; result?: "green" | "yellow" | "gray" };

/* Game state types */
export type GameState = "win" | "lose" | "in progress";
