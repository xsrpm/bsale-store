import { paintCategories } from './modules/categories.mjs'
import {
  paintProductByCategory,
  paintProductBySearch
} from './modules/products.mjs'
;(async function () {
  const categorySelect = document.getElementById('category-select')
  const searchInput = document.getElementById('search-input')
  const searchButton = document.getElementById('search-button')
  const productList = document.getElementById('product-list')
  const orderByPriceSelect = document.getElementById('order-by-price-select')

  paintCategories(categorySelect)
  paintProductByCategory(categorySelect.value, productList)

  categorySelect.addEventListener('change', () => {
    searchInput.value = ''
    orderByPriceSelect.value = '---'
    paintProductByCategory(categorySelect.value, productList)
  })

  searchButton.addEventListener('click', () => {
    console.log(categorySelect.value)
    console.log(searchInput.value)
    productList.innerHTML = ''
    paintProductBySearch(
      categorySelect.value,
      orderByPriceSelect.value,
      searchInput.value,
      productList,
      productList
    )
  })

  productList.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn')) {
      event.preventDefault()
      console.log('click')
    }
  })
})() //IIFE
