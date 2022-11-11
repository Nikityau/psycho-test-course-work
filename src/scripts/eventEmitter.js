class EventEmitter {

    handlers = {

    }

    on(type,event) {
        if(type in this.handlers && Array.isArray(this.handlers)) {
            this.handlers.push(event)
        } else {
            this.handlers[type] = []
            this.handlers[type].push(event)
        }
    }
    emit(type, ...data) {
        if(type in this.handlers) {
            this.handlers[type].forEach(cb => cb(...data))
        }
    }
}