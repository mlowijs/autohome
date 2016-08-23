module.exports = {
    name: "Rfxcom dingetje",
    bindings: [
        {
            type: "rfxcom",
            direction: "out",
            packetType: "lighting2",
            subType: "ac",
            id: 0x1068426,
            unit: 1,
        },
        {
            type: "mqtt",
            direction: "in",
            topic: "test/aap",
            broker: "testBroker1"
        }
    ]
};