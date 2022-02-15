import { ErrorFetch } from '../entities/errorFetch.js'

class ProductsResponse {
  /**
   * Create a JavaScript object with two properties: error and data
   * @param error {ErrorFetch} - The error fetch object.
   * @param data Array<Product>} - The data that was returned by the API call.
   */
  constructor() {
    ;(this.error = new ErrorFetch()), (this.data = [])
  }
}

/**
 * It fetches the products from the API.
 * @param {string} category - The category of the products you want to fetch.
 * @returns {ProductsResponse} - the response of fetch of products.
 */
async function fetchProductByCategory(category) {
  let query
  if (category === 'Todas') query = './product'
  else query = `./product/category/${category}`
  console.log(query)
  const res = new ProductsResponse()
  try {
    const response = await fetch(query)
    if (!response.ok) {
      if (response.status === 404) {
        res.error.status = response.status
        res.error.message = 'No se encontró el recurso solicitado'
        res.error.isError = true
      } else {
        res.error.status = response.status
        res.error.message = 'No se obtuvo una correcta respuesta del servidor'
        res.error.isError = true
      }
      return res
    }
    res.data = await response.json()
    res.error.status = response.status
    res.error.message = 'Se obtuvo una correcta respuesta del servidor'
    res.error.isError = false
    console.log(res)
    return res
  } catch (error) {
    console.error(error)
  }
}

/**
 * Fetch products by search
 * @param category {integer}- The category of the products you want to search.
 * @param orderByPrice {string}- The order in which the products will be displayed.
 * @param searchText {string}- The text that the user types in the search bar.
 * @returns {ProductsResponse} - the response of fetch of products.
 */
async function fetchProductBySearch(category, orderByPrice, searchText) {
  console.log(orderByPrice)
  console.log(category)
  const res = new ProductsResponse()
  if (searchText === '') {
    res.error.status = 200
    res.error.message = 'No ingresó un termino de búsqueda'
    res.error.isError = true
    return res
  }
  let query = `./product/search/${searchText}?`
  query += category === 'Todas' ? '' : `categoryId=${category}&`
  query += orderByPrice === '---' ? '' : `orderByPrice=${orderByPrice}`
  console.log(query)

  try {
    const response = await fetch(query)
    if (!response.ok) {
      if (response.status === 404) {
        res.error.status = response.status
        res.error.message = 'No se encontró el recurso solicitado'
        res.error.isError = true
      } else if (response.status === 403) {
        res.error.status = response.status
        res.error.message = 'La solicitud fue denegada por el servidor'
        res.error.isError = true
      } else {
        res.error.status = response.status
        res.error.message = 'No se obtuvo una correcta respuesta del servidor'
        res.error.isError = true
      }
      console.log(res)
      return res
    }
    const products = await response.json()
    if (products && products.length === 0) {
      res.error.status = response.status
      res.error.message = 'No se encontraron resultados'
      res.error.isError = true
    } else {
      res.error.status = response.status
      res.error.message = 'Se encontraron resultados'
      res.error.isError = false
      res.data = products
    }
    return res
  } catch (error) {
    console.log(error)
  }
}

/**
 * It renders the product list.
 * @param productsResponse {ProductsResponse} - The response of fetch of products.
 * @param productList {HTMLElement}- The element where the products will be rendered.
 */
function renderProductList(productsResponse, productList) {
  productList.innerHTML = ''
  let node = []
  if (productsResponse.error.isError) {
    productList.innerHTML = productsResponse.error.message
    return
  }
  productsResponse.data.forEach((product) => {
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
                loading="lazy"
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

/**
 * It fetches the products by category and then paints them on the page.
 * @param category {string} - The category of the product you want to paint.
 * @param productList {HTMLElement} - The list of products to be rendered.
 */
export async function paintProductByCategory(category, productList) {
  const response = await fetchProductByCategory(category)
  renderProductList(response, productList)
  console.log('Products painted')
}

/**
 * It calls the fetchProductBySearch function and then renders the product list.
 * @param category {string} - The category of the product.
 * @param orderByPrice {string} - The order in which the products will be displayed.
 * @param searchText {string} - The text that the user entered in the search input.
 * @param productList {HTMLElement} - The element where the products will be rendered.
 */
export async function paintProductBySearch(
  category,
  orderByPrice,
  searchText,
  productList
) {
  const response = await fetchProductBySearch(
    category,
    orderByPrice,
    searchText
  )
  console.log(response)
  renderProductList(response, productList)
  console.log('Products painted')
}
