var samples = [
    "In today's fast-paced digital world, learning to type efficiently has become an essential skill for students, professionals, and anyone who spends time on a computer. Developing strong typing habits not only improves speed but also increases accuracy and productivity in everyday tasks. Whether you are writing emails, coding software, preparing reports, or chatting with friends, the ability to type quickly and confidently can save valuable time and reduce frustration. Consistent practice helps build muscle memory, allowing fingers to move naturally across the keyboard without constantly searching for each key"
    , "Many successful people dedicate a few minutes each day to improving their typing skills because even small improvements can lead to significant gains over time. Patience and regular practice are more important than rushing, as accuracy should always come before speed. By challenging yourself with different kinds of text and gradually increasing your pace, you can develop a smooth and reliable typing style that benefits you in school, work, and everyday life. Remember that progress does not happen overnight, but with persistence and dedication, anyone can become a faster and more accurate typist while gaining confidence and efficiency in the process.",
    "Technology has transformed the way people communicate, learn, and solve problems in the modern world. From smartphones and laptops to cloud computing and artificial intelligence, digital tools have become deeply integrated into everyday life. Students can access educational resources from anywhere, businesses can collaborate across continents, and individuals can share ideas instantly with people around the globe. Despite these advancements, the importance of creativity, critical thinking, and human connection remains unchanged. Technology should be viewed as a tool that enhances productivity and opens new opportunities rather than something that replaces genuine effort and curiosity. As innovation continues to accelerate, adapting to change and continuously learning new skills will become increasingly valuable. Those who embrace lifelong learning and maintain a willingness to explore new ideas are more likely to succeed in a constantly evolving world where opportunities often arise from unexpected places."
    , "A peaceful morning often begins with the gentle sound of birds singing and sunlight slowly filling the sky with warm colors. Many people enjoy starting their day with a simple routine that includes exercise, reading, or planning their goals before work or school. Establishing positive habits can improve focus, reduce stress, and create a sense of balance throughout the day. Even small actions, such as drinking enough water, organizing a workspace, or taking short breaks between tasks, can have a meaningful impact on overall well-being. Success is rarely the result of a single extraordinary event; instead, it is usually built through consistent effort and discipline over time. By staying patient and maintaining a positive mindset, individuals can overcome challenges, learn from mistakes, and steadily move closer to achieving their personal and professional aspirations while enjoying the journey along the way.",
    "Throughout history, exploration and curiosity have driven humanity to discover new lands, develop groundbreaking inventions, and expand the boundaries of knowledge. Great achievements are often the result of countless small efforts combined with determination and perseverance. Scientists, artists, engineers, and writers all contribute to society in unique ways, inspiring future generations to dream bigger and think differently."

]

var infinityPara = "In a world where information travels faster than ever before, the ability to focus, learn, and adapt has become one of the most valuable skills a person can possess. Every day presents countless opportunities to discover something new, whether it involves mastering a technical skill, reading an interesting book, exploring a different culture, or simply having meaningful conversations with people who offer unique perspectives. Success is rarely achieved through luck alone; instead, it is often the result of consistent effort, patience, and the willingness to keep moving forward despite obstacles and setbacks. People who embrace lifelong learning tend to develop stronger problem-solving abilities and greater confidence in their decisions because they understand that growth is a continuous process rather than a final destination. Modern technology has made knowledge more accessible than ever, allowing students, professionals, and curious minds to access educational resources from virtually anywhere in the world. However, while digital tools provide convenience and efficiency, qualities such as creativity, empathy, discipline, and critical thinking remain uniquely human strengths that cannot easily be replaced."

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
    var classes = e.target.classList.value.split("");
    if (!(classes.includes("option") || classes.includes("show-time-modes"))) {
        document.querySelector(".show-time-modes").classList.remove("selected");
        document.querySelector(".infinity-mode").classList.remove("hide");
        var options = document
            .querySelector(".test-options")
            .querySelectorAll("option");
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
        ("#clock-time-mode").innerHTML = `<p>${time}<span class="mini"><br>min</span></p>`;
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

    