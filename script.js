// Navigation Active Button
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll("nav li");

window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach(section => {
        const top = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;

        if (window.scrollY >= top && window.scrollY < bottom) {
            currentSection = section.id;
        }
    });

    navItems.forEach(item => {
        const link = item.querySelector("a");
        item.classList.toggle(
            "active",
            link?.getAttribute("href") === `#${currentSection}`
        );
    });
});


// Smooth Navigation
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        const target = document.querySelector(link.getAttribute("href"));

        target?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});


// Profile Picture Effect
const profile = document.querySelector("#Home .image-container");

profile?.addEventListener("click", () => {
    profile.classList.toggle("picture-active");
});



/* ========================================
   QUIZ IMAGE PREVIEW MODAL
======================================== */

/* =========================================================
   QUIZ & EXAM IMAGE PREVIEW MODAL
========================================================= */

// Select quiz and exam image links
const previewLinks = document.querySelectorAll(
    ".quiz-box .quiz-image-link, #Exam .exam-image-link"
);

// Create modal
const modal = document.createElement("div");
modal.className = "image-modal";

modal.innerHTML = `
    <div class="image-modal-content">
        <button
            class="close"
            type="button"
            aria-label="Close image preview"
        >&times;</button>

        <img src="" alt="Image Preview">
    </div>
`;

document.body.appendChild(modal);

const modalImage = modal.querySelector("img");
const closeButton = modal.querySelector(".close");

// Open preview
function openImagePreview(image) {
    modalImage.src = image.src;
    modalImage.alt = image.alt || "Image Preview";

    modal.classList.add("show");
    document.body.style.overflow = "hidden";
}

// Close preview
function closeImagePreview() {
    modal.classList.remove("show");
    modalImage.src = "";
    document.body.style.overflow = "";
}

// Handle Quiz and Exam images
previewLinks.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        const image = link.querySelector("img");

        if (image) {
            openImagePreview(image);
        }
    });
});

// Close button
closeButton.addEventListener("click", closeImagePreview);

// Close when clicking the dark background
modal.addEventListener("click", event => {
    if (event.target === modal) {
        closeImagePreview();
    }
});

// Close with Escape key
document.addEventListener("keydown", event => {
    if (
        event.key === "Escape" &&
        modal.classList.contains("show")
    ) {
        closeImagePreview();
    }
});
