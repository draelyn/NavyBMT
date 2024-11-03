// Log to ensure the script is loaded
console.log("Script loaded successfully!");

// Countdown Timer Function
function countdownTimer() {
    const targetDate = new Date("January 21, 2025 09:00:00 GMT-0600").getTime();

    setInterval(function() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            document.getElementById("countdown").innerHTML = 
                `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
        } else {
            document.getElementById("countdown").innerHTML = "The day has arrived!";
        }
    }, 1000);
}

// Run the countdown function
countdownTimer();
