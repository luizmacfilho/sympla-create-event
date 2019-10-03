/**
 * Class to control application options
 */
export class Application {
  public headerButtonName: string = '';
  public showToast: boolean = false;
  public toastMessage: string = '';
}

/**
 * Singleton instance of Application class
 */
const instance: Application = new Application();

export default instance;
