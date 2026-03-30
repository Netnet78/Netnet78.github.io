const greetingContainer = document.querySelector(".greeting-container");
const greetingText = document.getElementById("greetingText");
const buttonsContainer = document.querySelector(".buttons-container");
const isHerButton = document.getElementById("isHer");
const isNotHerButton = document.getElementById("isNotHer");
const inputContainer = document.querySelector(".input-container");
const inputBox = document.getElementById("nameInput");
const nextButton = document.getElementById("nextButton");
const presentContainer = document.querySelector(".present-container");
const giftBox = document.getElementById("giftBox");
const message = document.getElementById("message");
const instructionMessage = document.getElementById("instructionMessage");
const giftItem = document.getElementById("giftItem");
const playButton = document.getElementById("playButton");

// Birthday person's name and passwords
const birthdayPerson = "ផាន់នី";
const passwords = ["15/6/2025"];

// Load sounds
const textSound = new Audio("./audio/text_sound.mp3");
const scaryBackgroundMusic = new Audio("./audio/another_him.mp3");
const backgroundMusic = new Audio("./audio/backgroundMusic.mp3");
const applauseSound = new Audio("./audio/applause.mp3");
const punchSound = new Audio("./audio/punch.mp3");
const boomSound = new Audio("./audio/boom.mp3");

// Sounds configuration
scaryBackgroundMusic.loop = true;
scaryBackgroundMusic.volume = 0.45;
backgroundMusic.loop = true;
backgroundMusic.volume = 0.45;

// Load videos
const video = document.getElementById("fullscreenVideo");

function playJumpscare() {
  video.classList.add("visible-video");
  video.classList.remove("hidden-video");

  video.play().catch((err) => {
    console.error("Video failed to play:", err);
  });
}

let username = "";

/* Greeting section (Before showing up the main section) */
const messages = [
  "👋 Hello ជម្រាបសួរ",
  "សូមស្វាគមន៌មកកាន់ Website របស់ខ្ញុំ",
  "ខ្ញុំបានរៀបចំគេហទំព័រមួយនេះឡើងដើម្បីមនុស្សម្នាក់",
  "ខ្ញុំប្រាកដថាអ្នកស្គាល់ខ្ញុំថាជានរណាហើយ ប៉ុន្តែខ្ញុំមិនប្រាកដថាស្គាល់អ្នកទេ",
  "ខ្ញុំចង់ដឹងឈ្មោះរបស់អ្នក តើអ្នកជានរណាគេទៅ?",
];

const notLyhourMessages = [
  "...",
  "...!",
  () => `Hello, ${username}`,
  "តើកំពុងតែមានអារម្មណ៍យ៉ាងណាដែរ?",
  "...",
  "ឥឡូវនេះ ខ្ញុំចង់សួរថា...",
  () => `ត្រៀមខ្លួនហើយឬនៅ, ${username}?`,
];
// const notLyhourMessages = [
//   () => `${username} ?`,
//   () => "hmm....",
//   () => `${username} តើយើងស្គាល់គ្នាដែរឬទេ?`,
//   () => ".......",
//   () => "Okay...",
//   () => "មិនអីទេ នរណាគេក៏អាចចូលរួមពិធីខួបកំណើតនេះបានដែរ",
//   () =>
//     "ឥឡូវនេះកុំឱ្យខាតពេលយូរ ខ្ញុំមានកាដូពិសេសមួយសម្រាប់មិត្តភក្តិរបស់ខ្ញុំដែលមានឈ្មោះថា... 🎊✨",
//   () => `${birthdayPerson}`,
// ];

const isLyhourMessages = [
  "តើគាត់ជា *មនុស្សម្នាក់នឹង* មែនទេ?",
  "...!",
  "hmmm...",
  "......",
  "ប្រសិនបើអ្នកជា*មនុស្សម្នាក់នឹង*មែន ប្រាប់ខ្ញុំពីអ្វីដែលមានតែ*មនុស្សម្នាក់នឹង*ទេដែលអាចដឹង",
];

const notHerMessages = ["...", "......", "..........", "ចម្លើយមិនត្រឹមត្រូវ"];

const actuallyHerMessages = [
  "...",
  "...!",
  () => `Hello, ${birthdayPerson}`,
  "ខ្ញុំចង់សួរថា...",
  () => `ត្រៀមខ្លួនហើយឬនៅ, ${birthdayPerson}?`,
];

let typeDelay = 80;
let callbackDelay = 2500;

let currentMessage = 0;
function showGreetingMessages() {
  if (currentMessage >= messages.length) {
    // All messages shown, reveal the present
    greetingText.classList.add("float-up");
    greetingText.style.top = "40%";
    buttonsContainer.style.display = "flex";
    setTimeout(() => {
      isHerButton.classList.add("opacity-one-transition");
    }, 1000);
    setTimeout(() => {
      isNotHerButton.classList.add("opacity-one-transition");
    }, 2000);
    return;
  }

  typeText(greetingText, messages[currentMessage], typeDelay, () => {
    currentMessage++;
    setTimeout(showGreetingMessages, callbackDelay); // short delay before next message
  });
}

