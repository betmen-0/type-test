const sampleCategories = {
    quotes: [
        "The only limit to our realization of tomorrow is our doubts of today.",
        "Success usually comes to those who are too busy to be looking for it.",
        "Life is 10% what happens to us and 90% how we react to it.",
        "The best way to predict the future is to invent it.",
        "The secret of getting ahead is getting started."
    ],
    code: [
        `function greet(name) {
    return \`Hello, ${name}!\`;
}

console.log(greet('Coder'));`,
        `const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled);`,
        `class Person {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        return \`Hi, I'm ${this.name}\`;
    }
}

const user = new Person('Alex');
console.log(user.sayHi());`
    ],
    lyrics: [
        "Imagine all the people living life in peace. You may say I'm a dreamer, but I'm not the only one.",
        "Hello, it's me. I was wondering if after all these years you'd like to meet.",
        "We all live in a yellow submarine, yellow submarine, yellow submarine."
    ],
    facts: [
        "Honey never spoils. Archaeologists have tasted honey found in ancient Egyptian tombs and it was still edible.",
        "Octopuses have three hearts and blue blood, which helps them survive in cold ocean depths.",
        "Bananas are berries, but strawberries are not. Botanically, bananas develop from a single ovary."
    ]
};

let currentCategory = "quotes";
let samples = sampleCategories[currentCategory];
let random = Math.floor(Math.random() * samples.length);

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function getCommonPrefixLength(a, b) {
    const length = Math.min(a.length, b.length);
    let i = 0;
    while (i < length && a[i] === b[i]) {
        i += 1;
    }
    return i;
}

var infinityPara = "In a world where information travels faster than ever before, the ability to focus, learn, and adapt has become one of the most valuable skills a person can possess. Every day presents countless opportunities to discover something new. And Be consistent unlike me :)"

localStorage.setItem("minuteValue",1);

var minuteValue = 1;
var secondValue = 0;
var ticktock;
var typingStarted = false;

var minusString= "";
var mistakeCount=0;

document.querySelector(".infinity-para").innerText = infinityPara;

// Set the time mode paragraph text on load
document.querySelector(".time-modes-wrapper .para-type").innerText = infinityPara;



function manageBtns(e) {
    if (!e.target || !e.target.classList) {
        return;
    }
    var classes = e.target.classList.value.split(" ");
    if (!(classes.includes("option") || classes.includes("show-time-modes"))) {
        var showTimeModes = document.querySelector(".show-time-modes");
        if (showTimeModes) {
            showTimeModes.classList.remove("selected");
        }
        var infinityModeSection = document.querySelector("#infinity-mode");
        if (infinityModeSection) {
            infinityModeSection.classList.remove("hide");
        }
        var testOptions = document.querySelector(".test-options");
        var options = testOptions ? testOptions.querySelectorAll(".option") : [];
        options.forEach((option) => {
            option.classList.add("hide");
        });
    }
}

window.addEventListener("click",(e) => {
    manageBtns(e);
});

function toggleVisibility() {
    var options = document 
    .querySelector(".test-options")
    .querySelectorAll(".option");
  options.forEach((option) => {
    var present = option.classList.contains("hide");
    if (present == true) {
        option.classList.remove("hide");
        document.querySelector(".show-time-modes").classList.add("selected");
        if (window.innerWidth <= 800) {
            document.querySelector(".infinity-mode").classList.add("hide");
        }
    } else {
        option.classList.add("hide");
        document.querySelector(".show-time-modes").classList.remove("selected");
        if(window.innerWidth <= 800) {
            document.querySelector(".infinity-mode").classList.remove("hide");
        }
    }
  });
}

document
.querySelector(".show-time-modes")
.addEventListener("click",toggleVisibility);

