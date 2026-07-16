export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

// TODO: replace with real "how to get involved" step sequence.
export const getInvolvedSteps: ProcessStep[] = [
  { step: 1, title: '[TODO: step title]', description: '[TODO: step description]' },
  { step: 2, title: '[TODO: step title]', description: '[TODO: step description]' },
  { step: 3, title: '[TODO: step title]', description: '[TODO: step description]' },
];
