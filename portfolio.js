(function() {
        // 1) SMOOTH SCROLLING for all nav links (the sticky ones) to each section
        const navLinks = document.querySelectorAll('.sticky-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // 2) PROFILE PHOTO interactive: toast + animation reset
        const profilePhoto = document.getElementById('mainProfilePic');
        if (profilePhoto) {
            profilePhoto.addEventListener('click', () => {
                showToastMessage("🌟 Kayamo Mude — Full Stack Developer & Problem Solver 🌟");
                profilePhoto.style.animation = 'none';
                setTimeout(() => { profilePhoto.style.animation = 'gentleGlow 0.7s ease'; }, 10);
            });
        }

        // 3) Camera upload function (open camera / file upload)
        window.openCamera = function() {
            const fileInput = document.getElementById('cameraInput');
            if (fileInput) {
                fileInput.click();
                fileInput.onchange = function(event) {
                    const file = event.target.files[0];
                    if (file && profilePhoto) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            profilePhoto.src = e.target.result;
                            showToastMessage("📸 Profile picture updated successfully!");
                        };
                        reader.readAsDataURL(file);
                    } else if (!file) {
                        showToastMessage("⚠️ No image selected.");
                    }
                };
            } else {
                showToastMessage("Camera input not ready.");
            }
        };

        // 4) All images interactive: toast on click
        const allImages = document.querySelectorAll('img');
        allImages.forEach(img => {
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                let imgAlt = img.alt || 'image';
                showToastMessage(`📸 Interactive: ${imgAlt} — nice click!`);
            });
        });

        // 5) Skill cards: show expertise message
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const skillText = card.getAttribute('data-skill') || card.querySelector('p')?.innerText || 'technology';
                showToastMessage(`💡 ${skillText} • Advanced knowledge & real-world projects`);
            });
        });

        // 6) Project table rows interactive: show extra info
        const tableRows = document.querySelectorAll('.project-table tbody tr');
        tableRows.forEach(row => {
            row.addEventListener('click', () => {
                const category = row.cells[0]?.innerText || 'project';
                showToastMessage(`🔍 Exploring ${category} projects — ask me for details!`);
            });
        });

        // 7) Contact form working properly with validation and alert
        const contactForm = document.getElementById('globalContactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const firstName = document.getElementById('firstnameInput')?.value.trim();
                const lastName = document.getElementById('lastnameInput')?.value.trim();
                const email = document.getElementById('emailInput')?.value.trim();
                const message = document.getElementById('msgTextarea')?.value.trim();

                if (!firstName || !lastName || !email || !message) {
                    showToastMessage("⚠️ Please fill all fields: First Name, Last Name, Email, and Message.");
                    return;
                }
                if (!email.includes('@') || !email.includes('.')) {
                    showToastMessage("📧 Please enter a valid email address (e.g., name@domain.com).");
                    return;
                }
                // success simulation
                showToastMessage(`✅ Message sent successfully! Thanks ${firstName}, I'll reply soon.`);
                contactForm.reset();
            });
        }

        // 8) LinkedIn link is now fully functional (real profile link) - no mock needed, but keep interactive toast also?
        const linkedinReal = document.getElementById('linkedinActual');
        if (linkedinReal) {
            linkedinReal.addEventListener('click', (e) => {
                // actual link works, just additional toast for warmth
                showToastMessage("🔗 Redirecting to LinkedIn profile — connect with me!");
            });
        }

       
        // Toast helper
        function showToastMessage(text) {
            let existing = document.querySelector('.toast-msg');
            if (existing) existing.remove();
            const toastDiv = document.createElement('div');
            toastDiv.className = 'toast-msg';
            toastDiv.innerHTML = text;
            document.body.appendChild(toastDiv);
            setTimeout(() => {
                if (toastDiv) toastDiv.remove();
            }, 2700);
        }

        // Fix skill images border style
        const skillImgs = document.querySelectorAll('.skill-card img');
        skillImgs.forEach(img => {
            img.style.border = 'none';
            img.style.boxShadow = 'none';
        });

        // Welcome toast on load
        setTimeout(() => {
            showToastMessage("✨ Welcome to Kayamo's scrollable portfolio! ✨");
        }, 200);
    })();