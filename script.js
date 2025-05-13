// DOM Elements
const colorOptions = document.querySelectorAll(".color-option");
const animateBtn = document.getElementById("animate-btn");
const animatedElement = document.querySelector(".animated-element");

// Functions
/**
 * Saves user theme preference to localStorage
 * @param {string} color - The color theme preference
 */
function saveThemePreference(color) {
  localStorage.setItem("themePreference", color);
}

/**
 * Retrieves user theme preference from localStorage
 * @returns {string|null} The saved color theme or null if not set
 */
function getThemePreference() {
  return localStorage.getItem("themePreference");
}

/**
 * Applies the theme to the page
 * @param {string} color - The color theme to apply
 */
function applyTheme(color) {
  // First remove all theme classes
  document.body.classList.remove(
    "theme-blue",
    "theme-green",
    "theme-purple",
    "theme-orange"
  );

  // Add the selected theme class
  document.body.classList.add(`theme-${color}`);

  // Update active state on color options
  colorOptions.forEach((option) => {
    if (option.dataset.color === color) {
      option.classList.add("active");
    } else {
      option.classList.remove("active");
    }
  });

  // Save the preference
  saveThemePreference(color);
}

/**
 * Triggers the animation on the animated element
 */
function triggerAnimation() {
  // Reset the animation by removing and re-adding the class
  animatedElement.classList.remove("animate");

  // Force reflow to restart the animation
  void animatedElement.offsetWidth;

  // Start the animation
  animatedElement.classList.add("animate");

  // Store animation interaction in localStorage
  saveAnimationInteraction();
}

/**
 * Saves the animation interaction count to localStorage
 */
function saveAnimationInteraction() {
  // Get current count or initialize to 0
  let count = localStorage.getItem("animationInteractions") || 0;

  // Increment count
  count = parseInt(count) + 1;

  // Save back to localStorage
  localStorage.setItem("animationInteractions", count.toString());

  // Show count to user
  console.log(`Animation triggered ${count} times`);
}

/**
 * Gets the animation interaction count from localStorage
 * @returns {number} The number of times the animation has been triggered
 */
function getAnimationInteractions() {
  return parseInt(localStorage.getItem("animationInteractions") || 0);
}

/**
 * Initialize the application
 */
function initApp() {
  // Load saved theme preference if it exists
  const savedTheme = getThemePreference();
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    // Default theme
    applyTheme("blue");
  }

  // Display animation interaction count if any
  const interactionCount = getAnimationInteractions();
  if (interactionCount > 0) {
    console.log(
      `Animation has been triggered ${interactionCount} times before`
    );
  }
}

// Event Listeners
colorOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const color = option.dataset.color;
    applyTheme(color);
  });
});

animateBtn.addEventListener("click", triggerAnimation);

// Initialize the app when DOM is fully loaded
document.addEventListener("DOMContentLoaded", initApp);
