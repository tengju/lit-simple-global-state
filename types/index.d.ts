export interface IStateManager {
  state: any;
  defaultState: any;
  listeners: any;
  setDefaultState(state: any): void;
  resetState(): void;
  subscribe(id: string, registeredClass: any): void;
  unsubscribe(id: string): void;
  notify(): void;
}
