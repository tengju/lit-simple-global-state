import { LitElement } from 'lit';

export const StateManager = {
    state: new Proxy({}, {
        set: (target, key, value) => {
            target[key] = value;
            setTimeout(() => StateManager.notify(), 0);

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

export class GlobalState extends LitElement {
    constructor() {
        super();
        this.id = Symbol();
        StateManager.subscribe(this.id, this);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        StateManager.unsubscribe(this.id);
    }
}