import { LitElement } from 'lit';

export class StateManager {
    static state = new Proxy({}, {
        set: function (target, key, value) {
            target[key] = value;
            StateManager.notify();
            return true;
        }
    });
    static listeners = {};
    static subscribe(id, registeredClass) {
        if (registeredClass instanceof LitElement) {
            StateManager.listeners[id] = registeredClass;
            return;
        }
        console.warn("Must be an instance of LitElement")
    };
    static unsubscribe(id) {
        if (!StateManager.listeners[id]) return;
        delete StateManager.listeners[id]
    };
    static notify() {
        Object.values(StateManager.listeners).forEach(
            (listener) => listener.requestUpdate()
        )
    }
}
