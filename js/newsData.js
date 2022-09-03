const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.data.news_category));
};

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categoryContainer");
  categories.forEach(category => {
    console.log(category);
    const categoryli = document.createElement("li");
    categoryli.classList.add();
    categoryli.innerHTML = `
            <li class="nav-item mx-3">
              <a class="nav-link" href="${category.category_id}">${category.category_name}</a>
            </li>`;
    categoryContainer.appendChild(categoryli);
  });
};

const loadNews = 

loadCategories();