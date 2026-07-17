export interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

// Frequently asked questions for the Blue Bird Theatre.
export const faqs: FAQ[] = [
  {
    question: 'What is the relationship between the Blue Bird Theatre and the OPTP?',
    answer:
      'The Blue Bird Theatre is the venue in downtown Orangeburg, and the Orangeburg Part-Time Players (OPTP) is the all-volunteer community theater company that calls it home. The OPTP produces a full season of live shows performed by local adults, and its youth program, the Junior Orangeburg Part-Time Players, gives area kids the chance to perform for the Orangeburg community.',
    category: 'Venue',
  },
  {
    question: 'Where is the Blue Bird Theatre located?',
    answer:
      'The Blue Bird Theatre is at 1141 Russell Street in downtown Orangeburg, South Carolina 29115.',
    category: 'Venue',
  },
  {
    question: 'How do I buy tickets?',
    answer:
      'Tickets are available online through TicketLeap at events.ticketleap.com/events/bluebirdorangeburg. Tickets may also be available at the door before a performance while seats remain.',
    category: 'Tickets',
  },
  {
    question: 'How much do tickets cost?',
    answer:
      'Prices vary by production. Most plays are around $20 for adults and $15 for students and senior citizens, while musicals are typically $25 for adults and $20 for students and senior citizens. Check the specific show page for exact pricing.',
    category: 'Tickets',
  },
  {
    question: 'Where do I park?',
    answer:
      'Street and public parking are available in downtown Orangeburg near the theater. We recommend arriving a little early to find a space and be seated before curtain.',
    category: 'Venue',
  },
  {
    question: 'What time do performances start?',
    answer:
      'Evening performances typically begin at 7:30 p.m., and Sunday matinees typically begin at 3:00 p.m. Please refer to the show page for the exact times of the performance you plan to attend.',
    category: 'Tickets',
  },
  {
    question: 'Can I become a member or buy season tickets?',
    answer:
      'Yes. Memberships and season tickets can be purchased online through TicketLeap, or by printing the membership form and mailing it with payment to Orangeburg Part-Time Players, P.O. Box 1291, Orangeburg, SC 29116.',
    category: 'Get Involved',
  },
  {
    question: 'How can I get involved?',
    answer:
      'There are opportunities both on stage and behind the scenes, including set construction, costumes, box office, ushering, and backstage crew. No experience is necessary. Follow us on Facebook for audition and volunteer announcements, or contact us to learn more.',
    category: 'Get Involved',
  },
  {
    question: 'Can I rent the Blue Bird Theatre for an event?',
    answer:
      'Yes. The Blue Bird is an affordable and intimate venue available for concerts, recitals, pageants, and other events. Contact the Orangeburg Part-Time Players at 803-536-5454 or optp1981@gmail.com to ask about availability and rental details.',
    category: 'Venue',
  },
  {
    question: 'Is the Orangeburg Part-Time Players a nonprofit?',
    answer:
      'Yes. The Orangeburg Part-Time Players is a self-supporting, all-volunteer nonprofit 501(c)(3) organization. All donations are tax-deductible and go toward the operation and upkeep of the Blue Bird Theatre.',
    category: 'Get Involved',
  },
];