// Messages shown if the user pressed the "isHer" button
let currentLyhourMessage = 0;
function showLyhourMessages() {
  playMessages(isLyhourMessages);
}

// This function will trigger if the user press on "isNotHer" button
let notLyhourButtonClicked = false;
function notLyhourResponse() {
  if (notLyhourButtonClicked) {
    return;
  }

  notLyhourButtonClicked = true;

  isHerButton.classList.add("opacity-zero-transition");
  setTimeout(() => {
    isNotHerButton.classList.add("move-to-left");
  }, 1000);
  setTimeout(() => {
    isHerButton.style.opacity = "0";
    isHerButton.classList.add("disable-mouse-events");
  }, 1500);
  setTimeout(() => {
    isNotHerButton.style.color = "#ff00ff";
    isNotHerButton.style.borderColor = "#ff00ff";
    isNotHerButton.style.boxShadow = "0 0 12px rgba(255, 0, 255, 0.5)";
    isNotHerButton.style.cursor = "default";
  }, 2000);
  setTimeout(() => {
    inputContainer.style.display = "flex";
  }, 2500);
  setTimeout(() => {
    inputContainer.style.opacity = "1";
  }, 2600);
}

// This function will trigger if the user press on "isHer" button
let isLyhourButtonClicked = false;
function isLyhourResponse() {
  if (isLyhourButtonClicked) {
    return;
  }

  isLyhourButtonClicked = true;

  // Disable the input for a few seconds
  nextButton.classList.add("disabled");
  inputBox.classList.add("disabled");
  inputBox.value = "សូមកុំទាន់សរសេរ! ស្ដាប់ខ្ញុំនិយាយសិន!";

  isNotHerButton.classList.add("opacity-zero-transition");
  setTimeout(() => {
    isHerButton.classList.add("move-to-right");
  }, 1000);
  setTimeout(() => {
    isNotHerButton.style.opacity = "0";
    isNotHerButton.classList.add("disable-mouse-events");
  }, 1500);
  setTimeout(() => {
    isHerButton.style.color = "#ff00ff";
    isHerButton.style.borderColor = "#ff00ff";
    isHerButton.style.boxShadow = "0 0 12px rgba(255, 0, 255, 0.5)";
    isHerButton.style.cursor = "default";
  }, 2000);
  setTimeout(() => {
    inputContainer.style.display = "flex";
  }, 2500);
  setTimeout(() => {
    inputContainer.style.opacity = "1";
  }, 2600);

  setTimeout(() => {
    playMessages(isLyhourMessages, 0, () => {
      // Set up a separate handler for "Next" when confirming "isHer"
      nextButton.classList.remove("disabled");
      inputBox.classList.remove("disabled");
      inputBox.value = "";

      nextButton.removeEventListener("click", nextButtonHandlerNotHer);
      nextButton.addEventListener("click", nextButtonHandlerIsHer);
    });
  }, 3000);
}

// This function will trigger after the notLyhourResponse
// Basically after they confirm their name
let currentNotLyhourMessage = 0;
function showNotLyhourMessage() {
  playMessages(notLyhourMessages, 0, () => {
    setTimeout(() => {
      greetingContainer.classList.add("opacity-zero-transition");
      greetingContainer.style.display = "none";
      presentContainer.style.display = "block";
      setTimeout(() => {
        scaryBackgroundMusic.pause();
        backgroundMusic.play();
        presentContainer.classList.add("opacity-one-transition");
      }, 1000);
    }, 1000);
  });
}

// Generic function of playing messages
function playMessages(messages, index = 0, onComplete = null) {
  if (index >= messages.length) {
    if (onComplete) onComplete();
    return;
  }

  const message =
    typeof messages[index] === "function" ? messages[index]() : messages[index];

  typeText(greetingText, message, typeDelay, () => {
    setTimeout(() => {
      playMessages(messages, index + 1, onComplete);
    }, callbackDelay);
  });
}

// Typing animation
function typeText(element, text, delay = 100, callback = null) {
  element.textContent = "";
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, delay);
    } else if (callback) {
      callback();
    }
  }
  type();
}

isHerButton.addEventListener("click", isLyhourResponse);

isNotHerButton.addEventListener("click", notLyhourResponse);

// Next button function for handling of they already pressed isNotHer
function nextButtonHandlerNotHer() {
  if (inputBox.value == "") {
    window.alert("សូមបញ្ចូលឈ្មោះរបស់អ្នក!");
    return;
  }
  if (nextButtonClicked) return;

  nextButtonClicked = true;
  username = inputBox.value;

  buttonsContainer.classList.add("opacity-zero-transition");
  buttonsContainer.style.pointerEvents = "none";

  setTimeout(() => {
    buttonsContainer.style.display = "none";
    inputContainer.classList.add("opacity-zero-transition");
  }, 1000);

  setTimeout(() => {
    inputContainer.style.display = "none";
  }, 2000);

  greetingText.classList.remove("float-up");
  greetingText.classList.add("float-down");
  greetingText.style.top = "50%";

  setTimeout(() => {
    showNotLyhourMessage();
  }, 2500);
}

