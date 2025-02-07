// Retrieve stored quotes or initialize with default quotes
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
  { text: "Do what you can, with what you have, where you are.", category: "Motivation" },
  { text: "The best way to predict the future is to invent it.", category: "Innovation" }
];

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to display a random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = `<em>No quotes available!</em>`;
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Store last viewed quote in session storage
  sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));

  document.getElementById("quoteDisplay").innerHTML = `<strong>${randomQuote.text}</strong> <em>(${randomQuote.category})</em>`;
}

// Function to restore last viewed quote from session storage
function restoreLastViewedQuote() {
  const lastViewedQuote = JSON.parse(sessionStorage.getItem("lastViewedQuote"));
  if (lastViewedQuote) {
    document.getElementById("quoteDisplay").innerHTML = `<strong>${lastViewedQuote.text}</strong> <em>(${lastViewedQuote.category})</em>`;
  } else {
    showRandomQuote();
  }
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (!newQuoteText || !newQuoteCategory) {
    alert("Please fill in both the quote and category fields.");
    return;
  }

  // Check for duplicate quotes
  const isDuplicate = quotes.some(quote => quote.text.toLowerCase() === newQuoteText.toLowerCase());
  if (isDuplicate) {
    alert("This quote already exists!");
    return;
  }

  // Add the new quote and update local storage
  quotes.push({ text: newQuoteText, category: newQuoteCategory });
  localStorage.setItem("quotes", JSON.stringify(quotes)); // Explicitly save to localStorage

  // Clear input fields and show the new quote instantly
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
  showRandomQuote();
}

// Function to export quotes to JSON
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Event listener for the "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Restore last viewed quote on page load
restoreLastViewedQuote();
