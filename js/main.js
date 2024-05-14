import { cargarCategorias as categorias } from "./categorias.js";
const categoriasSelect = document.getElementById("categorias");
const resultadoDiv1 = document.getElementById("resultado1");
categorias(categoriasSelect, resultadoDiv1);

