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



document.addEventListener("DOMContentLoaded", () => {
    const playButton = document.getElementById("playButton");
    const contentContainer = document.querySelector(".content-container");
    const askToPlayMessage = document.getElementById("askToPlayMessage");

    // Play button on click action
    const playButton_OnClick = () => {
        window.open("./Games/birthday_message/", "_self");
    }

    typeText(askToPlayMessage, "Do you want to play a game with me?", 70, () => {
        setTimeout(() => {
            playButton.style.opacity = "1";
        }, 700);
    });


    playButton.addEventListener("click", playButton_OnClick);
});