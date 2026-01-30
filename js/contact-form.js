// Contact Form Handler
(function () {
    'use strict';

    // Configuration
    const API_URL = 'http://localhost:3000/api/contact'; // Change this to your deployed backend URL

    // Get form elements
    const contactForm = document.querySelector('.row.align-items-center');
    const nameInput = document.querySelector('input[name="name"]');
    const emailInput = document.querySelector('input[name="email"]');
    const messageInput = document.querySelector('textarea[name="message"]');
    const submitButton = document.querySelector('button[type="submit"]');

    // Create feedback message element
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'mil-contact-feedback';
    feedbackDiv.style.cssText = `
        margin-top: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        display: none;
        animation: slideIn 0.3s ease-out;
    `;

    // Insert feedback div after form
    if (contactForm) {
        contactForm.parentNode.insertBefore(feedbackDiv, contactForm.nextSibling);
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show feedback message
    function showFeedback(message, type) {
        feedbackDiv.textContent = message;
        feedbackDiv.style.display = 'block';

        if (type === 'success') {
            feedbackDiv.style.backgroundColor = '#d4edda';
            feedbackDiv.style.color = '#155724';
            feedbackDiv.style.border = '1px solid #c3e6cb';
        } else {
            feedbackDiv.style.backgroundColor = '#f8d7da';
            feedbackDiv.style.color = '#721c24';
            feedbackDiv.style.border = '1px solid #f5c6cb';
        }

        // Auto-hide after 5 seconds
        setTimeout(() => {
            feedbackDiv.style.display = 'none';
        }, 5000);

        // Scroll to feedback
        feedbackDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Set button loading state
    function setButtonLoading(isLoading) {
        if (isLoading) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<span>Sending...</span>';
            submitButton.style.opacity = '0.7';
        } else {
            submitButton.disabled = false;
            submitButton.innerHTML = '<span>Send message</span>';
            submitButton.style.opacity = '1';
        }
    }

    // Validate form
    function validateForm() {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!name) {
            showFeedback('Please enter your name.', 'error');
            nameInput.focus();
            return false;
        }

        if (!email) {
            showFeedback('Please enter your email address.', 'error');
            emailInput.focus();
            return false;
        }

        if (!isValidEmail(email)) {
            showFeedback('Please enter a valid email address.', 'error');
            emailInput.focus();
            return false;
        }

        if (!message) {
            showFeedback('Please enter your message.', 'error');
            messageInput.focus();
            return false;
        }

        if (message.length < 10) {
            showFeedback('Message must be at least 10 characters long.', 'error');
            messageInput.focus();
            return false;
        }

        return true;
    }

    // Handle form submission
    async function handleSubmit(e) {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return;
        }

        // Get form data
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim()
        };

        // Set loading state
        setButtonLoading(true);

        try {
            // Send data to backend
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Success
                showFeedback(data.message, 'success');

                // Reset form
                contactForm.reset();

                // Optional: Track with analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submission', {
                        'event_category': 'Contact',
                        'event_label': 'Contact Form'
                    });
                }
            } else {
                // Error from server
                showFeedback(data.message || 'Something went wrong. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            showFeedback(
                'Unable to send message. Please check your internet connection or try again later.',
                'error'
            );
        } finally {
            setButtonLoading(false);
        }
    }

    // Add real-time validation
    emailInput.addEventListener('blur', function () {
        const email = this.value.trim();
        if (email && !isValidEmail(email)) {
            this.style.borderColor = '#dc3545';
        } else {
            this.style.borderColor = '';
        }
    });

    // Attach event listener
    if (contactForm) {
        contactForm.addEventListener('submit', handleSubmit);
    }

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

})();
