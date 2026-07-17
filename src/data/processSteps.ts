export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

// How to get involved with the Orangeburg Part-Time Players.
export const getInvolvedSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Follow us on Facebook',
    description:
      'Follow the Blue Bird Theatre on Facebook to receive updates about auditions, meetings, volunteer opportunities, and upcoming shows.',
  },
  {
    step: 2,
    title: 'Choose how you want to help',
    description:
      'Decide whether you would like to perform on stage or lend a hand behind the scenes with sets, costumes, box office, ushering, or backstage crew. No experience is necessary.',
  },
  {
    step: 3,
    title: 'Reach out or attend a meeting',
    description:
      'Contact us by phone, email, or Facebook, or drop in to an Executive Board meeting, held the first Thursday of every month at 7 p.m. at the theater. All are welcome.',
  },
  {
    step: 4,
    title: 'Join the OPTP',
    description:
      'Become a member to support the theater and stay connected. Memberships can be purchased online through TicketLeap or by mail.',
  },
];
