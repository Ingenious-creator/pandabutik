const form = document.getElementById("contact-form");

form.addEventListener("submit", function(event) {

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    if (!email && !phone) {

        event.preventDefault();

        alert(
            "Ange antingen en e-postadress eller ett telefonnummer."
        );
    }

});
