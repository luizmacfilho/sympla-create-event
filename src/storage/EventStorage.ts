export interface IEvent {
  id: number;
  name: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  ticketName: string;
  ticketAmount: string;
  ticketPrice?: string;
  ticketFree: boolean;
}

export class EventStorage {

  public events: IEvent[] = [];

  public start() {
    const events = localStorage.getItem('events');
    this.events = JSON.parse(events || '[]');
  }

  public save(event: IEvent) {
    if (event.id) {
      this.saveEditedEvent(event);
    } else {
      this.saveNewEvent(event);
    }
    localStorage.setItem('events', JSON.stringify(this.events));
  }

  public getEventById(id: number) {
    return this.events[this.getEventIndexById(id)];
  }

  private saveEditedEvent(event: IEvent) {
    const index = this.getEventIndexById(event.id);
    this.events[index] = event;
  }

  private saveNewEvent(event: IEvent) {
    event.id = Date.now();
    this.events.push(event);
  }

  private getEventIndexById(id: number) {
    const index = this.events.findIndex((e) => e.id === id);
    if (index !== -1) {
      return index;
    }
    throw new Error('Event not found');
  }
}

/**
 * Singleton instance of EventStorage class
 */
const EventStorageInstance: EventStorage = new EventStorage();

export default EventStorageInstance;
