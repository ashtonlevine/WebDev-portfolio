
document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting and reloading the page

    // Get user input from the form
    const petType = document.querySelector('input[name="pet"]:checked')?.value.toLowerCase(); // "dog" or "cat"
    const dogBreed = document.getElementById("dogbreed").value.toLowerCase(); // Selected dog breed
    const catBreed = document.getElementById("catbreed").value.toLowerCase(); // Selected cat breed
    const age = document.getElementById("age").value.toLowerCase(); // "young", "adult", "senior", or "none"
    const gender = document.querySelector('input[name="gender"]:checked')?.value.toLowerCase(); // "male", "female", or "none"
    const behaviors = Array.from(document.querySelectorAll('input[name="behaviour"]:checked')).map(
        checkbox => checkbox.value.toLowerCase()
    ); // Selected behaviors

    //convert numeric age to a category (young, adult, senior)
    function getAgeCategory(numericAge) {
        const ageNum = parseInt(numericAge);
        if (isNaN(ageNum)) return "";
        if (ageNum <= 1) return "young";
        if (ageNum >= 2 && ageNum <= 8) return "adult";
        return "senior";
    }

    // Get all pet fieldsets (which have class "pets")
    const pets = document.querySelectorAll(".pets");

    pets.forEach((pet) => {
        const type = pet.dataset.type.toLowerCase();     
        const breed = pet.dataset.breed.toLowerCase();      
        const petGender = pet.dataset.gender.toLowerCase(); 
        const petAge = pet.dataset.age.toLowerCase();       
        const petBehaviour = pet.dataset.behaviour.toLowerCase().trim(); 

        // Convert pet's numeric age to a category
        const petAgeCategory = getAgeCategory(petAge);

        let matches = true;

        // Check pet type match
        if (petType && petType !== type) {
            matches = false;
        }

        // Check breed match for dog or cat respectively
        if (petType === "dog" && dogBreed !== "none" && !breed.includes(dogBreed)) {
            matches = false;
        }
        if (petType === "cat" && catBreed !== "none" && !breed.includes(catBreed)) {
            matches = false;
        }

        // Check age category match
        if (age !== "none" && petAgeCategory !== age) {
            matches = false;
        }

        // Check gender match using strict equality (rather than .includes)
        if (gender && gender !== "none" && petGender !== gender) {
            matches = false;
        }

        // Check behavior match:
        // If the pet's behaviour is "all", it matches any behavior criteria.
        if (behaviors.length > 0) {
            let behaviorMatches = false;
            if (petBehaviour === "all") {
                behaviorMatches = true;
            } else {
                // Require the pet's behaviour to contain every one of the selected behaviors.
                behaviorMatches = behaviors.every(behavior => petBehaviour.includes(behavior));
            }
            if (!behaviorMatches) {
                matches = false;
            }
        }

        // Toggle pet display based on the match result
        pet.style.display = matches ? "block" : "none";
    });
});

// Reset event: Show all pets when the form is reset
document.getElementById("form").addEventListener("reset", function () {
    const pets = document.querySelectorAll(".pets");
    pets.forEach((pet) => {
        pet.style.display = "block";
    });
});
