// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Close navbar toggler on mobile after clicking a link
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarToggler && navbarCollapse.classList.contains('show')) {
            navbarToggler.click(); // Simulate click to close
        }
    });
});

// Contact Form Submission (Basic client-side example)
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // In a real application, you would send this data to a server
    // For this example, we'll just show a success message
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    console.log('Form Submitted:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Subject:', subject);
    console.log('Message:', message);

    // Show success message
    const contactMessage = document.getElementById('contact-message');
    contactMessage.classList.remove('d-none');
    contactMessage.classList.add('show'); // Add 'show' class for fade-in effect if using Bootstrap transitions

    // Clear form fields
    this.reset();

    // Hide the message after 5 seconds
    setTimeout(() => {
        contactMessage.classList.add('d-none');
        contactMessage.classList.remove('show');
    }, 5000);
});

// Page Load Animation
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('page-transition');
    
    // Initialize lazy loading
    const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
    
    if ('IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy');
                    lazyImage.classList.add('loaded');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
    
    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        // Show/hide back to top button
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
        
        // Update breadcrumb
        updateBreadcrumb();
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top functionality
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Function to update breadcrumb based on current section
    function updateBreadcrumb() {
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';
        let currentSectionName = 'Home';
        
        // Find which section is currently in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.id;
                currentSectionName = section.querySelector('h2') ? section.querySelector('h2').textContent : currentSectionName;
            }
        });
        
        // Update breadcrumb
        const breadcrumb = document.getElementById('currentBreadcrumb');
        if (breadcrumb) {
            if (currentSection === 'home') {
                breadcrumb.textContent = 'Home';
            } else {
                breadcrumb.innerHTML = `<a href="#${currentSection}">${currentSectionName}</a>`;
            }
        }
    }
    
    // Initial breadcrumb update
    updateBreadcrumb();
});

// Newsletter Signup Submission
document.getElementById('newsletterForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('newsletter-email').value;
    const newsletterMessage = document.getElementById('newsletter-message');

    console.log('Newsletter Subscription Attempt:', email);

    // Simulate API call success/failure
    if (email && email.includes('@') && email.includes('.')) {
        newsletterMessage.textContent = 'Thank you for subscribing! Check your inbox for a confirmation.';
        newsletterMessage.classList.remove('alert-info', 'alert-danger', 'd-none');
        newsletterMessage.classList.add('alert-success');
        this.reset();
    } else {
        newsletterMessage.textContent = 'Please enter a valid email address.';
        newsletterMessage.classList.remove('alert-info', 'alert-success', 'd-none');
        newsletterMessage.classList.add('alert-danger');
    }
    newsletterMessage.classList.add('show'); // Show the message

    setTimeout(() => {
        newsletterMessage.classList.add('d-none');
        newsletterMessage.classList.remove('show');
    }, 5000); // Hide message after 5 seconds
});

// Testimonial Slider Cloning for Infinite Effect
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.testimonial-slider');
    if (slider) {
        const items = Array.from(slider.children);
        // We've already cloned in HTML for simplicity and initial display.
        // If you wanted to dynamically clone, you would do:
        // items.forEach(item => {
        //     const clone = item.cloneNode(true);
        //     slider.appendChild(clone);
        // });
    }
});

// Add active class to nav links on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        const navbarElement = document.querySelector('.navbar');
        // Ensure navbarElement exists before accessing its offsetHeight
        const sectionTop = section.offsetTop - (navbarElement ? navbarElement.offsetHeight : 0);
        const sectionHeight = section.clientHeight;
        const scrollPos = window.scrollY;

        // Ensure link.getAttribute('href') is not null before calling .includes()
        // And ensure section.id exists for comparison
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref && section.id) { // Check if both linkHref and section.id are valid
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    if (linkHref.includes(section.id)) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                }
            }
        });
    });
});

// Initial active link setting (for when page loads not at the very top)
window.dispatchEvent(new Event('scroll'));

// Dark Theme Toggling Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggleBtn.querySelector('i');

// Function to set the theme
function setTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('devlinxTheme', 'dark');
    } else {
        body.classList.remove('dark-theme');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('devlinxTheme', 'light');
    }
}

// Check for saved theme preference on load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('devlinxTheme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Default to light theme if no preference is saved
        setTheme('light');
    }
});

// Toggle theme on button click
themeToggleBtn.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        setTheme('light');
    } else {
        setTheme('dark');
    }
});

