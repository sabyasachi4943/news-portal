const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.data.news_category));
};

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categoryContainer");
  categories.forEach((category) => {
    const categoryli = document.createElement("li");
    categoryli.classList.add();
    categoryli.innerHTML = `
            <li class="nav-item mx-3">
              <a class="nav-link" href="${category.category_id}">${category.category_name}</a>
            </li>`;
    categoryContainer.appendChild(categoryli);
  });
};

const loadNews = async (id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayNews(data.data);
};

const displayNews = (newsContent) => {
  const newsContainer = document.getElementById("newsCard");
  newsContent.forEach((news) => {
    console.log(news);
    const contentDiv = document.createElement("div");
    contentDiv.innerHTML = `
        <div class="card mx-auto" style="max-width: 720px">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${
              news.thumbnail_url
            }" class="img-fluid rounded-start" alt="..." />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${news.title}</h5>
              <p class="card-text">
                ${news.details}
              </p>
              <div class="d-flex ">
                <div class="col-md-4 col-sm-6 d-flex align-items-center">
                  <img width="${50}" src="${news.author.img}" alt="John Smith">
                  <h5 class="ms-3">${
                    news.author.name ? news.author.name : "not available"
                  }</h5>
              </div>
              <p class="card-text mx-2">
                <small class="text-muted"> <strong>Published Date</strong> : ${
                  news.author.published_date
                }</small>
              </p>
              <p class="card-text mx-2 fw-bold">
                <small class="text-muted">total view ${
                  news.total_view ? news.total_view : "not available"
                }</small>
              </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    newsContainer.appendChild(contentDiv);
  });
};

loadNews("02");
loadCategories();
