//Función para cargar las comidas de una categorias
export async function cargarComidas(categoria, comidasSelect, resultadoDiv2) {
  // Obtener referencias a elementos del DOM
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;

  

  try {
    const response = await fetch(url);
    const data = await response.json();

    const comidas = data.meals;
    comidas.sort((a, b) => a.strMeal.localeCompare(b.strMeal));

    comidas.forEach((comida) => {
      const option = document.createElement("option");
      option.value = comida.idMeal;
      option.text = comida.strMeal;
      comidasSelect.appendChild(option);
    });

    comidasSelect.addEventListener("change", () => {
      const comidaSelecionada = comidas.find(
        (comida) => comida.idMeal === comidasSelect.value
      );

      resultadoDiv2.innerHTML = `
      <div class="card mb-3 m-auto p-2 opcion"> 
      <p>ID: ${comidaSelecionada.idMeal}</p>
      <div class="row g-0">
        <div class="col-md-4">
        <img class="img-fluid rounded border" src="${comidaSelecionada.strMealThumb}" alt="${comidaSelecionada.strMeal}" />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title display-4">${comidaSelecionada.strMeal}</h5>
          </div>
        </div>
      </div>
    </div>
        `;
    });
    comidasSelect.removeChild(option);

    console.log(data);
  } catch (error) {
    console.log("Error:", error);
  }
}
