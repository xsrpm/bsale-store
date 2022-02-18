import { Category } from '../entities/category.js'

/**
 * Create an HTML element for each category and append it to the category select element
 * @param { Array<Category >} categories - an array of category objects
 * @param {HTMLElement} categorySelect - the select element that will be populated with the categories.
 */
function renderCategories(categories, categorySelect) {
  let node = []
  categories.forEach((category) => {
    const option = document.createElement('option')
    option.value = category.id
    option.innerText = category.name
    node.push(option)
  })
  categorySelect.append(...node)
}

/**
 * It fetches the categories from the server.
 * @returns {Array<Category>} An array of categories objects.
 */
async function fetchCategories() {
  try {
    const response = await fetch('./categories')
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('No se encontró el recurso solicitado')
      } else {
        throw new Error('No se obtuvo una correcta respuesta del servidor')
      }
    }
    const categories = await response.json()
    return categories
  } catch (error) {
    console.error(error)
  }
}

/**
 * It fetches the categories from the API and then paints them on the page.
 * @param {HTMLElement} categorySelect - the select element that will be populated with the categories
 */
export async function paintCategories(categorySelect) {
  const categories = await fetchCategories()
  console.log(categories)
  renderCategories(categories, categorySelect)
  console.log('Categories painted')
}
