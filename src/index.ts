import { IStateManager } from '../types';

export const StateManager: IStateManager  = {
    state: new Proxy({}, {
        set: (target, key, value) => {
            target[key] = value;
            setTimeout(() => StateManager.notify(), 0);

            return true;
        }
    }),
    listeners: {},
    subscribe(id, registeredClass) {
        this.listeners[id] = registeredClass;
    },
    unsubscribe(id) {
        if (!this.listeners[id]) return;
        delete this.listeners[id]
    },
    notify() {
        Object.values(this.listeners).forEach(
            (listener: any) => listener.requestUpdate()
        )
    }
}

export const observe = (superclass: any) => class extends superclass {
    connectedCallback() {
        super.connectedCallback();
        this.id = Symbol("LitId");
        StateManager.subscribe(this.id, this);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        StateManager.unsubscribe(this.id);
    }
}