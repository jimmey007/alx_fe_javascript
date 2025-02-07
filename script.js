// Load quotes from localStorage or initialize with default quotes
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
  { text: "Do what you can, with what you have, where you are.", category: "Motivation" },
  { text: "The best way to predict the future is to invent it.", category: "Innovation" }
];

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes)); // Save quotes array to localStorage
}

// Function to display a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.innerHTML = `<strong>${randomQuote.text}</strong> <em>(${randomQuote.category})</em>`;

  // Save the last viewed quote to sessionStorage (optional)
  sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value.trim();
  const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    saveQuotes(); // Save updated quotes to localStorage
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    alert('Quote added successfully!');
  } else {
    alert('Please fill in both the quote and category fields.');
  }
}

// Function to export quotes as a JSON file
function exportQuotes() {
  const dataStr = JSON.stringify(quotes, null, 2); // Convert quotes array to JSON string
  const blob = new Blob([dataStr], { type: 'application/json' }); // Create a Blob
  const url = URL.createObjectURL(blob); // Create a URL for the Blob

  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json'; // Set the filename for the download
  document.body.appendChild(a);
  a.click(); // Trigger the download
  document.body.removeChild(a);
  URL.revokeObjectURL(url); // Clean up the URL
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result); // Parse the uploaded file
      quotes.push(...importedQuotes); // Add imported quotes to the array
      saveQuotes(); // Save updated quotes to localStorage
      alert('Quotes imported successfully!');
    } catch (error) {
      alert('Invalid JSON file. Please upload a valid quotes file.');
    }
  };
  fileReader.readAsText(file); // Read the file as text
}

// Event listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Initial display of a random quote
showRandomQuote();  