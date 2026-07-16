export interface Person {
  name: string;
  role: string;
  bio?: string;
  photoUrl?: string;
}

// TODO: replace with real board/staff names and roles, if publicly listed.
export const boardMembers: Person[] = [
  { name: '[TODO: name]', role: 'Board President', bio: undefined, photoUrl: undefined },
  { name: '[TODO: name]', role: 'Board Treasurer', bio: undefined, photoUrl: undefined },
];

export const artisticStaff: Person[] = [
  { name: '[TODO: name]', role: 'Artistic Director', bio: undefined, photoUrl: undefined },
];
