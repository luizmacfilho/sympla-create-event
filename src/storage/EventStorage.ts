export class EventStorage {

  public events: any[] = [];

  public start() {
    const events = localStorage.getItem('events');
    this.events = JSON.parse(events || '[]');
  }

  public save(event: any, newEvent: boolean = false) {
    if (newEvent) {
      this.saveNewEvent(event);
    } else {
      this.saveEditedEvent(event);
    }
    localStorage.setItem('events', JSON.stringify(this.events));
  }

  public getEventById(id: number) {
    return this.events[this.getEventIndexById(id)];
  }

  private saveEditedEvent(event: any) {
    const index = this.getEventIndexById(event.id);
    this.events[index] = event;
  }

  private saveNewEvent(event: any) {
    event.id = Date.now();
    this.events.push(event);
  }

  private getEventIndexById(id: any) {
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
