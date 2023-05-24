// pub/sub
const listeners = {};

const publish = (eventName, ...eventData) => { // array with ... (spread operator)
    listeners[eventName]?.forEach(listener => listener(...eventData)); // optional chaining - ? => wether there is an eventName // (...) destructure
};

const subscribe = (eventName, eventListener) => {
    if(!listeners[eventName]){
        listeners[eventName] = [];
    }

    listeners[eventName].push(eventListener);

    return () => {
        console.log('Unsubscribed');
        listeners[eventName] = listeners[eventName].filtrer(x => x != eventListener);
    }
};

const eventBus = {
    publish,
    subscribe,
};

module.exports = eventBus;
