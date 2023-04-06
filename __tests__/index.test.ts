import { StateManager } from "../src/index";

describe("StateManager", () => {
  beforeEach(() => {
    StateManager.listeners = {};
  });

  describe("subscribe", () => {
    it("should add a listener to the listeners object", () => {
      const id = "testId";
      const registeredClass = { requestUpdate: jest.fn() };

      StateManager.subscribe(id, registeredClass);

      expect(StateManager.listeners[id]).toBe(registeredClass);
    });
  });

  describe("unsubscribe", () => {
    it("should remove a listener from the listeners object", () => {
      const id = "testId";
      const registeredClass = { requestUpdate: jest.fn() };

      StateManager.listeners[id] = registeredClass;

      StateManager.unsubscribe(id);

      expect(StateManager.listeners[id]).toBeUndefined();
    });

    it("should not throw an error if the listener does not exist", () => {
      const id = "testId";

      expect(() => StateManager.unsubscribe(id)).not.toThrow();
    });
  });

  describe("notify", () => {
    it("should call requestUpdate on all registered listeners", () => {
      const listener1 = { requestUpdate: jest.fn() };
      const listener2 = { requestUpdate: jest.fn() };

      StateManager.listeners = {
        "1": listener1,
        "2": listener2,
      };

      StateManager.notify();

      expect(listener1.requestUpdate).toHaveBeenCalled();
      expect(listener2.requestUpdate).toHaveBeenCalled();
    });
  });

  describe("state", () => {
    it("should update the state object and call notify", () => {
      const key = "testKey";
      const value = "testValue";
      const registeredClass = { requestUpdate: jest.fn() };

      StateManager.subscribe("1", registeredClass);

      StateManager.state[key] = value;

      expect(StateManager.state).toEqual({ [key]: value });
      expect(registeredClass.requestUpdate).toHaveBeenCalled();
    });
  });
});