// Next button function for handling of they already pressed isHer
function nextButtonHandlerIsHer() {
  if (inputBox.value == "") {
    window.alert("សូមបំពេញនៅក្នុងប្រអប់សរសេរ!");
    return;
  }
  if (nextButtonClicked) return;

  nextButtonClicked = true;
  inputValue = inputBox.value;

  buttonsContainer.classList.add("opacity-zero-transition");
  buttonsContainer.style.pointerEvents = "none";

  setTimeout(() => {
    buttonsContainer.style.display = "none";
    inputContainer.classList.add("opacity-zero-transition");
  }, 1000);

  setTimeout(() => {
    inputContainer.style.display = "none";
  }, 2000);

  greetingText.classList.remove("float-up");
  greetingText.classList.add("float-down");
  greetingText.style.top = "50%";

  setTimeout(() => {
    let isValid = false;
    for (i = 0; i < passwords.length; i++) {
      if (inputValue == passwords[i]) {
        isValid = true;
        console.log("Password Check: True");
        break;
      }
      console.log("Access denied");
    }

    if (isValid == false) {
      scaryBackgroundMusic.volume = 0;
      scaryBackgroundMusic.pause();
      playMessages(notHerMessages, 0, () => {
        greetingContainer.style.display = "none";
        playJumpscare();
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      });
      return;
    }
    playMessages(
      actuallyHerMessages,
      0,
      (onComplete = () => {
        setTimeout(() => {
          scaryBackgroundMusic.pause();
          backgroundMusic.play();

          greetingContainer.classList.add("opacity-zero-transition");
          greetingContainer.style.display = "none";
          presentContainer.style.display = "block";
          setTimeout(() => {
            presentContainer.classList.add("opacity-one-transition");
          }, 1000);
        }, 1000);
      }),
    );
  }, 2500);
}

let nextButtonClicked = false;
nextButton.addEventListener("click", nextButtonHandlerNotHer);

/* Gift box section (Main section) */
let shakes = 0;
const shakesNeeded = 3;
let isShaking = false;

giftBox.addEventListener("click", () => {
  // ប្រសិនបើកាដូកំពុងតែបើក នោះវានឹងចាកចេញពី function
  // ដើម្បីការពារកុំឱ្យអ្នកប្រើប្រាស់ចុចលើវាច្រើនដងពេក
  if (isShaking) return;
  isShaking = true;

  // Confetti burst
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.5 },
  });

  if (shakes >= 2) {
    boomSound.play();
  } else {
    punchSound.play();
  }

  giftBox.classList.add("shake");

  setTimeout(() => {
    giftBox.classList.remove("shake");
    shakes++;
    isShaking = false;

    if (shakes >= shakesNeeded) {
      backgroundMusic.volume = 0.15;

      giftBox.style.display = "none"; // or fade it out

      instructionMessage.classList.add("hidden");

      message.classList.remove("hidden");
      message.classList.add("visible");
      typeText(message, "🎉 Happy Birthday, to you! 🥳", typeDelay, () => {
        setTimeout(() => {
          backgroundMusic.volume = 0.25;
          typeText(message, "សុំហាមាត់ បន្តិចបានឬអត់?", typeDelay, () => {
            setTimeout(() => {
              typeText(message, "ហាមិនបានទេ? Okay...", typeDelay, () => {
                setTimeout(() => {
                  typeText(
                    message,
                    "សូមជូនពរឱ្យក្ដីស្រមៃនិងក្ដីសុបិន្តឱ្យក្លាយជាការពិត!",
                    typeDelay,
                    () => {
                      setTimeout(() => {
                        typeText(
                          message,
                          "និងសូមឱ្យជួបរឿងល្អៗនិងមានអ្នកស្រឡាញ់ច្រើនៗ!",
                          typeDelay,
                          () => {
                            setTimeout(
                              () => {
                                playButton.style.display = "block";
                                playButton.style.opacity = "1";
                              },
                              1000 + 1000 + 1000 + 1000,
                            );
                          },
                        );
                      }, 1000 + 1000);
                    },
                  );
                }, 1000 + 1000);
              });
            }, 1000 + 1000);
          });
        }, 1000 + 1000);
      });

      giftItem.style.display = "block";
      setTimeout(() => {
        giftItem.style.opacity = "1";
        applauseSound.play();
      }, 1000);
      // Optional: play a sound or show a celebration
    }
  }, 1000); // Match animation duration
});

playButton.addEventListener("click", () => {
  window.open("../eat_cake_game/", "_self");
});

window.addEventListener("load", () => {
  setTimeout(() => {
    scaryBackgroundMusic.play();
    setTimeout(() => {
      showGreetingMessages();
    }, 3000);
  }, 3000);
});
