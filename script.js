// Load quotes from localStorage or initialize with default quotes
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "In the middle of difficulty lies opportunity.", category: "Inspiration" },
  { text: "It always seems impossible until it's done.", category: "Perseverance" }
];

// Show a random quote based on selected category
function showRandomQuote() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const filteredQuotes = quotes.filter(q => selectedCategory === "all" || q.category === selectedCategory);

  if (filteredQuotes.length > 0) {
      const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
      document.getElementById("quoteDisplay").innerText = `"${randomQuote.text}" - (${randomQuote.category})`;
  } else {
      document.getElementById("quoteDisplay").innerText = "No quotes available for this category.";
  }
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Add a new quote and save to localStorage
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text && category) {
      quotes.push({ text, category });
      saveQuotes();
      populateCategories();
      showRandomQuote();
      alert("Quote added!");
  }
}

// Populate categories dynamically in the dropdown
function populateCategories() {
  const categories = [...new Set(quotes.map(q => q.category))];
  const categoryFilter = document.getElementById("categoryFilter");

  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(category => {
      let option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
  });

  // Restore last selected category filter from localStorage
  const lastCategory = localStorage.getItem("lastSelectedCategory") || "all";
  categoryFilter.value = lastCategory;
}

// Filter quotes by category and save filter preference
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("lastSelectedCategory", selectedCategory);
  showRandomQuote();
}

// Export quotes as a JSON file
function exportQuotes() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "quotes.json";
  a.click();
}

// Import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      showRandomQuote();
      alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}

// Event listener for the "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Restore last selected category and load quotes when the page loads
window.onload = function () {
  populateCategories();
  showRandomQuote();
};
