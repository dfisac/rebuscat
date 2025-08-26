// This script injects the header into the page and attaches its behavior
import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

(async () => {
    // Load header HTML
    const headerHTML = await fetch('header.html').then(res => res.text());
    const temp = document.createElement('div');
    temp.innerHTML = headerHTML.trim(); // convert string to DOM
    const headerElement = temp.firstElementChild; // grabs the <header> directly
    document.body.prepend(headerElement); // insert <header> as direct child

    // Load header CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'header.css';
    document.head.appendChild(link);

    // Wait a tick for DOM to update
    await new Promise(r => setTimeout(r, 0));

    // Event delegation: use headerElement to scope selectors
    const menuBtn = headerElement.querySelector('#menu-toggle');
    const dropdown = headerElement.querySelector('#dropdown-menu');
    const loginLink = headerElement.querySelector('#loginLink');
    const userSection = headerElement.querySelector('#userSection');
    const userEmail = headerElement.querySelector('#userEmail');
    const logoutLink = headerElement.querySelector('#logoutLink');

    // Toggle dropdown menu
    if (menuBtn && dropdown) {
        menuBtn.addEventListener('click', () => {
            dropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        window.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
    }

    // Firebase auth listener
    if (loginLink && userSection && userEmail) {
        onAuthStateChanged(auth, user => {
            if (user) {
                loginLink.style.display = 'none';
                userEmail.textContent = user.email;
                userSection.style.display = 'block';
            } else {
                loginLink.style.display = 'block';
                userSection.style.display = 'none';
            }
        });
    }

    // Logout functionality
    if (logoutLink) {
        logoutLink.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await signOut(auth);
                alert("Has tancat la sessió.");
                window.location.reload();
            } catch (error) {
                alert("Logout failed: " + error.message);
            }
        });
    }
})();
