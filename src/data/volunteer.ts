export interface VolunteerRole {
  title: string;
  description: string;
  commitment: string;
  icon?: string;
}

// Each production at the Blue Bird is a labor of love, and volunteers keep the
// show going. No experience is necessary, and there is a place for every interest.
export const volunteerRoles: VolunteerRole[] = [
  {
    title: 'Ushering and Seating',
    description:
      'Welcome patrons, hand out programs, and help guests find their seats before the show and at intermission.',
    commitment: 'One or more performance nights per production',
    icon: 'ticket',
  },
  {
    title: 'Set Construction',
    description:
      'Help design, build, and paint the sets that bring each production to life. Carpentry skills are welcome but not required.',
    commitment: 'Flexible, during the weeks leading up to a show',
    icon: 'hammer',
  },
  {
    title: 'Costumes',
    description:
      'Sew, fit, and organize costumes for the cast. Sewing experience is helpful, but there are tasks for every skill level.',
    commitment: 'Flexible, during the rehearsal and production period',
    icon: 'shirt',
  },
  {
    title: 'Box Office',
    description:
      'Assist patrons with ticket sales and will-call, and help keep the lobby running smoothly on performance nights.',
    commitment: 'One or more performance nights per production',
    icon: 'ticket',
  },
  {
    title: 'Backstage Crew',
    description:
      'Support the production behind the scenes by assisting with props, scene changes, and running the show during performances.',
    commitment: 'Tech week and performance nights',
    icon: 'clapperboard',
  },
  {
    title: 'On Stage',
    description:
      'Audition for a role and perform with the Orangeburg Part-Time Players. New performers of all experience levels are welcome.',
    commitment: 'Rehearsals plus the performance run',
    icon: 'star',
  },
];

// The OPTP shares volunteer and audition opportunities on Facebook. Reach out by
// phone or email, or message us on Facebook, to let us know how you would like to help.
export const volunteerSignUpUrl = 'https://www.facebook.com/BluebirdtheatreOrangeburgSC';
