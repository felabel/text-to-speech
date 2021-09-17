// init the speech API

const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');

// init voices array

let voices = [];

const getVoices = () => {
    voices = synth.getVoices();

    // looop through voices and create a select list for 1
    voices.forEach(voice =>{
        // create option element
        const option = document.createElement('option');
        // fill option with voice and langiage
        option.textContent = voice.name + '('+ voice.lang + ')';
        // set needed option attribute
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);

        voiceSelect.appendChild(option);
    })
}

getVoices();
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}

// speak

const speak = () => {
    // check if speaking
    if(synth.speaking){
        console.error('already speaking');
        return;
    }
    if(textInput.value !== ''){
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        // speak end
        speakText.onend = e => {
            console.log('done speaking');
        }
        // speak error
        speakText.onerror = e => {
            console.error('done speaking');
        }

        // selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // loop through voice
        voices.forEach(voice => {
            if(voice.name === selectedVoice){
                speakText.voice;
            }
        });

        // set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        // speak
        synth.speak(speakText);
    }
    
}

// event listeners

// text form submit

textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

// change rate value
rate.addEventListener('change', e => rateValue.textContent = rate.value);

// change pitch value
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

// voice select
voiceSelect.addEventListener('change', e => speak());
