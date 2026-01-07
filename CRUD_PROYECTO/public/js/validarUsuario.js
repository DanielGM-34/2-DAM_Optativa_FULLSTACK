// VALIDACIONES
function validarNombre(valor) {
  return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/.test(valor);
}

function validarEmail(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

function validarPassword(valor) {
  const errores = [];
  if (valor.length < 8) errores.push("- Mínimo 8 caracteres");
  if (!/[A-Z]/.test(valor)) errores.push("- Al menos una mayúscula");
  if (!/[a-z]/.test(valor)) errores.push("- Al menos una minúscula");
  if (!/\d/.test(valor)) errores.push("- Al menos un número");
  if (!/[$@$!%*?&#%]/.test(valor)) errores.push("- Al menos un carácter especial");
  return errores;
}

function validarDNI(dni) {
  const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
  dni = dni.replace(/\s/g, '').toUpperCase();

  let esValido = false;

  if (/^\d{8}[A-Z]$/.test(dni)) {
    const numero = parseInt(dni.substring(0, 8), 10);
    const letraCorrecta = letras[numero % 23];
    esValido = dni[8] === letraCorrecta;
  }

  return esValido;
}


function validarObjetivo(valor) {
  return valor.length >= 3;
}

function validarMembresia(valor) {
  return valor === "activa" || valor === "vencida";
}

// SISTEMA DE ERRORES (Bootstrap)
function marcarInvalido(id, mensaje) {
  const campo = document.getElementById(id);
  campo.classList.remove("is-valid");
  campo.classList.add("is-invalid");

  let feedback = campo.parentNode.querySelector(".invalid-feedback");
  if (!feedback) {
    feedback = document.createElement("div");
    feedback.className = "invalid-feedback";
    campo.parentNode.appendChild(feedback);
  }
  feedback.textContent = mensaje || "Debes poner 8 dígitos y una letra válida.";
}

function marcarValido(id) {
  const campo = document.getElementById(id);
  campo.classList.remove("is-invalid");
  campo.classList.add("is-valid");

  const feedback = campo.parentNode.querySelector(".invalid-feedback");
  if (feedback) feedback.remove();
}

// VALIDACIÓN GENÉRICA
function validarCampo(id, validador, mensaje) {
  const valor = document.getElementById(id).value.trim();
  const resultado = validador(valor);

  if (typeof resultado === "boolean") {
    if (!resultado) marcarInvalido(id);
    else marcarValido(id);
  } else if (Array.isArray(resultado) && resultado.length > 0) {
    marcarInvalido(id, resultado.join("\n"));
  } else {
    marcarValido(id);
  }
}

// EVENTOS
document.getElementById("dni").addEventListener("blur", () =>
  validarCampo("dni", validarDNI, "DNI inválido: deben ser 8 números y una letra válida.")
);

document.getElementById("nombre").addEventListener("blur", () =>
  validarCampo("nombre", validarNombre, "El nombre debe tener al menos 3 letras.")
);

document.getElementById("email").addEventListener("blur", () =>
  validarCampo("email", validarEmail, "Introduce un email válido. Ejemplo: correo@ejemplo.com")
);

document.getElementById("password").addEventListener("blur", () =>
  validarCampo("password", validarPassword, "La contraseña no cumple los requisitos.")
);

document.getElementById("objetivo").addEventListener("blur", () =>
  validarCampo("objetivo", validarObjetivo, "Debes escribir al menos 3 caracteres.")
);

document.getElementById("membresia").addEventListener("blur", () =>
  validarCampo("membresia", validarMembresia, "Selecciona una opción válida.")
);


// TOGGLE PASSWORD (Bootstrap Icons)
document.getElementById("togglePassword").addEventListener("click", function () {
  const input = document.getElementById("password");
  const icon = this.querySelector("i");

  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("bi-eye");
    icon.classList.add("bi-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("bi-eye-slash");
    icon.classList.add("bi-eye");
  }
});

// SUBMIT FINAL
document.getElementById("formUsuario").addEventListener("submit", async (e) => {
  const campos = ["dni", "nombre", "email", "password", "objetivo", "membresia"];
  let todoCorrecto = true;

  campos.forEach(id => {
    const campo = document.getElementById(id);
    if (!campo.classList.contains("is-valid")) todoCorrecto = false;
  });

  if (!todoCorrecto) {
    e.preventDefault();
    alert("Corrige los errores antes de enviar.");
  } else {
    e.preventDefault(); // detenemos envío para mostrar animación

    const mensaje = document.getElementById("mensajeExito");
    mensaje.style.display = "block";

    let contador = 5;
    const span = document.getElementById("contador");

    const intervalo = setInterval(() => {
      contador--;
      span.textContent = contador;

      if (contador === 0) {
        clearInterval(intervalo);
        document.getElementById("formUsuario").submit(); // ahora sí enviamos
      }
    }, 1000);
  }
});
