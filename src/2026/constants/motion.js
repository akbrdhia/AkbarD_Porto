export const EASINGS = {
  // Premium agency curve: fast start, very gentle landing
  premium: [0.16, 1, 0.3, 1], 
  // Smoother premium variant from research
  ultra: [0.25, 1, 0.5, 1],
  // Standard UI curves
  standard: [0.4, 0, 0.2, 1],
  out: [0, 0, 0.2, 1],
  in: [0.4, 0, 1, 1],
  // Snappy for micro-interactions
  snappy: [0.2, 0, 0, 1]
};

export const DURATIONS = {
  micro: 0.15,
  quick: 0.25,
  standard: 0.4,
  slow: 0.8,
  reveal: 1.2,
  dramatic: 2.2
};

export const SPRING = {
  default: { stiffness: 400, damping: 90 },
  soft: { stiffness: 100, damping: 30 },
  responsive: { stiffness: 1500, damping: 65 }
};
