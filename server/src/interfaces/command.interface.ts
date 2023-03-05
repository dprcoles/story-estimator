export interface Command {
  executeAsync(): Promise<any>;
}
