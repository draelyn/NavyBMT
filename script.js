// Log to ensure the script is loaded
console.log("Script loaded successfully!");

// Countdown Timer Function
function countdown() {
    const targetDate = new Date("January 21, 2025 09:00:00 GMT-0500").getTime();
    setInterval(function() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("countdown").innerHTML = 
            `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;

        if (timeLeft < 0) {
            document.getElementById("countdown").innerHTML = "The day has arrived!";
        }
    }, 1000);
}
countdown();

// Sticky Notes Functionality
document.getElementById("postButton").addEventListener("click", postMessage);
const messageInput = document.getElementById("messageInput");
const fromInput = document.getElementById("fromInput");
const charCounter = document.getElementById("charCounter");
const charLimitMessage = document.getElementById("charLimitMessage");

messageInput.addEventListener("input", () => {
    const currentLength = messageInput.value.length;
    charCounter.textContent = `${currentLength}/150`;

    if (currentLength > 150) {
        charLimitMessage.textContent = "Message cannot exceed 150 characters.";
    } else {
        charLimitMessage.textContent = "";
    }
});

function postMessage() {
    const message = messageInput.value;
    const from = fromInput.value;

    if (message.length > 150) {
        charLimitMessage.textContent = "Message cannot exceed 150 characters.";
        return;
    }

    if (message.trim() !== "") {
        createStickyNote(from, message);
        messageInput.value = "";
        fromInput.value = "";
        charCounter.textContent = "0/150";
    }
}

function createStickyNote(from, message) {
    const note = document.createElement("div");
    note.className = "sticky-note";

    const fromText = document.createElement("div");
    fromText.className = "from-text";
    fromText.textContent = from ? `From: ${from}` : "";

    note.appendChild(fromText);
    note.appendChild(document.createTextNode(message));

    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    note.style.backgroundImage = `url('${backgroundImages[randomIndex]}')`;

    note.style.left = Math.random() * (window.innerWidth - 100) + "px";
    note.style.top = Math.random() * (window.innerHeight - 100) + "px";

    note.addEventListener("mousedown", mouseDown);
    note.addEventListener("touchstart", touchStart);

    document.body.appendChild(note);
}

let dragNote = null;

function mouseDown(event) {
    dragNote = event.target;
    dragNote.style.zIndex = 10;
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
    mouseMove(event);
    event.preventDefault();
}

function mouseMove(event) {
    if (dragNote) {
        dragNote.style.left = `${event.clientX - (dragNote.clientWidth / 2)}px`;
        dragNote.style.top = `${event.clientY - (dragNote.clientHeight / 2)}px`;
    }
}

function mouseUp() {
    if (dragNote) {
        dragNote.style.zIndex = "";
    }
    dragNote = null;
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
}

function touchStart(event) {
    dragNote = event.target;
    dragNote.style.zIndex = 10;
    document.addEventListener("touchmove", touchMove);
    document.addEventListener("touchend", touchEnd);
    touchMove(event);
    event.preventDefault();
}

function touchMove(event) {
    if (dragNote) {
        const touch = event.touches[0];
        dragNote.style.left = `${touch.clientX - (dragNote.clientWidth / 2)}px`;
        dragNote.style.top = `${touch.clientY - (dragNote.clientHeight / 2)}px`;
    }
}

function touchEnd() {
    if (dragNote) {
        dragNote.style.zIndex = "";
    }
    dragNote = null;
    document.removeEventListener("touchmove", touchMove);
    document.removeEventListener("touchend", touchEnd);
}
