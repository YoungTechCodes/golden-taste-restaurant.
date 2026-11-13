
// ENTER THE RESTAURANT'S APPROVED WHATSAPP NUMBER
// Nigerian format: 234 followed by the phone number.
// Do not include +, spaces or the first 0.
const RESTAURANT_WHATSAPP = "2349133819307";

// MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("open");

        const isOpen = navLinks.classList.contains("open");
        menuToggle.textContent = isOpen ? "×" : "☰";
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
}

// CLOSE MOBILE MENU AFTER CLICKING A LINK
if (navLinks) {
    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");

            if (menuToggle) {
                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    });
}

// WHATSAPP ORDERING
function sendWhatsApp(message) {
    const phone = RESTAURANT_WHATSAPP.trim();

    if (
        phone === "234XXXXXXXXXX" ||
        phone.length < 10 ||
        phone.length > 15 ||
        isNaN(Number(phone))
    ) {
        alert("Please enter the restaurant's approved WhatsApp number in script.js.");
        return;
    }

    const whatsappURL =
        "https://wa.me/" + phone +
        "?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
}

// FOOD ORDER BUTTONS
document.querySelectorAll(".order-btn").forEach(function (button) {
    button.addEventListener("click", function () {
        const food = button.dataset.item;
        const price = button.dataset.price;

        const message =
            "Hello Golden Taste Restaurant! I would like to order " +
            food + " for ₦" + Number(price).toLocaleString("en-NG") +
            ". Please confirm availability.";

        sendWhatsApp(message);
    });
});

// MENU SEARCH
const menuSearch = document.getElementById("menuSearch");
const foodCards = document.querySelectorAll("[data-food]");
const noResults = document.getElementById("noResults");

if (menuSearch) {
    menuSearch.addEventListener("input", function () {
        const searchText = menuSearch.value.toLowerCase().trim();
        let found = 0;

        foodCards.forEach(function (card) {
            const matches = card.textContent.toLowerCase().includes(searchText);

            card.hidden = !matches;

            if (matches) {
                found++;
            }
        });

        if (noResults) {
            noResults.hidden = found !== 0;
        }
    });
}

// CONTACT FORM
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("customerName").value.trim();
        const email = document.getElementById("customerEmail").value.trim();
        const message = document.getElementById("customerMessage").value.trim();
        const formMessage = document.getElementById("formMessage");

        if (!name || !email || !message) {
            formMessage.textContent = "Please complete all fields.";
            return;
        }

        const whatsappMessage =
            "Hello Golden Taste Restaurant!" +
            "\nName: " + name +
            "\nEmail: " + email +
            "\nMessage: " + message;

        formMessage.textContent = "Opening WhatsApp to send your message...";

        sendWhatsApp(whatsappMessage);
    });
}

// AUTOMATIC FOOTER YEAR
document.querySelectorAll(".year").forEach(function (element) {
    element.textContent = new Date().getFullYear();
});
