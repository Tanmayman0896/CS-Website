import { getEvents } from '@/lib/getEvents';
import ClientEventPage from './ClientEventPage';

export const dynamic = 'force-dynamic'; // Ensure it fetches events dynamically or on revalidation

export default async function EventPage() {
  const events = await getEvents();

  return <ClientEventPage events={events} />;
}