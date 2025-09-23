function openInvitation() {
    const overlay = document.getElementById('invitationOverlay');
    const mainContent = document.getElementById('mainContent');

    overlay.classList.add('hidden');
    setTimeout(() => {
        mainContent.classList.add('visible');
        // Enable scrolling
        document.body.style.overflow = 'auto';
        // Start countdown
        startCountdown();
        // Load guest data
        loadGuestData();
    }, 800);
}

// Disable scrolling initially
document.body.style.overflow = 'hidden';

// Countdown timer
function startCountdown() {
    const weddingDate = new Date('November 12, 2025 15:00:00').getTime();

    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerHTML = String(days).padStart(2, '0');
        document.getElementById('hours').innerHTML = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerHTML = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerHTML = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(timer);
            document.getElementById('countdown').innerHTML = "<h3>The Wedding Day is Here!</h3>";
        }
    }, 1000);
}

// Load guest data (placeholder for API)
async function loadGuestData() {
    try {
        // Placeholder for GET API call
        // const response = await fetch('/api/guest-info');
        // const guestData = await response.json();

        // Simulate API response
        const guestData = {
            fullName: "John & Jane Doe"
        };

        document.getElementById('guestName').innerHTML =
            `<strong>Dear ${guestData.fullName},</strong><br>We're excited to celebrate with you!`;
    } catch (error) {
        console.error('Error loading guest data:', error);
        document.getElementById('guestName').innerHTML =
            '<strong>Dear Guest,</strong><br>We\'re excited to celebrate with you!';
    }
}

// RSVP form submission
document.getElementById('rsvpForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = {
        attendance: document.getElementById('attendance').value,
        guests: parseInt(document.getElementById('guests').value),
        wishes: document.getElementById('wishes').value
    };

    try {
        // Placeholder for POST API call
        const response = await fetch('/api/rsvp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        // Simulate successful submission
        alert('Thank you for your RSVP! We can\'t wait to celebrate with you.');
        this.reset();
    } catch (error) {
        console.error('Error submitting RSVP:', error);
        alert('There was an error submitting your RSVP. Please try again.');
    }
});

// Smooth scrolling for any internal links (if added later)
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// my addition
// disabling guest field
const attendanceSelect = document.getElementById("attendance");
const guestsField = document.getElementById("guests");
const wishField = document.getElementById("wish");

attendanceSelect.addEventListener("change", function() {
    if (this.value === "no") {
        guestsField.value = 0;
        guestsField.disabled = true;
        wishField.disabled = true;
    } else {
        guestsField.value = 1;
        guestsField.disabled = false;
        wishField.disabled = false;
    }
});
// disabling guest field


// galery scroll
const gallery = document.querySelector('.gallery');
const galleryContainer = document.querySelector('.gallery-container');

let isDragging = false;
let startX;
let scrollLeft;

// Drag start
gallery.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.pageX - gallery.offsetLeft;
    scrollLeft = gallery.scrollLeft;
    galleryContainer.style.animationPlayState = 'paused';
    gallery.style.cursor = 'grabbing';
});

gallery.addEventListener('mouseleave', () => {
    if (isDragging) stopDrag();
});
gallery.addEventListener('mouseup', stopDrag);

function stopDrag() {
    isDragging = false;
    galleryContainer.style.animationPlayState = 'running';
    gallery.style.cursor = 'grab';
}

// Dragging
gallery.addEventListener('mousemove', e => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - gallery.offsetLeft;
    const walk = x - startX;
    gallery.scrollLeft = scrollLeft - walk;
});

// Touch events
gallery.addEventListener('touchstart', e => {
    isDragging = true;
    startX = e.touches[0].pageX - gallery.offsetLeft;
    scrollLeft = gallery.scrollLeft;
    galleryContainer.style.animationPlayState = 'paused';
});

gallery.addEventListener('touchend', () => {
    isDragging = false;
    galleryContainer.style.animationPlayState = 'running';
});

gallery.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - gallery.offsetLeft;
    const walk = x - startX;
    gallery.scrollLeft = scrollLeft - walk;
});

//galery scroll

// my addition

// my api
// async function fetchWishes() {
//     const wishList = document.getElementById('wishList');
//     const loading = document.getElementById('loading');
//     const error = document.getElementById('error');

//     try {
//         // const response = await fetch('https://api.example.com/wishes'); // Replace with your API URL
//         // if (!response.ok) throw new Error('Network response was not ok');

//         // const wishes = await response.json();

//         wishes = [{
//             name: "Eric",
//             text: "Congrats"
//         }, {
//             name: "Ben",
//             text: "Hell yeah"
//         }];
//         loading.style.display = 'none';
//         // wishList.innerHTML = wishes.map(
//         //     wish => `
//         //         <div>
//         //             <li>${wish.text}</li>
//         //             <li>${wish.text}</li>
//         //         <div>
//         //     `
//         // ).join('');

//         wishList.innerHTML = wishes.map(
//             wish => `
//                 <li>
//                     <div class="wish-name">${wish.name}</div>
//                     <div class="wish-text">${wish.text}</div>
//                 </li>`
//         ).join('');


//     } catch (err) {
//         console.error(err);
//     }
// }

// fetchWishes();

// my api



// read invitation id
let invitationId = null;
document.addEventListener("DOMContentLoaded", () => {
    // Extract invitation ID from URL
    const pathParts = window.location.pathname.split("/");
    invitationId = pathParts[pathParts.length - 1]; // e.g. "abc123"
    // invitationId = 'ayamgoreng';
    console.log("INVITATIONID:", invitationId);

    if (invitationId && invitationId !== "index.html" && invitationId !== "") {
        fetch(`http://localhost:3000/invitation/sangjit/${invitationId}`)
            .then(res => res.json())
            .then(data => {
                if (data.errMsg) {
                    throw new Error(data.errMsg);
                }

                const titleEl = document.getElementById("guestNameTitle");
                titleEl.textContent = `
                    To Mr./Mrs./Ms. 
                    ${data.invitationData.name}
                `;

                const attendanceSelect = document.getElementById("attendance");
                const guestsField = document.getElementById("guests");
                const wishField = document.getElementById("wishes");
                const invitationPaxData = data.invitationData.pax;
                const rsvpButton = document.getElementById("rsvpbutton");
                // Disable button until guest is validated
                if (invitationPaxData) {
                    attendanceSelect.value = "yes";
                    guestsField.value = invitationPaxData;
                    wishField.value = data.invitationData.message;
                    attendanceSelect.disabled = true;
                    guestsField.disabled = true;
                    wishField.disabled = true;
                    rsvpButton.disabled = true;
                }



                // Special message
                if (data.message) {
                    document.getElementById("guestMessage").textContent = data.message;
                    document.getElementById("messageSection").style.display = "block";
                }
            })
            .catch(error => {
                console.error("Error fetching guest name:", error);
                // Redirect on error too
                // window.location.href = "/invitation";
            });
    }
});