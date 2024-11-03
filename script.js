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
document.getElementById("postButton").addEventListener("click", function() {
    const message = document.getElementById("messageInput").value;
    if (message.trim() !== "") {
        createStickyNote(message);
        document.getElementById("messageInput").value = "";
    }
});

function createStickyNote(message) {
    const note = document.createElement("div");
    note.className = "sticky-note";
    note.textContent = message;

    // Make the note draggable
    note.style.left = Math.random() * 500 + "px"; // Random starting position
    note.style.top = Math.random() * 200 + "px"; // Random starting position
    note.draggable = true;

    note.addEventListener("dragstart", dragStart);
    note.addEventListener("dragend", dragEnd);

    document.getElementById("messageBoard").appendChild(note);
}

let dragNote = null;
function dragStart(event) {
    dragNote = event.target;
    event.dataTransfer.setData("text/plain", "");
}

function dragEnd(event) {
    const x = event.clientX;
    const y = event.clientY;
    dragNote.style.left = `${x}px`;
    dragNote.style.top = `${y}px`;
    dragNote = null;
}
