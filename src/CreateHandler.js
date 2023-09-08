class NodeHandler {
    inner = {
        set: false,
        selfSyn: {
            open: "{",
            close: "}"
        },
        cols: [
        ]
    }
}

class CreateHandler {
    inner = {
        name: 'CREATE',
        value: '',
        set: false,
        selfSyn: {
            open: "(",
            close: ")"
        }
    }
    handlers = {
        node: new NodeHandler()
    } 
    updater = null;
    uv = null;

    constructor(updater, uv) {
        this.updater = updater;
        this.uv = uv;
    }

    isNotSet() {
        if (!this.inner.set) {
            return false;
        }
        return true;
    }
}

class SynHandler {
    counter = 0;
    inner = {
        set: false,
        name: '',
        selfSyn: {
            open: "(",
            close: ")"
        }
    }
    updater = null;
    uv = null;
    synHandlers = {
    }
    handlers = ['Create', 'Match']
    query = "";

    constructor(updater, uv) {
        this.updater = updater;
        this.uv = uv;
        this.synHandlers = {
            create: new CreateHandler(updater, uv)
        }
    }
    setSynHandler() {
        this.inner = {}
    }

    synHandlerIsNotSet() {
        if (!this.inner.set) {
            return false;
        }
        return true;
    }

    synValues() {
        return this.handlers
    }

    setActive(v) {
        this.inner = {
            ...this.inner,
            set: true,
            name: v
        }
        this.query = v;
        this.updater(this.uv += 1);
    }

    createIsNotSet() {
        return this.synHandlers.create.isNotSet()
    }
}

export { SynHandler }