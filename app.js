const light1 = document.querySelector("#l1");
const light2 = document.querySelector("#l2");
const light3 = document.querySelector("#l3");

const FSM = {
    state: 'IDLE',

    transitions: {
        IDLE: {
            onP1() {
                this.setState('ENTRANCE_ON');
            },
            onP2() {
                this.setState('ENTRANCE_ON');
            }
        },

        ENTRANCE_ON: {
            onP1() {
                this.setState('KITCHEN_ON');
            },
            onP2() {
                this.setState('BEDROOM_ON');
            }
        },

        KITCHEN_ON: {
            onP1() {
                this.setState('IDLE');
            },
            onP2() {
                this.setState('IDLE');
            }
        },

        BEDROOM_ON: {
            onP1() {
                this.setState('IDLE');
            },
            onP2() {
                this.setState('IDLE');
            }
        }
    },

    dispatch(actionName) {
        const stateActions = this.transitions[this.state];

        if (stateActions && stateActions[actionName]) {
            stateActions[actionName].call(this);
        } else {
            console.log("Invalid transition");
        }
    },

    setState(stateName) {
        this.state = stateName;

        console.log(`State changed → ${stateName}`);

        document.getElementById("stateDisplay").innerText =
            "Current State: " + stateName;

        // ✅ Reset all lights
        light1.src = "./images/off.gif";
        light2.src = "./images/off.gif";
        light3.src = "./images/off.gif";

        // ✅ Apply state output
        switch (stateName) {
            case "ENTRANCE_ON":
                light1.src = "./images/on.gif";
                break;

            case "KITCHEN_ON":
                light2.src = "./images/on.gif";
                break;

            case "BEDROOM_ON":
                light3.src = "./images/on.gif";
                break;

            case "IDLE":
                break;
        }
    }
};

const home = Object.create(FSM);

function onP1() {
    home.dispatch('onP1');
}

function onP2() {
    home.dispatch('onP2');
}

function resetFSM() {
    home.setState('IDLE');  // ✅ FIXED
}