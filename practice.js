const heading = document.createElement("h2");
heading.textContent = "What Can JavaScript Do?";

const paragraph = document.createElement("p");
paragraph.id = "demo";
paragraph.textContent = "JavaScript can change HTML content.";

const button = document.createElement("button");
button.type = "button";
button.textContent = "Click Me!";
button.addEventListener("click", () => {
	paragraph.textContent = "Hello JavaScript!";
});

document.body.append(heading, paragraph, button);
