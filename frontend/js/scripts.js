const categorySelect = document.getElementById('category-select')
const searchInput = document.getElementById('search-input')
const productList = document.getElementById('product-list')

fetch('./category')
  .then((response) => response.json())
  .then((categories) => {
    let node = []
    categories.forEach((category) => {
      const option = document.createElement('option')
      option.value = category.id
      option.innerText = category.name
      node.push(option)
    })
    categorySelect.append(...node)
  })

function renderProductList(products) {
  let node = []
  products.forEach((product) => {
    const productItem = document.createElement('div')
    productItem.classList.add(...['col', 'mb-5'])
    productItem.innerHTML = `
          <div class="card h-100">
              <!-- Product image-->
              <img
              class="card-img-top"
              src="${
                product.url_image === '' || product.url_image === null
                  ? '../assets/no-image.svg'
                  : product.url_image
              }"
              alt="${product.name}"
              />
              <!-- Product details-->
              <div class="card-body p-4">
              <div class="text-center">
                  <!-- Product name-->
                  <h5 class="fw-bolder">${product.name}</h5>
                  <!-- Product price-->
                  $${product.price}
              </div>
              </div>
              <!-- Product actions-->
              <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Agregar al carrito</a></div>
              </div>
          </div>
          `
    node.push(productItem)
  })
  productList.append(...node)
}

function fetchProductByCategory() {
  let query
  if (categorySelect.value === 'Todas') query = './product'
  else query = `./product/category/${categorySelect.value}`
  console.log(query)
  fetch(query)
    .then((response) => response.json())
    .then((products) => {
      renderProductList(products)
    })
}
fetchProductByCategory()

function fetchProductBySearch() {
  let query = `./product/search/${searchInput.value}?`
  if (categorySelect.value !== 'Todas')
    query += `categoryId=${categorySelect.value}`
  console.log(query)
  fetch(query)
    .then((response) => response.json())
    .then((products) => {
      renderProductList(products)
    })
}

categorySelect.addEventListener('change', () => {
  productList.innerHTML = ''
  searchInput.value = ''
  fetchProductByCategory()
})

searchInput.addEventListener('keyup', () => {
  console.log(categorySelect.value)
  console.log(searchInput.value)
  productList.innerHTML = ''
  if (searchInput.value === '') fetchProductByCategory()
  else fetchProductBySearch()
})
