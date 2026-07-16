export interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

// TODO: replace with real frequently asked questions.
export const faqs: FAQ[] = [
  {
    question: '[TODO: question — e.g. "Where do I park?"]',
    answer: '[TODO: answer]',
    category: 'Tickets',
  },
  {
    question: '[TODO: question — e.g. "Is the theater accessible?"]',
    answer: '[TODO: answer]',
    category: 'Venue',
  },
  {
    question: '[TODO: question — e.g. "How do I get involved?"]',
    answer: '[TODO: answer]',
    category: 'Get Involved',
  },
];
