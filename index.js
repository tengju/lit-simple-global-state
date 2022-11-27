import { LitElement } from 'lit';

export const StateManager = {
    state: new Proxy({}, {
        set: (target, key, value) => {
            target[key] = value;
            StateManager.notify();
            return true;
        }
    }),
    listeners: {},
    subscribe(id, registeredClass) {
        if (registeredClass instanceof LitElement) {
            this.listeners[id] = registeredClass;
            return;
        }
        console.warn("Must be an instance of LitElement")
    },
    unsubscribe(id) {
        if (!this.listeners[id]) return;
        delete this.listeners[id]
    },
    notify() {
        Object.values(this.listeners).forEach(
            (listener) => listener.requestUpdate()
        )
    }
}