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
  if (!/[$@$!%*?&]/.test(valor)){errores.push("- Al menos un carácter especial");} 
  if (/\s/.test(valor)){errores.push("- No debe tener espacios");} 
  return errores;
}

function validarFecha(valor) {
  const hoy = new Date();
  const fecha = new Date(valor);
  return valor !== "" && fecha <= hoy;
}

function validarCP(valor) {
  return /^\d{5}$/.test(valor);
}

function validarTelefono(valor) {
  return /^\d{9}$/.test(valor);
}

function validarGenero(valor) {
  return valor !== "";
}

function validarPais(valor) {
  return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(valor);
}

function validarDNI(valor) {
  return /^[0-9]{8}[A-Z]$/.test(valor) || /^[XYZ][0-9]{7}[A-Z]$/.test(valor);
}

function validarComentarios(valor) {
  return /^.{10,}$/.test(valor);
}

function validarDireccion(valor) {
  return /^.{3,}$/.test(valor);
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

// Validar campo genérico
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

// Validar todos los campos al enviar
function validarTodosLosCampos() {
  validarCampo("nombre", validarNombre, "Nombre inválido (mínimo 3 letras, sin números).");
  validarCampo("email", validarEmail, "Correo electrónico no válido.");
  validarCampo("password", validarPassword, "");
  validarCampo("fecha", validarFecha, "Fecha inválida o futura.");
  validarCampo("cp", validarCP, "Código postal de 5 números.");
  validarCampo("telefono", validarTelefono, "Teléfono de 9 números.");
  validarCampo("genero", validarGenero, "Selecciona tu género.");
  validarCampo("pais", validarPais, "El país no debe contener números ni símbolos.");
  validarCampo("dni", validarDNI, "DNI/NIE/Pasaporte no válido.");
  validarCampo("comentarios", validarComentarios, "Escribe al menos 10 caracteres.");
  validarCampo("direccion", validarDireccion, "Pon aquí tu dirección.");
}

// Eventos blur por campo
document.getElementById("nombre").addEventListener("blur", () =>
  validarCampo("nombre", validarNombre, "Nombre inválido (mínimo 3 letras, sin números).")
);
document.getElementById("email").addEventListener("blur", () =>
  validarCampo("email", validarEmail, "Correo electrónico no válido.")
);
document.getElementById("password").addEventListener("blur", () =>
  validarCampo("password", validarPassword, )
);
document.getElementById("fecha").addEventListener("blur", () =>
  validarCampo("fecha", validarFecha, "La fecha no puede ser futura.")
);
document.getElementById("cp").addEventListener("blur", () =>
  validarCampo("cp", validarCP, "Código postal de 5 números.")
);
document.getElementById("telefono").addEventListener("blur", () =>
  validarCampo("telefono", validarTelefono, "Teléfono de 9 números.")
);
document.getElementById("genero").addEventListener("blur", () =>
  validarCampo("genero", validarGenero, "Selecciona tu género.")
);
document.getElementById("pais").addEventListener("blur", () =>
  validarCampo("pais", validarPais, "El país no debe contener números ni símbolos.")
);
document.getElementById("dni").addEventListener("blur", () =>
  validarCampo("dni", validarDNI, "DNI/NIE/Pasaporte no válido.")
);
document.getElementById("comentarios").addEventListener("blur", () =>
  validarCampo("comentarios", validarComentarios, "Escribe al menos 10 caracteres.")
);
document.getElementById("direccion").addEventListener("blur", () =>
  validarCampo("direccion", validarDireccion, "Pon aquí tu dirección.")
);

// Mostrar/ocultar contraseña
document.getElementById("togglePassword").addEventListener("click", function () {
  const input = document.getElementById("password");
  const icon = this;
  input.type = input.type === "password" ? "text" : "password";
  icon.textContent = input.type === "password" ? "👁️" : "🙈";
});

// Resetear estilos y errores
document.querySelector("form").addEventListener("reset", function () {
  document.querySelectorAll(".form-control").forEach((campo) =>
    campo.classList.remove("valid", "invalid")
  );
  document.querySelectorAll(".error-message").forEach((el) => el.remove());
  document.getElementById("password").type = "password";
  document.getElementById("togglePassword").textContent = "👁️";
  actualizarBotonSubmit();
});

// Validar y mostrar datos al enviar
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  validarTodosLosCampos();

  const form = e.target;
  const datos = {
    nombre: form.nombre.value.trim(),
    email: form.email.value.trim(),
    password: form.password.value,
    fecha: form.fecha.value,
    cp: form.cp.value,
    telefono: form.telefono.value,
    genero: form.genero.value,
    pais: form.pais.value.trim(),
    dni: form.dni.value.trim(),
    comentarios: form.comentarios.value.trim(),
    direccion: form.direccion.value.trim()
  };

  alert(`Datos introducidos:
Nombre: ${datos.nombre}
Email: ${datos.email}
Contraseña: ${datos.password}
Fecha de nacimiento: ${datos.fecha}
Código postal: ${datos.cp}
Teléfono: ${datos.telefono}
Género: ${datos.genero}
País: ${datos.pais}
DNI/NIE/Pasaporte: ${datos.dni}
Comentarios: ${datos.comentarios}
Dirección: ${datos.direccion}`);
});

// Ocultar botón al cargar
window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("button[type='submit']").style.display = "none";
});
