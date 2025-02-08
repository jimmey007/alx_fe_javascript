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
      quoteDisplay.innerText = quotes.length ?
          `"${quotes[Math.floor(Math.random() * quotes.length)].text}" - [${quotes[Math.floor(Math.random() * quotes.length)].category}]` :
          "No quotes available. Please add one!";
  }

  function addQuote() {
      const text = newQuoteText.value.trim(), category = newQuoteCategory.value.trim();
      if (!text || !category) return alert("Please enter both a quote and a category.");
      quotes.push({ text, category });
      saveQuotes();
      newQuoteText.value = newQuoteCategory.value = "";
      alert("Quote added successfully!");
  }

  function exportToJsonFile() {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" }));
      a.download = "quotes.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  }

  function importFromJsonFile(event) {
      const fileReader = new FileReader();
      fileReader.onload = event => {
          try {
              const importedQuotes = JSON.parse(event.target.result);
              if (Array.isArray(importedQuotes)) {
                  quotes.push(...importedQuotes);
                  saveQuotes();
                  alert("Quotes imported successfully!");
              } else alert("Invalid file format.");
          } catch { alert("Error parsing JSON file."); }
      };
      fileReader.readAsText(event.target.files[0]);
  }

  newQuoteBtn.addEventListener("click", showRandomQuote);
  window.addQuote = addQuote;
  window.exportToJsonFile = exportToJsonFile;
  window.importFromJsonFile = importFromJsonFile;

  showRandomQuote();
});
