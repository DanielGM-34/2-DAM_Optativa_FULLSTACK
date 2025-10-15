document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  let todoCorrecto = true;

  // Elimina errores anteriores
  document.querySelectorAll(".error-message").forEach((el) => el.remove());

  // Función para mostrar errores
  function mostrarError(id, mensaje) {
    const campo = document.getElementById(id);
    const error = document.createElement("div");
    error.className = "error-message";
    error.style.color = "red";
    error.textContent = mensaje;
    campo.parentNode.appendChild(error);
    campo.classList.add("invalid");
    todoCorrecto = false;
  }
  // Validaciones con patrones regulares
  const nombre = form.nombre.value.trim();
  const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/;
  if (!nombreRegex.test(nombre)) {
    mostrarError("nombre", "Nombre inválido (mínimo 3 letras, sin números).");
  }

  const email = form.email.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    mostrarError("email", "Correo electrónico no válido.");
  }

  const password = form.password.value;
  let erroresPassword = [];

  if (password.length < 8) {
    erroresPassword.push("- Mínimo 8 caracteres");
  }
  if (password.length > 15) {
    erroresPassword.push("- Máximo 15 caracteres");
  }
  if (!/[A-Z]/.test(password)) {
    erroresPassword.push("- Al menos una letra mayúscula");
  }
  if (!/[a-z]/.test(password)) {
    erroresPassword.push("- Al menos una letra minúscula");
  }
  if (!/\d/.test(password)) {
    erroresPassword.push("- Al menos un dígito");
  }
  if (!/[$@$!%*?&]/.test(password)) {
    erroresPassword.push("- Al menos un carácter especial ($@!%*?&)");
  }
  if (/\s/.test(password)) {
    erroresPassword.push("- No debe contener espacios en blanco");
  }

  if (erroresPassword.length > 0) {
    mostrarError(
      "password",
      "La contraseña debe cumplir:\n" + erroresPassword.join("\n"),
    );
  }
    
console.log(erroresPassword)

  const fecha = form.fecha.value;
  if (fecha === "") {
    mostrarError("fecha", "Selecciona tu fecha de nacimiento.");
  } else {
    const fechaIngresada = new Date(fecha);
    const hoy = new Date();
    if (fechaIngresada > hoy) {
      mostrarError("fecha", "La fecha no puede ser futura.");
    }
  }

  const cp = form.cp.value;
  const cpRegex = /^\d{5}$/;
  if (!cpRegex.test(cp)) {
    mostrarError("cp", "Código postal de 5 números.");
  }

  const telefono = form.telefono.value;
  const telRegex = /^\d{9}$/;
  if (!telRegex.test(telefono)) {
    mostrarError("telefono", "Teléfono de 9 números.");
  }

  const genero = form.genero.value;
  if (genero === "") {
    mostrarError("genero", "Selecciona tu género.");
  }

  const pais = form.pais.value.trim();
  const paisRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  if (!paisRegex.test(pais)) {
    mostrarError("pais", "El país no debe contener números ni símbolos.");
  }

  const dni = form.dni.value.trim();
  const dniRegex = /^[0-9]{8}[A-Z]$/;
  const nieRegex = /^[XYZ][0-9]{7}[A-Z]$/;
  if (!dniRegex.test(dni) && !nieRegex.test(dni)) {
    mostrarError("dni", "DNI/NIE/Pasaporte no válido.");
  }

  const comentarios = form.comentarios.value.trim();
  const comentariosRegex = /^.{10,}$/;
  if (!comentariosRegex.test(comentarios)) {
    mostrarError("comentarios", "Escribe al menos 10 caracteres.");
  }

  const direccion = form.direccion.value.trim();
  const referenciaRegex = /^.{3,}$/;
  if (!referenciaRegex.test(direccion)) {
    mostrarError("direccion", "Pon aquí tu dirección.");
  }


  if (todoCorrecto) {
    alert(`Datos introducidos:
Nombre: ${nombre}
Email: ${email}
Contraseña: ${password}
Fecha de nacimiento: ${fecha}
Código postal: ${cp}
Teléfono: ${telefono}
Género: ${genero}
País: ${pais}
DNI/NIE/Pasaporte: ${dni}
Comentarios: ${comentarios}
Dirección: ${direccion}`);
  } else {
    const primerError = document.querySelector(".invalid");
    primerError.scrollIntoView({ behavior: "smooth" });
  }
});

document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
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
