function createNavBar() {
    const nav = document.createElement('nav');
    nav.style.cssText = `
        background-color: #1a1a1a;
        padding: 1rem;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    `;

    const logo = document.createElement('a');
    logo.href = 'index.html';
    logo.style.cssText = `
        color: #ffffff;
        text-decoration: none;
        font-size: 1.5rem;
        font-weight: bold;
    `;
    logo.textContent = 'SLEET KEY';

    const links = document.createElement('div');
    links.style.cssText = `
        display: flex;
        gap: 2rem;
    `;

    const homeLink = document.createElement('a');
    homeLink.href = 'index.html';
    homeLink.textContent = 'Home';
    homeLink.style.cssText = `
        color: #ffffff;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s ease;
    `;
    homeLink.onmouseover = () => homeLink.style.color = '#4fd1c5';
    homeLink.onmouseout = () => homeLink.style.color = '#ffffff';

    const createLink = document.createElement('a');
    createLink.href = 'create.html';
    createLink.textContent = 'Create';
    createLink.style.cssText = `
        color: #ffffff;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s ease;
    `;
    createLink.onmouseover = () => createLink.style.color = '#4fd1c5';
    createLink.onmouseout = () => createLink.style.color = '#ffffff';

    links.appendChild(homeLink);
    links.appendChild(createLink);

    nav.appendChild(logo);
    nav.appendChild(links);

    // Add padding to body to prevent content from hiding behind the fixed navbar
    document.body.style.paddingTop = '4rem';

    // Insert the navbar at the beginning of the body
    document.body.insertBefore(nav, document.body.firstChild);
}

// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', createNavBar);