// Theme toggle
const themeToggleBtn = document.getElementById("theme-toggle");
themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  themeToggleBtn.textContent = document.body.classList.contains("dark-theme") ? "☀️" : "🌙";
  showSnackbar(document.body.classList.contains("dark-theme") ? "Switched to Dark Theme" : "Switched to Light Theme");
});

// Hamburger menu
const menuToggleBtn = document.getElementById("menu-toggle");
const nav = document.querySelector("header nav");
menuToggleBtn.addEventListener("click", () => {
  nav.classList.toggle("show");
});

// Language selector
const languageSelector = document.querySelector("header select");
languageSelector.addEventListener("change", (e) => {
  const lang = e.target.value;
  showSnackbar(`Language changed to: ${lang} (feature under development)`);
});

// Mood filter icons
const moodFilters = document.getElementById("mood-filters");

moodFilters.addEventListener("click", (e) => {
  if (e.target.tagName === "SPAN") {
    
    Array.from(moodFilters.children).forEach(span => span.classList.remove("active"));

  
    e.target.classList.add("active");

    showSnackbar(`You selected mood: ${e.target.textContent.trim()}`);
  }
});

// Login/Logout logic
const loginBtn = document.getElementById("login-btn");
let isLoggedIn = false;

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!isLoggedIn) {
    loginBtn.textContent = "Logout";
    loginBtn.style.backgroundColor = "#4caf50";
    showSnackbar("Logged in! You can now see your personalized feed.");
    isLoggedIn = true;
  } else {
    loginBtn.textContent = "Login";
    loginBtn.style.backgroundColor = "#1976d2";
    showSnackbar("Logged out successfully.");
    isLoggedIn = false;
  }
});

// Snackbar function
function showSnackbar(message) {
  let snackbar = document.getElementById("snackbar");
  if (!snackbar) {
    snackbar = document.createElement("div");
    snackbar.id = "snackbar";
    document.body.appendChild(snackbar);
  }
  snackbar.textContent = message;
  snackbar.className = "show";
  setTimeout(() => {
    snackbar.className = snackbar.className.replace("show", "");
  }, 3000);
}

// Fetch JSON data and update UI
fetch("news.json")
  .then(res => res.json())
  .then(data => {
    // Articles
    const feed = document.querySelector("#personalized-feed .card-grid");
    feed.innerHTML = ""; 
    data.articles.forEach(article => {
      const card = document.createElement("div");
      card.className = "news-card";
      card.innerHTML = `
        <img src="${article.image}" alt="${article.title}" loading="lazy">
        <h3>${article.title}</h3>
        <p>${article.description}</p>
        <span class="badge-ai">${article.tags[0]}</span>
        <span class="badge-fact">✅ Verified</span>
        <button class="btn">🎧 Listen</button>
        <button class="btn">❤️ Bookmark</button>
        <button class="btn">⬇️ Save offline</button>
      `;
      feed.appendChild(card);
    });

    // Categories
    const catGrid = document.querySelector("#categories .category-grid");
    catGrid.innerHTML = ""; 
    data.categories.forEach(cat => {
      const catCard = document.createElement("div");
      catCard.className = "category-card";
      catCard.textContent = cat;
      catGrid.appendChild(catCard);
    });

    // Trending Tags
    const trendingTags = document.querySelector("#trending .tag-list");
    trendingTags.innerHTML = ""; 
    data.trendingTags.forEach(tag => {
      const tagEl = document.createElement("span");
      tagEl.textContent = tag;
      trendingTags.appendChild(tagEl);
    });

    // Comments
    const commentsList = document.getElementById("sidebar-comments");
commentsList.innerHTML = ""; 

data.comments.forEach(c => {
  const li = document.createElement("li");
  li.textContent = c;
  commentsList.appendChild(li);
});

    // Weather
    const weatherWidget = document.getElementById("weather-widget");
    weatherWidget.innerHTML = `
      <p>${data.weather.location}</p>
      <p>${data.weather.temp}</p>
      <p>${data.weather.description}</p>
    `;

    // Stock
    const stockTicker = document.getElementById("stock-ticker");
    stockTicker.innerHTML = `
      <p>${data.stock.index}: ${data.stock.value} (${data.stock.change})</p>
    `;

    // Region buttons
    // Region-wise trending data
const trendingByRegion = {
  "India": ["#Cricket", "#Budget2025", "#Bollywood"],
  "USA": ["#AI", "#Hollywood", "#Elections2025"],
  "Europe": ["#EuroCup", "#Travel", "#Fashion"]
};

// Region buttons
const regionButtons = document.querySelectorAll(".region-buttons button");
const locationMap = document.getElementById("location-map");

regionButtons.forEach(button => {
  button.addEventListener("click", () => {
    const region = button.getAttribute("data-region");
    showSnackbar(`Region changed to: ${region}`);

    
    const tags = trendingByRegion[region] || [];
    locationMap.innerHTML = `
      <h4>Trending in ${region}</h4>
      <div class="tag-list">
        ${tags.map(tag => `<span>${tag}</span>`).join("")}
      </div>
    `;
  });
});
  })
  .catch(err => {
    console.error("Error loading JSON:", err);
  });
  // Chatbot open/close logic
const askAiFooterBtn = document.getElementById("ask-ai-footer");
const chatbotModal = document.getElementById("chatbot-modal");
const closeChatbotBtn = document.getElementById("close-chatbot");

askAiFooterBtn.addEventListener("click", () => {
  chatbotModal.style.display = "block";
});

closeChatbotBtn.addEventListener("click", () => {
  chatbotModal.style.display = "none";
});

// Optionally: backdrop click pe bhi close
window.addEventListener("click", (e) => {
  if (e.target === chatbotModal) {
    chatbotModal.style.display = "none";
  }
});
