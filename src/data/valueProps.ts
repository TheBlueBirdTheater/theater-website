export interface ValueProp {
  title: string;
  description: string;
  icon?: string;
}

// Why support the Blue Bird Theatre and the Orangeburg Part-Time Players.
export const valueProps: ValueProp[] = [
  {
    title: 'Quality Live Entertainment at Home',
    description:
      'Your support brings quality, live, family-friendly theater to Orangeburg, so neighbors do not have to travel to Columbia or Charleston to enjoy the performing arts.',
    icon: 'heart',
  },
  {
    title: 'A Venue and Company Hand in Hand',
    description:
      'The Blue Bird Theatre is the venue, and the Orangeburg Part-Time Players is the resident, all-volunteer community company that stages its shows there. Every production is created by neighbors, students, and friends who share a love of the stage.',
    icon: 'users',
  },
  {
    title: 'A Historic Landmark Preserved',
    description:
      'Contributions help operate and maintain the historic Blue Bird Theatre in downtown Orangeburg, keeping a treasured gathering place alive for generations to come.',
    icon: 'landmark',
  },
  {
    title: 'Opportunities for Young Performers',
    description:
      'Through the Junior Orangeburg Part-Time Players, young people gain the chance to learn, grow, and shine on stage in a welcoming, supportive environment.',
    icon: 'star',
  },
];