var updateClock = function (time) {
    document.querySelector
        ("#clock-time-modes").innerHTML = `<p>${time}<span class="mini"><br>min</span></p>`;
        document.querySelector("#timer-minute").innerText = "0" + time.toString();
        document.querySelector("#timer-second").innerText = "00";
        minuteValue = time;
        localStorage.setItem("minuteValue",time);
        setDefault();
    };

    document.querySelector("#minute1").addEventListener(
        "click",
        () => {
            updateClock(1);
        },
        false
    );


    document.querySelector("#minute2").addEventListener(
        "click",
        () => {
            updateClock(2);
        },
        false
    );

    document.querySelector("#minute3").addEventListener(
        "click",
        () => {
            updateClock(3);
        },
        false
    );


    function countdownTimer() {
        if (secondValue == 0) {
            minuteValue = minuteValue -1;
            secondValue = 59;
        } else {
            secondValue = secondValue -1;
        }

        if (secondValue < 10 && minuteValue < 10) {
            document.querySelector(".min").innerText = "0" + minuteValue;
            document.querySelector(".sec").innerText = "0" + secondValue;
        } else if (secondValue < 10 && minuteValue >= 10) {
            document.querySelector(".min").innerText = minuteValue;
            document.querySelector(".sec").innerText = "0" + secondValue;
        } else if (minuteValue < 10 && secondValue >= 10) {
            document.querySelector(".min").innerText = "0" + minuteValue;
            document.querySelector(".sec").innerText = secondValue;
        } else {
            document.querySelector(".min").innerText = minuteValue;
            document.querySelector(".sec").innerText = secondValue;
        }

        if (minuteValue == 0 && secondValue == 0) {
            clearInterval(ticktock);
            timeUp();
        }
    }

    function runTimer() {
        ticktock = setInterval(countdownTimer,1000);
    }

    document.querySelector(".type-area").addEventListener("focus",() => {
        if (typingStarted == false) {
            typingStarted = true;
            document.querySelector(".type-here-div").style.visibility = "hidden";
            runTimer();
        }
    });

    function checkUserInput() {
        const textarea = document.querySelector(".type-area");
        const paraTypeEl = document.querySelector(".time-modes-wrapper .para-type");
        const rawInput = textarea.value;
        const userInput = rawInput.slice(minusString.length);
        const totalTyped = minusString.length + userInput.length;

        if (!rawInput) {
            paraTypeEl.innerText = infinityPara;
            textarea.style.borderColor = "#A1A1AA";
            return;
        }

        if (rawInput.endsWith(" ")) {
            handleSpace();
            return;
        }

        const donePart    = infinityPara.slice(0, minusString.length);
        const currentPart = infinityPara.slice(minusString.length, totalTyped);
        const remaining   = infinityPara.slice(totalTyped);

        const common      = getCommonPrefixLength(userInput, currentPart);

        if (common === userInput.length) {
            // Everything typed so far is correct
            paraTypeEl.innerHTML =
                `<span class="highlight">${escapeHtml(donePart)}</span>` +
                `<span class="highlight">${escapeHtml(currentPart)}</span>` +
                escapeHtml(remaining);
            textarea.style.borderColor = "#F97316";
        } else {
            // Some characters are wrong — show correct prefix green, wrong section red
            // but always use the ORIGINAL paragraph characters, never the typed ones
            const correctPart = infinityPara.slice(minusString.length, minusString.length + common);
            const wrongPart   = infinityPara.slice(minusString.length + common, totalTyped);

            paraTypeEl.innerHTML =
                `<span class="highlight">${escapeHtml(donePart)}</span>` +
                `<span class="highlight">${escapeHtml(correctPart)}</span>` +
                `<span class="highlight-wrong">${escapeHtml(wrongPart)}</span>` +
                escapeHtml(remaining);
            textarea.style.borderColor = "#DC2626";
        }
    }

    document.querySelector(".type-area").addEventListener("input", checkUserInput);

    function handleSpace() {
        const textarea   = document.querySelector(".type-area");
        const paraTypeEl = document.querySelector(".time-modes-wrapper .para-type");
        const rawInput   = textarea.value;
        const userInput  = rawInput.slice(minusString.length); // e.g. "hello "
        const trimmed    = userInput.trim();                   // e.g. "hello"

        // What the paragraph expects at this position
        const expectedText = infinityPara.slice(minusString.length, minusString.length + userInput.length);

        if (expectedText === userInput) {
            // Correct — advance minusString
            minusString = rawInput;
            textarea.value = minusString;
            const done      = infinityPara.slice(0, minusString.length);
            const rest      = infinityPara.slice(minusString.length);
            paraTypeEl.innerHTML = `<span class="highlight">${escapeHtml(done)}</span>${escapeHtml(rest)}`;
            textarea.style.borderColor = "#A1A1AA";
        } else {
            // Wrong word — put it in error bin, reset to last good position
            document.querySelector(".error-bundle").innerHTML += `<span class="error-word">${escapeHtml(trimmed)}</span>`;
            textarea.value = minusString;
            mistakeCount += 1;
            const done = infinityPara.slice(0, minusString.length);
            const rest = infinityPara.slice(minusString.length);
            paraTypeEl.innerHTML = `<span class="highlight">${escapeHtml(done)}</span>${escapeHtml(rest)}`;
            textarea.style.borderColor = "#DC2626";
        }
    }

    document.querySelector(".type-area").onkeydown = (e) => {

    }

    document.querySelector(".type-area").addEventListener("keydown", function (event){
        if (event.key === "Enter") {
            document.querySelector(".type-area").value = minusString;
            event.preventDefault();
            return false;
        }

        if (event.key === "Backspace" || event.keyCode == 8) {
            var userTyped = document.querySelector(".type-area").value;
            if(userTyped == minusString || minusString.includes(userTyped)) {
                event.preventDefault();
                return false;
            }
        }
    });

