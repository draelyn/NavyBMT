console.log("Script loaded successfully!");

function countdownTimer() {
    const targetDate = new Date("January 21, 2025 00:00:00").getTime();
    
    setInterval(function() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        // Time calculations
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Display the countdown
        document.getElementById("countdown").innerHTML = 
            ${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds;

        // If the countdown is finished
        if (timeLeft < 0) {
            document.getElementById("countdown").innerHTML = "The day has arrived!";
        }
    }, 1000);
}

// Run the countdown function
countdownTimer();
