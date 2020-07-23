Reveal.configure({
  "center": false,
  "transition": "slide",
  "transitionSpeed": "fast"
});

// Stretch code on dblclick
head.js("js/stretch-code.js");

// Stretch image on dblclick
head.js("js/stretch-image.js");

head.js("js/whiteboard.js");

// Add class "notes-popup" to body if in iframe
// such that "clever-institut.css" does not mess with our live notes
if (window.self != window.top) {
  document.body.classList.add("notes-popup");
}

// Direct printing
if (window.location.search.match(/kiosk-printing/gi)) {
  window.print();
  window.close();
}
