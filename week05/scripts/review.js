const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

function getProductName(id) {
  const product = products.find(item => item.id === id);
  return product ? product.name : id;
}

function renderReview() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("product");
  const reviewDetails = document.getElementById("reviewDetails");
  const confirmationMessage = document.getElementById("confirmationMessage");
  const errorMessage = document.getElementById("errorMessage");
  const reviewCountElement = document.getElementById("reviewCount");

  if (!productId) {
    confirmationMessage.textContent = "No review data was found. Please submit the form first.";
    errorMessage.textContent = "This page works best when reached from the review form.";
    reviewDetails.innerHTML = "";
    return;
  }

  const productName = getProductName(productId);
  const rating = params.get("rating") || "Not provided";
  const installationDate = params.get("installationDate") || "Not provided";
  const reviewText = params.get("reviewText") || "No written review provided.";
  const userName = params.get("userName") || "Anonymous";
  const usefulFeatures = params.getAll("features");

  const featureText = usefulFeatures.length > 0 ? usefulFeatures.join(", ") : "No useful features selected.";

  reviewDetails.innerHTML = `
    <div class="review-item">
      <dt>Product</dt>
      <dd>${productName}</dd>
    </div>
    <div>
    <dt>Overall rating</dt>
    <dd>${rating} out of 5</dd>
    </div>
    <div>
      <dt>Date installed</dt>
      <dd>${installationDate}</dd>
    </div>
    <div>
      <dt>Useful features</dt>
      <dd>${featureText}</dd>
    </div>
    <div>
      <dt>Review</dt>
      <dd>${reviewText}</dd>
    </div>
    <div>
      <dt>Submitted by</dt>
      <dd>${userName}</dd>
    </div>
  `;

  const reviewCount = Number(localStorage.getItem("reviewCount") || 0) + 1;
  localStorage.setItem("reviewCount", reviewCount);
  if (reviewCountElement) {
    reviewCountElement.textContent = reviewCount;
  }
  confirmationMessage.textContent = "Your review is recorded and ready for the product team.";
  errorMessage.textContent = "";
}

function initFooter() {
  const currentYear = document.getElementById("currentyear");
  const lastModified = document.getElementById("lastModified");
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
  if (lastModified) {
    lastModified.textContent = document.lastModified;
  }
}

renderReview();
initFooter();
