import { LitElement } from 'lit';

export const StateManager: {
    state: any;
    listeners: Record<any, LitElement>;
    subscribe: (id: any, element: LitElement) => void;
    unsubscribe: (id: any) => void;
    notify: () => void;    
} = {
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
            (listener: LitElement) => listener.requestUpdate()
        )
    }
}

export class GlobalState extends LitElement {
    id: any;
    constructor() {
        super();
        this.id = Symbol("LitId");
        StateManager.subscribe(this.id, this);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        StateManager.unsubscribe(this.id);
    }
}