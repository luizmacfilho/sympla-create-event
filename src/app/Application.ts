/**
 * Application options interface
 */
export interface IApplication {
  headerButtonName: string;
}

/**
 * Class to control application options
 */
export class Application implements IApplication {
  public headerButtonName: string = 'AddEventBtn';
}

/**
 * Singleton instance of Application class
 */
export const instance: Application = new Application();
