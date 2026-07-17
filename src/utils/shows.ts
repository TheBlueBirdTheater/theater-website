import { getCollection } from 'astro:content';

export async function getCurrentShow() {
  const shows = await getCollection('shows');
  return shows.find((show) => show.data.status === 'current') ?? shows[0];
}
