export default class EventStorage {

  public static start() {
    const events = localStorage.getItem('events');
    this.events = JSON.parse(events || '[]');
  }

  public static get() {
    return this.events;
  }

  public static save(event: any, newEvent: boolean = false) {
    if (newEvent) {
      this.saveNewEvent(event);
    } else {
      this.saveEditedEvent(event);
    }
    localStorage.setItem('events', JSON.stringify(this.events));
  }

  private static events: any[] = [];

  private static saveEditedEvent(event: any) {
    const index = this.getEventIndexById(event.id);
    this.events[index] = event;
  }

  private static saveNewEvent(event: any) {
    this.events.push(event);
  }

  private static getEventIndexById(id: any) {
    const index = this.events.findIndex((e) => e.id === id);
    if (index !== -1) {
      return index;
    }
    throw new Error('Event not found');
  }
}
