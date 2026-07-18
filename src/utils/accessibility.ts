interface ShowAccessibility {
  wheelchairSeating?: boolean;
  assistiveListening?: boolean;
  aslAvailable?: boolean;
  audioDescriptionAvailable?: boolean;
  note?: string;
}

/** Composes a show/event's structured accessibility flags into a single summary sentence for KnowBeforeYouGo. */
export function formatAccessibilitySummary(accessibility?: ShowAccessibility): string | undefined {
  if (!accessibility) return undefined;

  const sentences = [
    accessibility.wheelchairSeating && 'Wheelchair-accessible seating available.',
    accessibility.assistiveListening && 'Assistive listening devices available.',
    accessibility.aslAvailable && 'ASL interpretation available on request.',
    accessibility.audioDescriptionAvailable && 'Audio description available on request.',
    accessibility.note,
  ].filter((sentence): sentence is string => Boolean(sentence));

  return sentences.length > 0 ? sentences.join(' ') : undefined;
}
