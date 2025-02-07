// script.js

// Load existing quotes from local storage or initialize an empty array
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Motivation" }
];

// Display a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  if (quotes.length > 0) {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      quoteDisplay.innerText = `"${randomQuote.text}" - ${randomQuote.category}`;
  } else {
      quoteDisplay.innerText = "No quotes available.";
  }
}

document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Add a new quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value;
  const category = document.getElementById("newQuoteCategory").value;
  if (text && category) {
      quotes.push({ text, category });
      saveQuotes();
      populateCategories();
      alert("Quote added successfully!");
  }
}

// Populate categories dynamically
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  const categories = [...new Set(quotes.map(q => q.category))];
  categories.forEach(category => {
      let option = document.createElement("option");
      option.value = category;
      option.innerText = category;
      categoryFilter.appendChild(option);
  });
}

document.getElementById("categoryFilter").addEventListener("change", filterQuotes);

// Filter quotes by category
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const quoteDisplay = document.getElementById("quoteDisplay");
  const filteredQuotes = selectedCategory === "all" ? quotes : quotes.filter(q => q.category === selectedCategory);
  quoteDisplay.innerText = filteredQuotes.length > 0 ? `"${filteredQuotes[0].text}" - ${filteredQuotes[0].category}` : "No quotes available.";
  localStorage.setItem("lastSelectedCategory", selectedCategory);
}

// Load last selected category
window.onload = function() {
  populateCategories();
  showRandomQuote();
  const lastSelectedCategory = localStorage.getItem("lastSelectedCategory");
  if (lastSelectedCategory) {
      document.getElementById("categoryFilter").value = lastSelectedCategory;
      filterQuotes();
  }
};

// Export quotes to JSON file
function exportToJson() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(quotes));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "quotes.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Periodically sync with server
async function syncWithServer() {
  try {
      let response = await fetch("https://jsonplaceholder.typicode.com/posts"); // Replace with actual API
      let serverQuotes = await response.json();
      if (serverQuotes.length > 0) {
          quotes = serverQuotes.map(q => ({ text: q.title, category: "Server" }));
          saveQuotes();
          populateCategories();
      }
  } catch (error) {
      console.error("Error syncing with server:", error);
  }
}

setInterval(syncWithServer, 30000); // Sync every 30 seconds
