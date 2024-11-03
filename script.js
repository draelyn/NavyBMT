// Log to ensure the script is loaded
console.log("Script loaded successfully!");

// Countdown Timer Function
function countdownTimer() {
    const targetDate = new Date("January 21, 2025 09:00:00 GMT-0600").getTime(); // Adjusted to the correct time zone

    setInterval(function() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        if (timeLeft > 0) {
            // Time calculations
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            // Display the countdown
            document.getElementById("countdown").innerHTML = 
                `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
        } else {
            // If the countdown is finished
            document.getElementById("countdown").innerHTML = "The day has arrived!";
        }
    }, 1000);
}

// Run the countdown function
countdownTimer();

// Firebase configuration with your credentials
const firebaseConfig = {
    apiKey: "AIzaSyDxqWNg1KQ39ekutFXlqApfFJNpNj8yJeY",
    authDomain: "note-cb603.firebaseapp.com",
    databaseURL: "https://note-cb603-default-rtdb.firebaseio.com",
    projectId: "note-cb603",
    storageBucket: "note-cb603.firebasestorage.app",
    messagingSenderId: "571626972835",
    appId: "1:571626972835:web:fc4c1f9c38d9e5287b8116",
    measurementId: "G-4NNPF6PH0B"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Function to add a message to Firebase
function addMessage() {
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value.trim();

    if (message !== "") {
        // Create a new message entry in Firebase
        const messageRef = database.ref("sticky-notes").push();
        messageRef.set({
            message: message,
            left: Math.random() * 500, // Random position for demonstration
            top: Math.random() * 200
        });

        messageInput.value = ""; // Clear the input
    }
}

// Function to load messages from Firebase
function loadMessages() {
    const messageBoard = document.getElementById("messageBoard");
    messageBoard.innerHTML = ""; // Clear existing messages

    // Listen for updates in the "sticky-notes" data
    database.ref("sticky-notes").on("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const noteData = childSnapshot.val();
            createStickyNoteElement(noteData.message, noteData.left, noteData.top);
        });
    });
}

// Function to create a sticky note element on the page
function createStickyNoteElement(message, left, top) {
    const note = document.createElement("div");
    note.className = "sticky-note";
    note.textContent = message;
    note.style.left = `${left}px`;
    note.style.top = `${top}px`;
    note.style.position = "absolute"; // Make notes movable
    document.getElementById("messageBoard").appendChild(note);
}

// Add event listener to the "Post Message" button
document.getElementById("postButton").addEventListener("click", addMessage);

// Load messages when the page loads
window.onload = loadMessages;
