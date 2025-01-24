document.addEventListener('DOMContentLoaded', () => {
    const docSections = document.querySelectorAll('.doc-section');

    docSections.forEach(section => {
        const heading = section.querySelector('h2');
        
        heading.addEventListener('click', () => {
            // Toggle active class on the clicked section
            section.classList.toggle('active');
            
            // Optional: Close other sections when one is opened
            docSections.forEach(otherSection => {
                if (otherSection !== section && otherSection.classList.contains('active')) {
                    otherSection.classList.remove('active');
                }
            });
        });
    });
});