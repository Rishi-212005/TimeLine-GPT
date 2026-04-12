document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card.visible-target');

    // Smooth Scroll Reveal via Intersection Observer
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, index * 120); // Creates an elegant cascading delay
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => cardObserver.observe(card));

    // Interactive Modal Controller logic
    const modal = document.getElementById('event-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalYear = document.getElementById('modal-year');
    const modalDesc = document.getElementById('modal-desc');
    const closeBtn = document.querySelector('.close-btn');

    cards.forEach(card => {
        // Link hover state to the circular timeline marker
        card.addEventListener('mouseenter', () => {
            const node = card.closest('.timeline-node');
            if(node) node.classList.add('hovered');
        });
        
        card.addEventListener('mouseleave', () => {
            const node = card.closest('.timeline-node');
            if(node) node.classList.remove('hovered');
        });

        card.addEventListener('click', () => {
            // Read content bounds
            const textTitle = card.getAttribute('data-title');
            const textYear = card.getAttribute('data-year');
            const textDesc = card.getAttribute('data-desc');

            // Map and parse into UI
            modalTitle.textContent = textTitle;
            modalYear.textContent = textYear;
            modalDesc.textContent = textDesc;

            // Trigger visual popup mechanisms
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop background bleeding scroll
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
