export interface IStateManager {
    state: any;
    listeners: Record<any, any>;
    subscribe: (id: any, element: any) => void;
    unsubscribe: (id: any) => void;
    notify: () => void;
}
