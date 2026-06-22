var samples = [
    "In today's fast-paced digital world, learning to type efficiently has become an essential skill for students, professionals, and anyone who spends time on a computer. Developing strong typing habits not only improves speed but also increases accuracy and productivity in everyday tasks. Whether you are writing emails, coding software, preparing reports, or chatting with friends, the ability to type quickly and confidently can save valuable time and reduce frustration. Consistent practice helps build muscle memory, allowing fingers to move naturally across the keyboard without constantly searching for each key"
    , "Many successful people dedicate a few minutes each day to improving their typing skills because even small improvements can lead to significant gains over time. Patience and regular practice are more important than rushing, as accuracy should always come before speed. By challenging yourself with different kinds of text and gradually increasing your pace, you can develop a smooth and reliable typing style that benefits you in school, work, and everyday life. Remember that progress does not happen overnight, but with persistence and dedication, anyone can become a faster and more accurate typist while gaining confidence and efficiency in the process.",
    "Technology has transformed the way people communicate, learn, and solve problems in the modern world. From smartphones and laptops to cloud computing and artificial intelligence, digital tools have become deeply integrated into everyday life. Students can access educational resources from anywhere, businesses can collaborate across continents, and individuals can share ideas instantly with people around the globe. Despite these advancements, the importance of creativity, critical thinking, and human connection remains unchanged. Technology should be viewed as a tool that enhances productivity and opens new opportunities rather than something that replaces genuine effort and curiosity. As innovation continues to accelerate, adapting to change and continuously learning new skills will become increasingly valuable. Those who embrace lifelong learning and maintain a willingness to explore new ideas are more likely to succeed in a constantly evolving world where opportunities often arise from unexpected places."
    , "A peaceful morning often begins with the gentle sound of birds singing and sunlight slowly filling the sky with warm colors. Many people enjoy starting their day with a simple routine that includes exercise, reading, or planning their goals before work or school. Establishing positive habits can improve focus, reduce stress, and create a sense of balance throughout the day. Even small actions, such as drinking enough water, organizing a workspace, or taking short breaks between tasks, can have a meaningful impact on overall well-being. Success is rarely the result of a single extraordinary event; instead, it is usually built through consistent effort and discipline over time. By staying patient and maintaining a positive mindset, individuals can overcome challenges, learn from mistakes, and steadily move closer to achieving their personal and professional aspirations while enjoying the journey along the way.",
    "Throughout history, exploration and curiosity have driven humanity to discover new lands, develop groundbreaking inventions, and expand the boundaries of knowledge. Great achievements are often the result of countless small efforts combined with determination and perseverance. Scientists, artists, engineers, and writers all contribute to society in unique ways, inspiring future generations to dream bigger and think differently."

]

var infinityPara = "In a world where information travels faster than ever before, the ability to focus, learn, and adapt has become one of the most valuable skills a person can possess. Every day presents countless opportunities to discover something new. And Be consistent unlike me :)"

localStorage.setItem("minuteValue",1);

var minuteValue = 1;
var secondValue = 0;
var ticktock;
var typingStarted = false;

var modifiedpara = infinityPara;
var minusString= "";
var mistakeCount=0;

