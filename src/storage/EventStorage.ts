/**
 * Event interface where are defined all event properties
 */
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
  ticketSold: number;
  location?: string;
}

/**
 * Base class responsible to control and maintain events
 */
export class EventStorage {

  /**
   * All created events
   */
  public events: IEvent[] = [];

  /**
   * Gets all cached events from localStorage and sets on events property
   */
  public start() {
    const events = localStorage.getItem('events');
    this.events = JSON.parse(events || '[]');
  }

  /**
   * Saves a new or an edited event and sets on localStorage
   * @param event Event to save
   */
  public save(event: IEvent) {
    if (event.id) {
      this.saveEditedEvent(event);
    } else {
      this.saveNewEvent(event);
    }
    localStorage.setItem('events', JSON.stringify(this.events));
  }

  /**
   * Retrieves an event based on id
   * @param id Event id
   * @throws Will throw if the event do not exist
   */
  public getEventById(id: number) {
    return this.events[this.getEventIndexById(id)];
  }

  /**
   * Saves an edited event and updates the sold tickets property
   * @param event Edited event
   */
  private saveEditedEvent(event: IEvent) {
    const index = this.getEventIndexById(event.id);
    event.ticketSold = this.getRandomInt(0, +event.ticketAmount);
    this.events[index] = event;
  }

  /**
   * Saves a new event and sets event location and sold tickets properties
   * @param event New event
   */
  private saveNewEvent(event: IEvent) {
    event.id = Date.now();
    event.location = 'São Paulo';
    event.ticketSold = this.getRandomInt(0, +event.ticketAmount);
    this.events.push(event);
  }

  /**
   * Retrieves event index by id
   * @param id Event id
   * @throws Will throw if the event do not exist
   */
  private getEventIndexById(id: number) {
    const index = this.events.findIndex((e) => e.id === id);
    if (index !== -1) {
      return index;
    }
    throw new Error('Event not found');
  }

  /**
   * Retrieves a random int number from a range
   * @param min Start value, including it
   * @param max End value, including it
   */
  private getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

/**
 * Singleton instance of EventStorage class
 */
const instance: EventStorage = new EventStorage();

export default instance;
