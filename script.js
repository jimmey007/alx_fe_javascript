// Array to store quotes
let quotes = [];

// Load quotes and categories from local storage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
    fetchQuotesFromServer(); // Fetch quotes from the server (simulated)
    populateCategories(); // Populate categories dropdown
    showRandomQuote(); // Display a random quote
});

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Display a random quote
function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    if (quotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        quoteDisplay.innerHTML = `<p>"${randomQuote.text}" - ${randomQuote.category}</p>`;
        // Store the last viewed quote in session storage
        sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
    } else {
        quoteDisplay.innerHTML = `<p>No quotes available. Add some!</p>`;
    }
}

// Add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        const newQuote = {
            text: newQuoteText,
            category: newQuoteCategory
        };
        quotes.push(newQuote);
        saveQuotes(); // Save to local storage
        populateCategories(); // Update categories dropdown
        showRandomQuote(); // Display the new quote
        alert('Quote added successfully!');
        // Clear input fields
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
    } else {
        alert('Please fill in both fields.');
    }
}

// Export quotes to a JSON file
function exportQuotes() {
    const dataStr = JSON.stringify(quotes);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes); // Add imported quotes to the array
        saveQuotes(); // Save to local storage
        populateCategories(); // Update categories dropdown
        showRandomQuote(); // Display a random quote
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Populate categories dropdown
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    // Extract unique categories using map and Set
    const categories = [...new Set(quotes.map(quote => quote.category))];
    // Clear existing options
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    // Add new options
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Filter quotes by category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
    const quoteDisplay = document.getElementById('quoteDisplay');
    if (filteredQuotes.length > 0) {
        quoteDisplay.innerHTML = filteredQuotes.map(quote => `<p>"${quote.text}" - ${quote.category}</p>`).join('');
    } else {
        quoteDisplay.innerHTML = `<p>No quotes available for this category.</p>`;
    }
}

// Fetch quotes from the server (simulated)
function fetchQuotesFromServer() {
    // Simulate fetching quotes from a server using a mock API or hardcoded data
    const mockQuotes = [
        { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
        { text: "Do what you can, with what you have, where you are.", category: "Motivation" },
        { text: "The best way to predict the future is to invent it.", category: "Innovation" }
    ];

    // Simulate a delay to mimic server response time
    setTimeout(() => {
        quotes.push(...mockQuotes); // Add fetched quotes to the array
        saveQuotes(); // Save to local storage
        populateCategories(); // Update categories dropdown
        showRandomQuote(); // Display a random quote
        alert('Quotes fetched from the server successfully!');
    }, 1000); // Simulate a 1-second delay
}

// Display the last viewed quote from session storage
document.addEventListener('DOMContentLoaded', () => {
    const lastViewedQuote = sessionStorage.getItem('lastViewedQuote');
    if (lastViewedQuote) {
        const quote = JSON.parse(lastViewedQuote);
        const quoteDisplay = document.getElementById('quoteDisplay');
        quoteDisplay.innerHTML = `<p>"${quote.text}" - ${quote.category}</p>`;
    }
});