export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export type RevealDirection = "up" | "down" | "left" | "right" | "none";

// Offset the element starts from, expressed as the direction it travels INTO
// place: "up" starts below and rises, "left" starts right and slides left.
export function revealOffset(direction: RevealDirection, distance: number): { x?: number; y?: number } {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
}