// Dynamic Case Study Modal Population
const caseStudyModal = document.getElementById('caseStudyModal');
if (caseStudyModal) {
    caseStudyModal.addEventListener('show.bs.modal', event => {
        // Button that triggered the modal
        const button = event.relatedTarget;
        // Extract info from data-bs-* attributes
        const title = button.getAttribute('data-title');
        const image = button.getAttribute('data-image');
        const problem = button.getAttribute('data-problem');
        const solution = button.getAttribute('data-solution');
        const technologies = button.getAttribute('data-technologies');
        const results = button.getAttribute('data-results');

        // Update the modal's content.
        const modalTitle = caseStudyModal.querySelector('.modal-title');
        const modalImage = caseStudyModal.querySelector('#caseStudyImage');
        const modalProblem = caseStudyModal.querySelector('#caseStudyProblem');
        const modalSolution = caseStudyModal.querySelector('#caseStudySolution');
        const modalTechnologies = caseStudyModal.querySelector('#caseStudyTechnologies');
        const modalResults = caseStudyModal.querySelector('#caseStudyResults');

        if (modalTitle) modalTitle.textContent = title;
        if (modalImage) modalImage.src = image;
        if (modalProblem) modalProblem.textContent = problem;
        if (modalSolution) modalSolution.textContent = solution;
        if (modalTechnologies) modalTechnologies.textContent = technologies;
        if (modalResults) modalResults.innerHTML = results; // Use innerHTML for rich text/strong tags
    });
}

// Dynamic Team Member Profile Modal Population
const teamMemberModal = document.getElementById('teamMemberModal');
if (teamMemberModal) {
    teamMemberModal.addEventListener('show.bs.modal', event => {
        const button = event.relatedTarget; // Button that triggered the modal

        const name = button.getAttribute('data-name');
        const role = button.getAttribute('data-role');
        const bio = button.getAttribute('data-bio');
        const img = button.getAttribute('data-img');
        const linkedin = button.getAttribute('data-linkedin');
        const twitter = button.getAttribute('data-twitter');
        const github = button.getAttribute('data-github');
        const behance = button.getAttribute('data-behance');
        const trello = button.getAttribute('data-trello');

        const modalTitle = teamMemberModal.querySelector('.modal-title');
        const modalImage = teamMemberModal.querySelector('#memberProfileImage');
        const modalRole = teamMemberModal.querySelector('#memberProfileRole');
        const modalBio = teamMemberModal.querySelector('#memberProfileBio');
        const modalLinkedin = teamMemberModal.querySelector('#memberProfileLinkedin');
        const modalTwitter = teamMemberModal.querySelector('#memberProfileTwitter');
        const modalGithub = teamMemberModal.querySelector('#memberProfileGithub');
        const modalBehance = teamMemberModal.querySelector('#memberProfileBehance');
        const modalTrello = teamMemberModal.querySelector('#memberProfileTrello');

        if (modalTitle) modalTitle.textContent = name;
        if (modalImage) modalImage.src = img;
        if (modalRole) modalRole.textContent = role;
        if (modalBio) modalBio.textContent = bio;

        // Handle social links visibility and href
        if (modalLinkedin) {
            modalLinkedin.classList.add('d-none');
            if (linkedin) {
                modalLinkedin.classList.remove('d-none');
                modalLinkedin.href = linkedin;
            }
        }
        if (modalTwitter) {
            modalTwitter.classList.add('d-none');
            if (twitter) {
                modalTwitter.classList.remove('d-none');
                modalTwitter.href = twitter;
            }
        }
        if (modalGithub) {
            modalGithub.classList.add('d-none');
            if (github) {
                modalGithub.classList.remove('d-none');
                modalGithub.href = github;
            }
        }
        if (modalBehance) {
            modalBehance.classList.add('d-none');
            if (behance) {
                modalBehance.classList.remove('d-none');
                modalBehance.href = behance;
            }
        }
        if (modalTrello) {
            modalTrello.classList.add('d-none');
            if (trello) {
                modalTrello.classList.remove('d-none');
                modalTrello.href = trello;
            }
        }
    });
}

// Live Chat Mockup Toggle
const chatBubble = document.getElementById('live-chat-bubble');
const chatWindow = document.getElementById('chat-mockup-window');
const closeChatBtn = document.getElementById('close-chat-mockup');

if (chatBubble && chatWindow && closeChatBtn) {
    chatBubble.addEventListener('click', () => {
        chatWindow.classList.toggle('d-none');
    });

    closeChatBtn.addEventListener('click', () => {
        chatWindow.classList.add('d-none');
    });
}