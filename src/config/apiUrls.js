
const config = {
   
    "MODEL_SAVE": "http://localhost:4001/model-save"
}

const localConfig = {

    // chat
    "MODEL_SAVE": "http://localhost:4001/model-save"
};



// Global variables passed from the CORE PROGRAM
const urls = typeof window !== "undefined" && window['NODE_ENV'] && window['NODE_ENV'] === 'production'
? config 
: localConfig;

// node & browser
module.exports = urls;

