export namespace StateManager {
    const state: any;
    const listeners: {};
    function subscribe(id: any, registeredClass: any): void;
    function unsubscribe(id: any): void;
    function notify(): void;
}
export class GlobalState extends LitElement {
    id: any;
}
import { LitElement } from "lit-element/lit-element";
