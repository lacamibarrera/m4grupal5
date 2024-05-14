import { cargarComidas as comidas } from "./comidas.js";
const comidasSelect = document.getElementById("comidas");
const resultadoDiv2 = document.getElementById("resultado2");
// Función para cargar las categorías de recetas
export async function cargarCategorias(categoriasSelect, resultadoDiv1) {
  // Obtener referencias a elementos del DOM
  const url = "https://www.themealdb.com/api/json/v1/1/categories.php";

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data); //muestra los datos que viene nen formato .json

    const categorias = data.categories;
    categorias.sort((a, b) => a.strCategory.localeCompare(b.strCategory));

    categorias.forEach((categoria) => {
      const option = document.createElement("option");
      option.value = categoria.idCategory;
      option.text = categoria.strCategory;
      categoriasSelect.appendChild(option);
    });

    categoriasSelect.addEventListener("change", () => {
      const categoriaSeleccionada = categorias.find(
        (categoria) => categoria.idCategory === categoriasSelect.value
      );
      
      resultadoDiv1.innerHTML = `
      <div class="card mb-3 m-auto p-2"> 
      <p>ID: ${categoriaSeleccionada.idCategory}</p>
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${categoriaSeleccionada.strCategoryThumb}" class="img-fluid rounded border" alt="${categoriaSeleccionada.strCategory}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title display-6">${categoriaSeleccionada.strCategory}</h5>
            <p class="card-text">${categoriaSeleccionada.strCategoryDescription}</p>
          </div>
        </div>
      </div>
    </div>
        `;
        while (comidasSelect.firstChild) {
          comidasSelect.removeChild(comidasSelect.firstChild); /// borra las opciones del select
        }
        comidas(categoriaSeleccionada.strCategory, comidasSelect, resultadoDiv2);
    });
  } catch (error) {
    console.log("Error:", error);
  }
}
