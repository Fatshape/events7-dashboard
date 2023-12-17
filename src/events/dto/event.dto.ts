// Build only
type eventType = 'crosspromo' | 'liveops' | 'app' | 'ads';

export class EventDto {
  id: string;
  name: string;
  description: string;
  type: eventType;
  priority: number;
}