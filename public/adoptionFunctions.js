// Function to update the date and time
function updateDateTime() {
    const headerElement = document.getElementById('headerDateTime');
    if (headerElement) {
        const now = new Date();
        const formattedDateTime = now.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        headerElement.textContent = formattedDateTime;
    }
}

// Call the function every second
setInterval(updateDateTime, 1000);

// Initial call to display the date and time immediately
updateDateTime();