document.querySelector(".infinity-para").innerText = infinityPara;



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
        var userInput = document 
        .querySelector(".type-area")
        .value.replace(minusString,"");

        if (userInput[userInput.length -1] === " ") {
            handleSpace();
            return;
        }


        let startword = modifiedpara.substr(0, modifiedpara.indexOf(" ")+ 1);

        if (document.querySelector(".type-area").value == "") {
            document.querySelector(".para-type").innerText = infinityPara;
        } else if (startword.includes(userInput)) {
            text = modifiedpara;
            text = text.replace(
                userInput,
                `<span class="highlight">`+ userInput + "</span>"
            );
            document.querySelector(".para-type").innerHTML = text;
        } else {
            return;
        }
    }

    document.querySelector(".type-area").addEventListener("input",checkUserInput);

    function handleSpace() {
        var userType = document.querySelector(".type-area").value;
        var deleteData = userType.replace(minusString, "");
        let startword = modifiedpara.substr(0, modifiedpara.indexOf(" ") + 1);

        if (startword == deleteData) {
            modifiedpara = modifiedpara.replace(deleteData,"");
            document.querySelector(".para-type").innerHTML = modifiedpara;
            minusString = userType;
        } else if (startword != deleteData && userType != deleteData) {
            document.querySelector(".error-bundle").innerHTML = document.querySelector(".error-bundle").innerHTML
            + `<span class="error-word">${deleteData}</span>`;
            document.querySelector(".type-area").value = minusString;
            mistakeCount += 1;
            modifiedpara.replace([`<span class="highlight">` + deleteData + `</span>`],"");
            document.querySelector(".para-type").innerHTML = modifiedpara;
        } else {
            document.querySelector(".type-area").value = minusString;
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
    modifiedpara = infinityPara;
    minusString = "";
    typingStarted = false;
    reset();
}

function resetTimeMode() {
    typingStarted = false;
    clearInterval(ticktock);
    document.querySelector(".type-here-div").style.visibility = "visible";
    document.querySelector(".para-type").innerHTML = infinityPara;


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

    modifiedpara = infinityPara;
    minusString = "";
    mistakeCount = 0;
}

document.querySelector(".reset-time-mode").addEventListener("click",resetTimeMode);



var min = 0;
var sec = 0;
var clocking;
var totalCharslnf = 0;



var random = Math.floor(Math.random () *5 + 1) - 1;
document.querySelector(".infinity-user-type").innerText = samples[random];


document.querySelector("#infinity-mode-btn").addEventListener("click",() => {
    setDefault();
    resetTimeMode();
});

function renderSamples() {
    const sampleList = document.querySelector("#samples-list");
    if (!sampleList) return;
    sampleList.innerHTML = samples
        .map((text, index) => {
            const preview = text.length > 100 ? text.slice(0, 100) + "..." : text;
            return `<button type="button" class="sample-item btn" data-index="${index}">${preview}</button>`;
        })
        .join("");
}

function selectSample(index) {
    if (index < 0 || index >= samples.length) return;
    random = index;
    document.querySelector(".infinity-user-type").innerText = samples[random];
    reset();
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
        if (category === "custom") {
            showCustomInput();
        } else {
            renderSamples();
            showSamples();
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
        samples.push(customText);
        random = samples.length - 1;
        document.querySelector(".infinity-user-type").innerText = customText;
        reset();
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
        text = samples[random];
        clearInterval(clocking);
        text = text.replace(
            userInput, '<span class="highlight-final">' + userInput + "</span>" 
        );
        document.querySelector(".infinity-user-type").innerHTML = text;
        document.querySelector(".infinity-type-area").disabled = true;

        document.querySelector(".showbox").style.visibility = "visible";
        let myPromise = new Promise(function (myResolve, myReject) {
            setTimeout(function () {
                myResolve(clearLoader);
            }, 5000);
        });
        myPromise.then((result) => {
            clearLoader();
        });

        document.querySelector("#infinity-mode").scrollIntoView();
        result();
    } else if (para.includes(userInput)) {
        document.querySelector(".infinity-type-area").style.borderColor = "#F97316";
        text = samples[random];
        text = text.replace(
            userInput, '<span class="highlight">' + userInput + "</span>"
        );
        document.querySelector(".infinity-user-type").innerHTML = text;
    } else {
        // Error - turn border red
        if (
            document.querySelector(".infinity-type-area").style.borderColor == "#EA580C") {
                mistakeCount += 1;
            }
            document.querySelector(".infinity-type-area").style.borderColor = "#DC2626";
    }
}

document.querySelector(".start").addEventListener("click", start);
document.querySelector(".reset").addEventListener("click", reset);
document.querySelector(".infinity-type-area").addEventListener("input",checkUserInputInfinity);

function result () {
    var totalTime = parseInt(min) + parseInt(sec)/60;
    if (totalTime <= 0) {
        totalTime = 1/60; // prevent division by zero for very fast completions
    }
    var wpm = calculateWPM(samples[random],totalTime).toFixed(2);
    var cpm = calculateCPM(totalCharslnf, totalTime).toFixed(2);
    var accuracy = calculateAccuracy(samples[random],totalCharslnf).toFixed(2);

    document.querySelector("#timer-wpm-inf").innerText = wpm;
    document.querySelector("#timer-cpm-inf").innerText = cpm;
    document.querySelector("#timer-accuracy-inf").innerText = accuracy;
    document.querySelector(".infinity-mode-section .result p").innerText = `Results ready! WPM: ${wpm}, CPM: ${cpm}, Accuracy: ${accuracy}%`;
}

