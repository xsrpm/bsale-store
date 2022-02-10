const categorySelect = document.getElementById('category-select')
const searchInput = document.getElementById('search-input')
const productList = document.getElementById('product-list')
const orderByPriceSelect = document.getElementById('order-by-price-select')

fetch('./category')
  .then((response) => {
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('No se encontró el recurso solicitado')
      } else {
        throw new Error('No se obtuvo una correcta respuesta del servidor')
      }
    }
    return response.json()
  })
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
  .catch((error) => {
    console.error(error)
  })

function renderProductList(products) {
  productList.innerHTML = ''
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
    .then((response) => {
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('No se encontró el recurso solicitado')
        } else {
          throw new Error('No se obtuvo una correcta respuesta del servidor')
        }
      }
      return response.json()
    })
    .then((products) => {
      renderProductList(products)
    })
    .catch((error) => {
      console.log(error)
    })
}
fetchProductByCategory()

function fetchProductBySearch() {
  console.log(orderByPriceSelect.value)
  console.log(categorySelect.value)
  if (searchInput.value === '') return
  let query = `./product/search/${searchInput.value}?`
  query +=
    categorySelect.value === 'Todas'
      ? ''
      : `categoryId=${categorySelect.value}&`
  query +=
    orderByPriceSelect.value === '---'
      ? ''
      : `orderByPrice=${orderByPriceSelect.value}`
  console.log(query)
  fetch(query)
    .then((response) => {
      if (!response.ok) {
        if (response.status === 404) {
          productList.innerHTML = 'No se encontró el recurso solicitado'
          throw new Error('No se encontró el recurso solicitado')
        } else if (response.status === 403) {
          productList.innerHTML = 'La solicitud fue denegada por el servidor'
          throw new Error('La solicitud fue denegada por el servidor')
        } else {
          productList.innerHTML =
            'No se obtuvo una correcta respuesta del servidor'
          throw new Error('No se obtuvo una correcta respuesta del servidor')
        }
      }
      return response.json()
    })
    .then((products) => {
      if (products && products.length === 0)
        productList.innerHTML = 'No se encontraron resultados'
      else renderProductList(products)
    })
    .catch((error) => {
      console.log(error)
    })
}
fetchProductBySearch()

categorySelect.addEventListener('change', () => {
  searchInput.value = ''
  orderByPriceSelect.value = '---'
  fetchProductByCategory()
})

orderByPriceSelect.addEventListener('change', () => {
  if (orderByPriceSelect.value === '---') return fetchProductByCategory()
  fetchProductBySearch()
})

searchInput.addEventListener('keyup', () => {
  console.log(categorySelect.value)
  console.log(searchInput.value)
  productList.innerHTML = ''
  if (searchInput.value === '') fetchProductByCategory()
  else fetchProductBySearch()
})

productList.addEventListener('click', (event) => {
  if (event.target.classList.contains('btn')) {
    event.preventDefault()
    console.log('click')
  }
})
