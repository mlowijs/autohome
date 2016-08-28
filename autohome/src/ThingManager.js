const EventEmitter = require("events");
const glob = require("glob");
const path = require("path");
const Thing = require("./Thing");

class ThingManager extends EventEmitter {
    constructor(loggerFactory) {
        super();

        this._logger = loggerFactory.getLogger("ThingManager");
        this.things = new Map();
    }
    
    loadThings(thingsLoaded) {
        glob("things/**/*.js", { realpath: true }, (error, files) => {
            files.forEach(file => this._loadThing(file));

            this._logger.debug(`Loaded ${this.things.size} thing(s).`, "ThingManager.ctor");
            
            if (thingsLoaded)
                thingsLoaded();
        });
    }
    
    _loadThing(file) {
        let thing = require(file);
        Object.setPrototypeOf(thing, new Thing(path.parse(file).name));

        thing.on("valueSet", (thing, oldValue) => {
            this._logger.info(`Set value of '${thing.id}' to '${thing.value}' (${typeof thing.value}).`, "ThingManager.thing.valueSet");

            if (thing.valueSet !== undefined)
                thing.valueSet();

            this.emit("valueSet", thing);
        });

        thing.on("valuePushed", (thing, oldValue) => {
            this._logger.info(`Pushed '${thing.value}' (${typeof thing.value}) to '${thing.id}'.`, "ThingManager.thing.valueChanged");

            if (thing.valuePushed !== undefined)
                thing.valuePushed();

            this.emit("valuePushed", thing);
        });

        this.things.set(thing.id, thing);
    }
}

module.exports = ThingManager;