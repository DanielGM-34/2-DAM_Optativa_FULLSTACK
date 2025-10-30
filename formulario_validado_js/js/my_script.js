// Validaciones individuales
function validarNombre(valor) {
  return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/.test(valor);
}

function validarEmail(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

function validarPassword(valor) {
  const errores = [];
  if (valor.length < 8) {errores.push("- Mínimo 8 caracteres");}
  if (valor.length > 15){errores.push("- Máximo 15 caracteres");} 
  if (!/[A-Z]/.test(valor)){errores.push("- Al menos una mayúscula");} 
  if (!/[a-z]/.test(valor)){errores.push("- Al menos una minúscula");} 
  if (!/\d/.test(valor)){errores.push("- Al menos un número");} 
  if (!/[$@$!%*?&#%]/.test(valor)){errores.push("- Al menos un carácter especial ($@$!%*?&#%)");} 
  if (/\s/.test(valor)){errores.push("- No debe tener espacios");} 
  return errores;
}

function validarFecha(valor) {
  let esValido = false;

  if (valor) {
    const hoy = new Date();
    const fecha = new Date(valor);

    if (!isNaN(fecha.getTime())) {
      let edad = hoy.getFullYear() - fecha.getFullYear();
      const mes = hoy.getMonth() - fecha.getMonth();

      // Ajustar si aún no ha cumplido años este año
      if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
        edad--;
      }

      esValido = edad >= 18 && edad <= 100;
    }
  }

  return esValido;
}

function validarCP(valor) {
  return /^\d{5}$/.test(valor);
}

function validarTelefono(valor) {
  return /^(\+34|0034)?\s?[6789]\d{8}$/.test(valor);
}


function validarGenero(valor) {
  return valor !== "";
}

function validarPais(valor) {
  return valor !== "";
}

function validarDNI(valor) {
  return /^[0-9]{8}[A-Z]$/.test(valor) || /^[XYZ][0-9]{7}[A-Z]$/.test(valor);
}

function validarComentarios(valor) {
  return /^.{10,}$/.test(valor);
}

function validarDireccion(valor) {
  const validaDireccion = /^(Calle|C\.?|Avenida|Avda\.?|Plaza|Camino|Paseo|Carretera|Callejón)\s+[\wÁÉÍÓÚáéíóúÑñºª\-\/\(\)\.]+(?:\s[\wÁÉÍÓÚáéíóúÑñºª\-\/\(\)\.]+)*\,?\s*(S\/N|\d{1,4}[ºª]?[A-Za-z\-\/]*)?(?:\,?\s*\d{5})?(?:\,?\s+[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+(?:\s*\([A-Za-zÁÉÍÓÚáéíóúÑñ\s]+\))?)?$/i;
  return validaDireccion.test(valor);
}





// Mostrar y limpiar errores
function mostrarError(id, mensaje) {
  const campo = document.getElementById(id);
  campo.classList.add("invalid");
  campo.classList.remove("valid");
  const error = document.createElement("div");
  error.className = "error-message";
  error.style.color = "red";
  error.textContent = mensaje;
  campo.parentNode.appendChild(error);
  actualizarBotonSubmit();
}

function limpiarErrores(id) {
  const campo = document.getElementById(id);
  campo.classList.remove("invalid");
  campo.classList.add("valid");
  campo.parentNode.querySelectorAll(".error-message").forEach((el) => el.remove());
  actualizarBotonSubmit();
}

// Validar campo genérico, usado para la contraseña mayormente
function validarCampo(id, validador, mensaje) {
  const valor = document.getElementById(id).value.trim();
  const resultado = validador(valor);
  limpiarErrores(id);

  if (typeof resultado === "boolean") {
    if (!resultado) mostrarError(id, mensaje);
  } else if (Array.isArray(resultado) && resultado.length > 0) {
    mostrarError(id, "La contraseña debe cumplir:\n" + resultado.join("\n"));
  }
}

// Mostrar/ocultar botón de submit
function actualizarBotonSubmit() {
  const campos = document.querySelectorAll(".form-control");
  const todosValidos = Array.from(campos).every((campo) =>
    campo.classList.contains("valid")
  );
  const submitBtn = document.querySelector("button[type='submit']");
  submitBtn.style.display = todosValidos ? "inline-block" : "none";
}



// Eventos blur de campos
document.getElementById("nombre").addEventListener("blur", () =>
  validarCampo("nombre", validarNombre, "Nombre inválido (mínimo 3 letras, sin números).")
);
document.getElementById("email").addEventListener("blur", () =>
  validarCampo("email", validarEmail, "Correo electrónico no válido. Este sería un ejemplo de un email válido: Emailfalso@ejemplo.com")
);
document.getElementById("password").addEventListener("blur", () =>
  validarCampo("password", validarPassword, )
);
document.getElementById("fecha").addEventListener("blur", () =>
  validarCampo("fecha", validarFecha, "La fecha no puede ser futura y la edad tiene que estar en un rango entre 18 y 100 años.")
);
document.getElementById("cp").addEventListener("blur", () =>
  validarCampo("cp", validarCP, "Código postal de 5 números.")
);
document.getElementById("telefono").addEventListener("blur", () =>
  validarCampo("telefono", validarTelefono, "el teléfono debe tener 9 números JUNTOS y debe COMENZAR POR 6 O 7.")
);
document.getElementById("genero").addEventListener("blur", () =>
  validarCampo("genero", validarGenero, "Selecciona tu género.")
);
document.getElementById("pais").addEventListener("blur", () =>
  validarCampo("pais", validarPais, "Debes seleccionar un país.")
);
document.getElementById("dni").addEventListener("blur", () =>
  validarCampo("dni", validarDNI, "DNI/NIE/Pasaporte no válido.")
);
document.getElementById("comentarios").addEventListener("blur", () =>
  validarCampo("comentarios", validarComentarios, "Escribe al menos 10 caracteres.")
);
document.getElementById("direccion").addEventListener("blur", () =>
  validarCampo("direccion", validarDireccion, "Pon aquí tu dirección SIN COMAS NI PUNTOS. Debe empezar por Calle, C, Avenida, Avda., Plaza, Camino, Paseo o Carretera seguido del nombre y número. Ejemplo: Calle Mayor 10")
);


function limpiarFormulario() {
  const form = document.querySelector("form");

  form.querySelectorAll("input, select, textarea").forEach((campo) =>
    campo.classList.remove("valid", "invalid")
  );

  form.querySelectorAll(".error-message").forEach((el) => el.remove());

  document.getElementById("password").type = "password";
  document.getElementById("togglePassword").textContent = "👁️";
  form.reset();
  actualizarBotonSubmit();
}

// Escucha el evento reset
document.querySelector("form").addEventListener("reset", limpiarFormulario);
limpiarFormulario();


// Mostrar animación con los datos
function mostrarAnimacion(datos) {
  const contenedor = document.getElementById("animacionDatos");
  contenedor.innerHTML = `
    <h3>👌 Datos enviados correctamente</h3>
    <ul>
      <li><strong>Nombre:</strong> ${datos.nombre}</li>
      <li><strong>Email:</strong> ${datos.email}</li>
      <li><strong>Contraseña:</strong> ${datos.password}</li>
      <li><strong>Fecha de nacimiento:</strong> ${datos.fecha}</li>
      <li><strong>Código postal:</strong> ${datos.cp}</li>
      <li><strong>Teléfono:</strong> ${datos.telefono}</li>
      <li><strong>Género:</strong> ${datos.genero}</li>
      <li><strong>País:</strong> ${datos.pais}</li>
      <li><strong>DNI/NIE/Pasaporte:</strong> ${datos.dni}</li>
      <li><strong>Comentarios:</strong> ${datos.comentarios}</li>
      <li><strong>Dirección:</strong> ${datos.direccion}</li>
    </ul>
  `;
  contenedor.style.display = "block";

  setTimeout(() => {
    contenedor.style.display = "none";
  }, 8000);
}

// Validar y mostrar datos al enviar
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = e.target;

  const camposValidadores = {
    nombre: validarNombre,
    email: validarEmail,
    password: validarPassword,
    fecha: validarFecha,
    cp: validarCP,
    telefono: validarTelefono,
    genero: validarGenero,
    pais: validarPais,
    dni: validarDNI,
    comentarios: validarComentarios,
    direccion: validarDireccion
  };

  let todoCorrecto = true;
  const datos = {};
  for (const id in camposValidadores) {
    const validador = camposValidadores[id];
    const valor = form[id].value.trim();
    const resultado = validador(valor);
    datos[id] = valor;
    limpiarErrores(id);

    if (typeof resultado === "boolean") {
      if (!resultado) {
        mostrarError(id, "");
        todoCorrecto = false;
      }
    } else if (Array.isArray(resultado) && resultado.length > 0) {
      mostrarError(id, "La contraseña debe cumplir:\n" + resultado.join("\n"));
      todoCorrecto = false;
    }
  }

  if (todoCorrecto) {
    mostrarAnimacion(datos);
    limpiarFormulario();
  }
});


// Mostrar/ocultar contraseña
document.getElementById("togglePassword").addEventListener("click", function () {
  const input = document.getElementById("password");
  const icon = this;

  if (input.type === "password") {
    input.type = "text";
    icon.textContent = "🙈";
  } else {
    input.type = "password";
    icon.textContent = "👁️";
  }
});

// Ocultar botón al cargar
window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("button[type='submit']").style.display = "none";
});