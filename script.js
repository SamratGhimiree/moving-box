const boxes = document.querySelectorAll('.box');
let currentIndex = 0; // Start with box 2 in focus
let isDragging = false; // Track if the user is dragging
let startY = 0; // Starting Y position for drag
let deltaY = 0; // Distance moved during drag

// Function to update the classes based on the current index
const updateBoxes = () => {
  boxes.forEach((box, index) => {
    box.classList.remove('focused', 'above', 'below');

    if (index === currentIndex) {
      box.classList.add('focused'); // Focused box (foreground)
    } else if (index === (currentIndex - 1 + boxes.length) % boxes.length) {
      box.classList.add('above'); // Box above the focused one
    } else if (index === (currentIndex + 1) % boxes.length) {
      box.classList.add('below'); // Box below the focused one
    }
  });
};

// Handle mouse scroll
window.addEventListener('wheel', (event) => {
  if (event.deltaY > 0) {
    // Scrolling down should move to the next box
    currentIndex = (currentIndex - 1 + boxes.length) % boxes.length;
  } else if (event.deltaY < 0) {
    // Scrolling up should move to the previous box
    currentIndex = (currentIndex + 1) % boxes.length;
  }
  updateBoxes();
});

// Handle mouse down event
window.addEventListener('mousedown', (event) => {
  isDragging = true;
  startY = event.clientY; // Get the starting Y position
});

// Handle mouse move event
window.addEventListener('mousemove', (event) => {
  if (isDragging) {
    deltaY = event.clientY - startY;

    if (deltaY > 50) {
      // Dragging down should move to the previous box
      currentIndex = (currentIndex - 1 + boxes.length) % boxes.length;
      updateBoxes();
      startY = event.clientY; // Reset the starting position
    } else if (deltaY < -50) {
      // Dragging up should move to the next box
      currentIndex = (currentIndex + 1) % boxes.length;
      updateBoxes();
      startY = event.clientY; // Reset the starting position
    }
  }
});

// Handle mouse up event
window.addEventListener('mouseup', () => {
  isDragging = false; // Stop dragging
});

// Initialize the boxes on page load
updateBoxes();