function calculateWPM(data,totalMin) {
    var charcount = data.length;
    if (charcount === undefined) {
        return data / 5 / totalMin;
    }
    return (wpm = charcount/5/totalMin);
}

function calculateCPM(data, totalMin) {
    var charcount = data.length;
    if(charcount == undefined) {
        return (wpm = data/totalMin);
    }
    return (wpm = charcount/totalMin);
}

function calculateAccuracy(correctChars,totalChars) {
    var correctChar = typeof correctChars === "number" ? correctChars : correctChars.length;
    var totalChar = typeof totalChars === "number" ? totalChars : totalChars.length;
    if (!totalChar) {
        return 0;
    }
    return (correctChar / totalChar) * 100;
}


async function timeUp () {
    document.querySelector(".type-area").disabled = true;


    document.querySelector(".showbox").style.visibility = "visible";

    let myPromise = new Promise(function (myResolve,myReject) {
        setTimeout(function (){
            myResolve(clearLoader);
        },5000);
    });

    await myPromise.then((result) => {
        clearLoader();
    });

    document.querySelector("#time-modes").scrollIntoView();

    var data = document.querySelector(".type-area").value;
    var time = localStorage.getItem("minuteValue");
    if (time == undefined || time == null) {
        time = 1;
    }

    var correct = minusString;
    var error = document.querySelector(".error-bundle").innerText.replace("<span class='error-word'>","");
    error = error.replace("</span>","");
    var total = correct + error;

    document.querySelector("#timer-wpm").innerText = calculateWPM(
        minusString,
        time
    ).toFixed(2);
    document.querySelector("#timer-cpm").innerText = calculateCPM(
        total,
        time
    ).toFixed(2);
    document.querySelector("#timer-accuracy").innerText = calculateAccuracy(
        correct,
        total
    ).toFixed(2);
}

function clearLoader () {
    document.querySelector(".showbox").style.visibility = "hidden";
    document.querySelector(".showbox").style.pointerEvents = "none";
}



function setDefault() {
    clearInterval(ticktock);
    document.querySelector("#timer-wpm").innerText = "0";
    document.querySelector("#timer-cpm").innerText = "0";
    document.querySelector("#timer-accuracy").innerText = "0";
    document.querySelector(".time-modes-wrapper").querySelector(".para-type").innerText = infinityPara;
    document.querySelector(".time-modes-wrapper").querySelector(".type-area").value = "";
    document.querySelector(".time-modes-wrapper").querySelector(".type-area").disabled = false;
    document.querySelector(".type-here-div").style.visibility = "visible";
    document.querySelector(".error-div").querySelector(".error").innerText = "";
    minusString = "";
    typingStarted = false;
    reset();
}

function resetTimeMode() {
    typingStarted = false;
    clearInterval(ticktock);
    document.querySelector(".type-here-div").style.visibility = "visible";
    document.querySelector(".time-modes-wrapper").querySelector(".para-type").innerHTML = infinityPara;


    var textarea = document.querySelector(".type-area");
    textarea.style.borderColor = '#A1A1AA';
    textarea.value = "";
    textarea.disabled = false;

    minuteValue = localStorage.getItem("minuteValue");
    if (minuteValue == undefined || minuteValue == null) {
        minuteValue = 1;
    }
    secondValue = 0;

    document.querySelector(".min1").querySelector(".min").innerText = "0" + minuteValue.toString();
    document.querySelector(".min1").querySelector(".sec").innerText = "00";
    document.querySelector("#clock-time-modes").innerHTML = `<p>${minuteValue}<span class="mini"><br>min</span></p>`;
    document.querySelector(".error-div").querySelector(".error").innerText = "";
    document.querySelector("#timer-wpm").innerText = "0";
    document.querySelector("#timer-cpm").innerText = "0";
    document.querySelector("#timer-accuracy").innerText = "0";
    document.querySelector(".error-bundle").innerHTML = "";

    minusString = "";
    mistakeCount = 0;
}

