"use strict";

// Progressive enhancement for the existing PlayStation page.
const header = document.querySelector(".header");
const hero = document.querySelector(".hero");
const topics = {
    Store: ["Explore PlayStation", "Discover consoles, games and accessories.", "https://www.playstation.com/"],
    PS5: ["PlayStation 5", "Discover the PS5 console and its games.", "https://www.playstation.com/ps5/"],
    "PlayStation®5": ["PlayStation 5", "Explore the console that brings your games to life.", "https://www.playstation.com/ps5/"],
    "PlayStation®5 Pro": ["PlayStation 5 Pro", "Explore the next level of PlayStation console gaming.", "https://www.playstation.com/ps5/ps5-pro/"],
    Games: ["Find your next adventure", "Explore PlayStation games and discover something new to play.", "https://www.playstation.com/ps5/games/"],
    "PS Plus": ["PlayStation Plus", "Explore membership options, online multiplayer and game catalogs.", "https://www.playstation.com/ps-plus/"],
    Accessories: ["Make it your setup", "Explore controllers, headsets and other PlayStation accessories.", "https://www.playstation.com/accessories/"],
    News: ["Latest from PlayStation", "Read announcements and stories on the PlayStation Blog.", "https://blog.playstation.com/"],
    Support: ["How can we help?", "Find help with your console, account and games.", "https://www.playstation.com/support/"],
    "More features": ["Discover PS5 features", "Learn more about the PlayStation 5 experience.", "https://www.playstation.com/ps5/ps5-features/"],
    Entertainment: ["Entertainment on PS5", "Explore entertainment options for your console.", "https://www.playstation.com/ps5/ps5-entertainment/"]
};

const panel = document.createElement("section");
panel.id = "navigation-panel";
panel.className = "navigation-panel";
panel.hidden = true;
panel.setAttribute("aria-label", "Explore PlayStation");
panel.innerHTML = '<div><h2></h2><p></p><a class="action-link">Explore on PlayStation</a></div><button type="button" aria-label="Close navigation panel">×</button>';
header.append(panel);
let activeLink;
function closePanel() {
    panel.hidden = true;
    activeLink?.setAttribute("aria-expanded", "false");
    activeLink = null;
}
document.querySelectorAll(".nav-links a, .ps5-links a").forEach(link => {
    const label = link.textContent.trim().replace(/Â/g, "");
    link.textContent = label;
    const topic = topics[label];
    if (!topic) return;
    link.href = topic[2];
    link.setAttribute("aria-controls", panel.id);
    link.setAttribute("aria-expanded", "false");
    link.addEventListener("click", event => {
        event.preventDefault();
        const isOpen = activeLink === link;
        closePanel();
        if (isOpen) return;
        activeLink = link;
        link.setAttribute("aria-expanded", "true");
        panel.querySelector("h2").textContent = topic[0];
        panel.querySelector("p").textContent = topic[1];
        panel.querySelector("a").href = topic[2];
        panel.hidden = false;
    });
});
panel.querySelector("button").addEventListener("click", () => {
    const trigger = activeLink;
    closePanel();
    trigger?.focus();
});
document.addEventListener("click", event => {
    if (!header.contains(event.target)) closePanel();
});
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && activeLink) {
        const trigger = activeLink;
        closePanel();
        trigger.focus();
    }
});

const dialog = document.createElement("dialog");
dialog.className = "ps-dialog";
dialog.setAttribute("aria-labelledby", "dialog-title");
document.body.append(dialog);
let dialogTrigger;
function showDialog(trigger, content) {
    closePanel();
    dialogTrigger = trigger;
    dialog.innerHTML = '<button class="dialog-close" type="button" aria-label="Close dialog">×</button>' + content;
    dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
    dialog.showModal();
    document.body.classList.add("dialog-open");
}
dialog.addEventListener("click", event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
dialog.addEventListener("close", () => {
    // Remove any embedded player to stop playback when dismissed.
    dialog.replaceChildren();
    document.body.classList.remove("dialog-open");
    dialogTrigger?.focus();
});
document.querySelectorAll(".buy-button, .hero-button").forEach(button => {
    button.addEventListener("click", () => showDialog(button, `
        <h2 id="dialog-title">Choose your console</h2>
        <p>Explore models and regional availability on PlayStation's official website.</p>
        <div class="console-options">
            <a href="https://www.playstation.com/ps5/"><strong>PlayStation 5</strong><span>Explore PS5 consoles →</span></a>
            <a href="https://www.playstation.com/ps5/ps5-pro/"><strong>PlayStation 5 Pro</strong><span>Explore PS5 Pro →</span></a>
        </div>`));
});
document.querySelector(".play-button").addEventListener("click", event => {
    showDialog(event.currentTarget, `
        <h2 id="dialog-title">Watch PlayStation trailers</h2>
        <p>Discover console trailers and game reveals on the official PlayStation YouTube channel.</p>
        <a class="action-link" href="https://www.youtube.com/@PlayStation" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a>`);
});

// Keep the hero clear of the fixed header, including when navigation wraps.
function sizeHeader() {
    document.documentElement.style.setProperty("--header-height", `${header.getBoundingClientRect().height}px`);
}
new ResizeObserver(sizeHeader).observe(header);
sizeHeader();
window.addEventListener("scroll", () => {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
}, { passive: true });
hero.classList.add("is-ready");
