document.addEventListener("DOMContentLoaded", () => {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  const newQuoteText = document.getElementById("newQuoteText");
  const newQuoteCategory = document.getElementById("newQuoteCategory");
  const importFile = document.getElementById("importFile");

  let quotes = JSON.parse(localStorage.getItem("quotes")) || [
      { text: "The best way to predict the future is to create it.", category: "Motivation" },
      { text: "Do what you can, with what you have, where you are.", category: "Inspiration" },
      { text: "Life is what happens when you’re busy making other plans.", category: "Life" }
  ];

  function saveQuotes() {
      localStorage.setItem("quotes", JSON.stringify(quotes));
  }

  function showRandomQuote() {
      if (quotes.length === 0) {
          quoteDisplay.innerText = "No quotes available. Please add one!";
          return;
      }
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const quote = quotes[randomIndex];
      quoteDisplay.innerText = `"${quote.text}" - [${quote.category}]`;
      sessionStorage.setItem("lastQuote", JSON.stringify(quote));
  }

  function addQuote() {
      const text = newQuoteText.value.trim();
      const category = newQuoteCategory.value.trim();
      
      if (text === "" || category === "") {
          alert("Please enter both a quote and a category.");
          return;
      }
      
      quotes.push({ text, category });
      saveQuotes();
      newQuoteText.value = "";
      newQuoteCategory.value = "";
      alert("Quote added successfully!");
  }

  function exportToJsonFile() {
      const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "quotes.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  }

  function importFromJsonFile(event) {
      const fileReader = new FileReader();
      fileReader.onload = function(event) {
          try {
              const importedQuotes = JSON.parse(event.target.result);
              if (Array.isArray(importedQuotes)) {
                  quotes.push(...importedQuotes);
                  saveQuotes();
                  alert("Quotes imported successfully!");
              } else {
                  alert("Invalid file format. Please upload a valid JSON file.");
              }
          } catch (error) {
              alert("Error parsing JSON file.");
          }
      };
      fileReader.readAsText(event.target.files[0]);
  }

  newQuoteBtn.addEventListener("click", showRandomQuote);
  window.addQuote = addQuote; // Expose function to the global scope for button onclick usage
  window.exportToJsonFile = exportToJsonFile;
  window.importFromJsonFile = importFromJsonFile;

  const lastQuote = JSON.parse(sessionStorage.getItem("lastQuote"));
  if (lastQuote) {
      quoteDisplay.innerText = `"${lastQuote.text}" - [${lastQuote.category}]`;
  } else {
      showRandomQuote();
  }
});
