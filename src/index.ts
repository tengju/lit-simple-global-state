import { IStateManager } from "../types";

function deepClone(obj) {
  let clone = {};
  for (let key in obj) {
    clone[key] =
      typeof obj[key] === "object" && obj[key] !== null
        ? deepClone(obj[key])
        : obj[key];
  }
  return clone;
}

export const StateManager: IStateManager = {
  state: new Proxy(
    {},
    {
      set: (target, key, value) => {
        target[key] = value;
        StateManager.notify();

        return true;
      },
    }
  ),
  defaultState: {},
  listeners: {},
  setDefaultState(state) {
    this.defaultState = state;
  },
  resetState() {
    this.state = deepClone(this.defaultState);
  },
  subscribe(id, registeredClass) {
    this.listeners[id] = registeredClass;
  },
  unsubscribe(id) {
    if (!this.listeners[id]) return;
    delete this.listeners[id];
  },
  notify() {
    Object.values(this.listeners).forEach((listener: any) =>
      listener.requestUpdate()
    );
  },
};

export const observe = (superclass: any) =>
  class extends superclass {
    connectedCallback() {
      super.connectedCallback();
      this.symbolicId = Symbol("LitId");
      StateManager.subscribe(this.symbolicId, this);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      StateManager.unsubscribe(this.symbolicId);
    }
  };
