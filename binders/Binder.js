class Binder {
    constructor(logger) {
        this.logger = logger;
    }

    getType() {
        return null;
    }

    send(thing, binding) {
        throw new Error("Not implemented.");
    }

    hookupBinding(thing, binding) {
        throw new Error("Not implemented.");
    }
}

module.exports = Binder;