document.querySelector(".reset-time-mode").addEventListener("click",resetTimeMode);



var min = 0;
var sec = 0;
var clocking;
var totalCharslnf = 0;
document.querySelector(".infinity-user-type").innerText = samples[random];

// Script is at bottom of body so DOM is ready - initialize samples list now
renderSamples();


document.querySelector("#infinity-mode-btn").addEventListener("click",() => {
    setDefault();
    resetTimeMode();
});

function renderSamples() {
    const sampleList = document.querySelector("#samples-list");
    if (!sampleList) return;
    if (!samples || samples.length === 0) {
        sampleList.innerHTML = `<div class="no-samples-message">No samples available for this category.</div>`;
        return;
    }
    sampleList.innerHTML = samples
        .map((text, index) => {
            const preview = text.length > 100 ? text.slice(0, 100) + "..." : text;
            return `<button type="button" class="sample-item btn" data-index="${index}">${escapeHtml(preview)}</button>`;
        })
        .join("");
}

function selectSample(index) {
    if (!samples || index < 0 || index >= samples.length) return;
    random = index;
    document.querySelector(".infinity-user-type").innerText = samples[random];
    reset();
    const typableArea = document.querySelector(".infinity-type-area");
    if (typableArea) {
        typableArea.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

function showSamples() {
    const sampleList = document.querySelector("#samples-list");
    const customArea = document.querySelector("#custom-input-area");
    if (sampleList) {
        sampleList.style.display = "flex";
    }
    if (customArea) {
        customArea.style.display = "none";
    }
}

function showCustomInput() {
    const sampleList = document.querySelector("#samples-list");
    const customArea = document.querySelector("#custom-input-area");
    if (sampleList) {
        sampleList.style.display = "none";
    }
    if (customArea) {
        customArea.style.display = "block";
    }
}

const sampleList = document.querySelector("#samples-list");
if (sampleList) {
    sampleList.style.display = "none";
    sampleList.addEventListener("click", (event) => {
        const item = event.target.closest(".sample-item");
        if (!item) return;
        selectSample(Number(item.dataset.index));
    });
}

const categoryTabs = document.querySelectorAll(".category-tab");
categoryTabs.forEach((tab) => {
    tab.addEventListener("click", (event) => {
        categoryTabs.forEach((t) => t.classList.remove("active"));
        event.currentTarget.classList.add("active");
        const category = event.currentTarget.dataset.category;
        currentCategory = category;
        if (category === "custom") {
            showCustomInput();
            samples = [];
            random = 0;
            document.querySelector(".infinity-user-type").innerText = "";
            reset();
        } else {
            samples = sampleCategories[category] || [];
            random = 0;
            renderSamples();
            showSamples();
            document.querySelector(".infinity-user-type").innerText = samples[random] || "";
            reset();
        }
    });
});

const customSubmitBtn = document.querySelector("#custom-submit-btn");
if (customSubmitBtn) {
    customSubmitBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const customText = document.querySelector("#custom-text-input")?.value.trim();
        if (!customText) {
            return;
        }
        if (customText.length < 20) {
            alert("Please enter at least 20 characters.");
            return;
        }
        currentCategory = "custom";
        samples = [customText];
        random = 0;
        document.querySelector(".infinity-user-type").innerText = customText;
        showCustomInput();
        reset();

        const typingArea = document.querySelector(".infinity-type-area");
        if (typingArea) {
            typingArea.scrollIntoView({ behavior: "smooth", block: "center" });
            typingArea.focus();
        }
    });
}

function timer () {
    if (sec === 59) {
        min = min + 1;
        sec = 0;
    } else {
        sec = sec + 1;
    }

    if (sec < 10 && min < 10) {
        document.querySelector(".infinity-min").innerText = "0" + min;
        document.querySelector(".infinity-sec").innerText = "0" + sec;
    } else if (sec < 10 && min >= 10) {
        document.querySelector(".infinity-min").innerText = min;
        document.querySelector(".infinity-sec").innerText = "0" + sec;
    } else if (min <10 && sec >= 10) {
        document.querySelector(".infinity-min").innerText = "0" + min;
        document.querySelector(".infinity-sec").innerText = sec;
    } else {
        document.querySelector(".infinity-min").innerText = min;
        document.querySelector(".infinity-sec").innerText = sec;
    }
}

