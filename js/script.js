let fullName = document.getElementById("name");
let emailAddress = document.getElementById("email");
let userMessage = document.getElementById("message");
let form = document.querySelector("form");
let error = document.getElementById("error");

(function () {
    emailjs.init("i4cQnzt-cHd1N6PG-");
})();

const sendMail = () => {
    let params = {
        name: fullName.value.trim(),
        email: emailAddress.value.trim(),
        message: userMessage.value.trim(),
    };

    const serviceID = "service_lws6z9c";
    const templateID = "template_sxol5a4";

    emailjs
        .send(serviceID, templateID, params)
        .then((res) => {
            fullName.value = "";
            emailAddress.value = "";
            userMessage.value = "";
            Swal.fire("Thank You!", "I contact you shortly", "success");
        })
        .catch((err) => {
            console.log(err);
        });
};

const validate = (element, message) => {
    element.classList.add("border-danger");
    error.innerHTML = info;
};

const removeError = (element) => {
    element.classList.remove("border-danger");
};

form.addEventListener("submit", (e) => {
    e.preventDefault();

    var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
    var regName = /\d+$/g;

    let name = fullName.value.trim();
    let email = emailAddress.value.trim();
    let message = userMessage.value.trim();

    if (name.length < 3 || regName.test(name) || name === "") {
        info = "Username name required or No character or Number should be there";
        validate(fullName, info);
    } else if (!regEmail.test(email) || email === "") {
        info = "Invalid Email Address or spelled incorrectly";
        validate(emailAddress, info);
    } else if (message.length < 10) {
        info = "Message should be at least 5 words";
        validate(userMessage, info);
    } else {
        removeError(fullName);
        removeError(emailAddress);
        removeError(userMessage);
        error.innerHTML = "";
        sendMail();
    }
});
