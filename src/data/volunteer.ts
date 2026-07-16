export interface VolunteerRole {
  title: string;
  description: string;
  commitment: string;
  icon?: string;
}

// TODO: replace with real volunteer role descriptions.
export const volunteerRoles: VolunteerRole[] = [
  {
    title: 'Ushering',
    description: '[TODO: role description]',
    commitment: '[TODO: e.g. one show night per production]',
    icon: 'ticket',
  },
  {
    title: 'Set Construction',
    description: '[TODO: role description]',
    commitment: '[TODO: commitment level]',
    icon: 'hammer',
  },
  {
    title: 'Costumes',
    description: '[TODO: role description]',
    commitment: '[TODO: commitment level]',
    icon: 'shirt',
  },
  {
    title: 'Box Office',
    description: '[TODO: role description]',
    commitment: '[TODO: commitment level]',
    icon: 'ticket',
  },
];

export const volunteerSignUpUrl = '#';
