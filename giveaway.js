document.getElementById("form").addEventListener("submit", function (event) {
    // Get form values
    const choosePet = document.querySelector('input[name="pet"]:checked'); // Selected pet type
    const dogbreed = document.getElementById("dogbreed").value;
    const catbreed = document.getElementById("catbreed").value;
    const otherDogBreed = document.getElementById("otherdog").value.trim();
    const otherCatBreed = document.getElementById("othercat").value.trim();
    const age = document.querySelector('select[name="age"]').value; // Age dropdown
    const preferredGender = document.querySelector('input[name="gender"]:checked'); // Selected gender
    const behavior = Array.from(document.querySelectorAll('input[name="behavior"]:checked')).map(
        (checkbox) => checkbox.value
    ); // Selected behaviors
    const bragAbout = document.getElementById("bragabout").value.trim();
    const fullName = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation


    // Check if a pet type is selected
    if (!choosePet) {
        alert("Please select a type of pet.");
        event.preventDefault();
        return;
    }

    // Validate breed based on the selected pet type
    if (choosePet.value === "dog" && dogbreed === "none" && otherDogBreed === "") {
        alert("Please provide a breed for the dog.");
        event.preventDefault();
        return;
    }

    if (choosePet.value === "cat" && catbreed === "none" && otherCatBreed === "") {
        alert("Please provide a breed for the cat.");
        event.preventDefault();
        return;
    }

    // Validate age
    if (!age) {
        alert("Please select the age of the pet.");
        event.preventDefault();
        return;
    }

    // Validate gender
    if (!preferredGender) {
        alert("Please select a preferred gender.");
        event.preventDefault();
        return;
    }

    // Validate behavior
    if (behavior.length === 0) {
        alert("Please select at least one behavior type.");
        event.preventDefault();
        return;
    }

    // Validate bragAbout
    if (bragAbout === "") {
        alert("Please brag about your pet.");
        event.preventDefault();
        return;
    }

    // Validate full name
    if (fullName === "") {
        alert("Please enter your full name.");
        event.preventDefault();
        return;
    }

    // Validate email
    if (email === "" || !emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        event.preventDefault();
        return;
    }
});