function start () {
    totalCharslnf = 0;
    document.querySelector(".infinity-type-area").disabled = false;
    document.querySelector(".start").disabled = true;
    document.querySelector(".start").style.backgroundColor = "#D4D4D4";
    document.querySelector(".start").style.cursor = "auto";
    clearInterval(clocking);
    clocking = setInterval(timer, 1000);
}

function reset() {
    totalCharslnf = 0;
    document.querySelector(".infinity-type-area").disabled=true;
    document.querySelector(".start").disabled = false;
    document.querySelector(".start").style.backgroundColor = "var(--primary-color)";
    document.querySelector(".start").style.cursor = "pointer";
    document.querySelector(".infinity-type-area").style.borderColor = "#A1A1A1";
    clearInterval(clocking);
    document.querySelector(".infinity-min").innerText = "00";
    document.querySelector(".infinity-sec").innerText = "00";
    min = 0;
    sec = 0;
    document.querySelector(".infinity-type-area").value = "";
    document.querySelector("#timer-wpm-inf").innerText = "0";
    document.querySelector("#timer-cpm-inf").innerText = "0";
    document.querySelector("#timer-accuracy-inf").innerText = "0";
    document.querySelector(".infinity-mode-section .result p").innerText = "";
    document.querySelector(".infinity-user-type").innerText = samples[random]; 
}

function checkUserInputInfinity() {
    totalCharslnf += 1;
    var para = samples[random];
    var userInput = document.querySelector(".infinity-type-area").value;

    if (userInput == "") {
        document.querySelector(".infinity-type-area").style.borderColor = "#A1A1AA";
        document.querySelector(".infinity-user-type").innerText = samples[random];
    } else if (para == userInput) {
        document.querySelector(".infinity-type-area").style.borderColor = "#16A34A";
        clearInterval(clocking);
        document.querySelector(".infinity-user-type").innerHTML = `<span class="highlight-final">${escapeHtml(userInput)}</span>`;
        document.querySelector(".infinity-type-area").disabled = true;

        document.querySelector(".showbox").style.visibility = "visible";
        let myPromise = new Promise(function (myResolve) {
            setTimeout(function () {
                myResolve(clearLoader);
            }, 5000);
        });
        myPromise.then(() => {
            clearLoader();
        });

        document.querySelector("#infinity-mode").scrollIntoView();
        result();
    } else if (para.startsWith(userInput)) {
        document.querySelector(".infinity-type-area").style.borderColor = "#F97316";
        const remainder = para.slice(userInput.length);
        document.querySelector(".infinity-user-type").innerHTML = `<span class="highlight">${escapeHtml(userInput)}</span>${escapeHtml(remainder)}`;
    } else {
        // Check if there's a common prefix
        const commonLength = getCommonPrefixLength(userInput, para);
        const correctPart = para.slice(0, commonLength);
        const wrongPart   = para.slice(commonLength, userInput.length);
        const remainder   = para.slice(userInput.length);
        document.querySelector(".infinity-user-type").innerHTML =
            `<span class="highlight">${escapeHtml(correctPart)}</span>` +
            `<span class="highlight-wrong">${escapeHtml(wrongPart)}</span>` +
            escapeHtml(remainder);
        document.querySelector(".infinity-type-area").style.borderColor = "#DC2626";
    }
}

document.querySelector(".start").addEventListener("click", start);
document.querySelector(".reset").addEventListener("click", reset);
document.querySelector(".infinity-type-area").addEventListener("input",checkUserInputInfinity);

function result () {
    var totalTime = parseInt(min) + parseInt(sec)/60;
    if (totalTime <= 0) {
        totalTime = 1/60;
    }
    var wpm = calculateWPM(samples[random],totalTime).toFixed(2);
    var cpm = calculateCPM(totalCharslnf, totalTime).toFixed(2);
    var accuracy = calculateAccuracy(samples[random],totalCharslnf).toFixed(2);

    document.querySelector("#timer-wpm-inf").innerText = wpm;
    document.querySelector("#timer-cpm-inf").innerText = cpm;
    document.querySelector("#timer-accuracy-inf").innerText = accuracy;
}