export interface Person {
  name: string;
  role: string;
  bio?: string;
  photoUrl?: string;
}

// OPTP Executive Board. Executive Board meetings are held the first Thursday of
// every month at 7 p.m. at the theater, and all are welcome.
export const boardMembers: Person[] = [
  { name: 'Donald Lee', role: 'President', bio: undefined, photoUrl: undefined },
  { name: 'John Ott', role: 'Vice President', bio: undefined, photoUrl: undefined },
  { name: 'Coe Dantzler', role: 'Treasurer', bio: undefined, photoUrl: undefined },
  { name: "Mandy O'Cain", role: 'Recording Secretary', bio: undefined, photoUrl: undefined },
  { name: 'Carrie Dukes', role: 'Corresponding Secretary', bio: undefined, photoUrl: undefined },
  { name: 'Tony DeAloia', role: 'Building Manager', bio: undefined, photoUrl: undefined },
  { name: 'Wendy Crider', role: 'Immediate Past President', bio: undefined, photoUrl: undefined },
  { name: 'Mitzie DeAloia', role: 'JrOPTP Chair', bio: undefined, photoUrl: undefined },
  { name: 'Monique Hubbard', role: 'Member At Large', bio: undefined, photoUrl: undefined },
  { name: 'Jessica Nuckolls', role: 'Member At Large', bio: undefined, photoUrl: undefined },
  { name: 'Rob Clariday', role: 'Member At Large', bio: undefined, photoUrl: undefined },
];

// The OPTP is an all-volunteer organization; artistic roles are filled by
// members on a production-by-production basis rather than by permanent staff.
export const artisticStaff: Person[] = [];
