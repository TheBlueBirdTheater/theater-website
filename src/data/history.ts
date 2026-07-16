export interface HistoryMilestone {
  year: string;
  heading: string;
  body: string;
  imageUrl?: string;
}

export interface HistoryContent {
  intro: string;
  milestones: HistoryMilestone[];
}

// TODO: replace with real Blue Bird Theatre building history and OPTP company history.
export const buildingHistory: HistoryContent = {
  intro:
    '[TODO: one to two sentence teaser about the Blue Bird Theatre\'s history as a historic venue, used on the homepage.]',
  milestones: [
    {
      year: '[YEAR]',
      heading: '[MILESTONE HEADING — e.g. "The Blue Bird Theatre opens"]',
      body: '[TODO: milestone description.]',
      imageUrl: undefined,
    },
    {
      year: '[YEAR]',
      heading: '[MILESTONE HEADING — e.g. "Orangeburg Part-Time Players founded"]',
      body: '[TODO: milestone description.]',
      imageUrl: undefined,
    },
  ],
};
