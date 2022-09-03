const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.data.news_category));
};

loadCategories();

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categoryContainer");
  categories.forEach((category) => {
    // console.log(category);
    const categoryli = document.createElement("li");
    categoryli.innerHTML = `
            <li class="nav-item mx-3">
              <a class="nav-link" onclick="newsLoadId('${category.category_id}')" >${category.category_name}</a>
            </li>`;
    categoryContainer.appendChild(categoryli);
  });
  toggleSpinner(true);
};

const displayNews = (newsContent = {}) => {
  const newsNumber = document.getElementById("newsNumber");
  newsNumber.textContent = `Here is only ${newsContent.length} news`;
  const newsContainer = document.getElementById("newsCard");
  newsContainer.textContent = ``;
  if (newsContent.length == 0) {
    newsContainer.textContent = `NO data `;
  }
  newsContent.forEach((news = {}) => {
    // for (const newe in news){
    //   console.log(newe["total_view"]);
    // }
    // // const sorted = [news.total_view].sort();
    // // console.log(sorted);
    const contentDiv = document.createElement("div");
    if (news === {}) {
      contentDiv.innerHTML = `<div><h1>no data</h1></div>  `;
    } else {
      contentDiv.innerHTML = `
          <div class="card mx-auto" style="max-width: 60%">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${
                news.thumbnail_url
              }" class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${
                  news.title ? news.title : "nodtat"
                }</h5>
                <p class="card-text">
                  ${news.details.slice(0, 500)}...
                </p>
                <div class="d-flex ">
                  <div class="col-md-4 col-sm-6 d-flex align-items-center">
                    <img width="${50}" src="${
        news.author.img
      }" alt="John Smith">
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
                <p class="card-text mx-2 fw-bold">
                <button onclick="displayModal('${news.title}','${
        news.total_view ? news.total_view : "not available"
      }','${
        news.author.name ? news.author.name : "not available"
      }')" href="#" id="${
        news._id
      }" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailModal">Show Details</button>
                </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    newsContainer.appendChild(contentDiv);
  });
  toggleSpinner(false);
};

const newsLoadId = async (id) => {
  
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayNews(data.data ? data.data : "NOT E");
  
};

const displayModal = (newsTitle, views, author) => {
  // console.log(newsTitle, views, author);
  const modalTitle = document.getElementById("newsDetailModalLabel");
  modalTitle.innerText = newsTitle;
  const newsDetails = document.getElementById("news-details");

  newsDetails.innerHTML = `
    <p>Total Views: ${views ? views : "not available"}</p>
        <p>Author: ${author ? author : "not available"}</p>
  `;
};

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

toggleSpinner(false);
