const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();
        const warnings = document.getElementById("loginWarnings");

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


        const usuario = usuarios.find(
        u => u.email === email && u.password === password
        );

        if (!usuario) {
        warnings.innerHTML = "Correo o contraseña incorrectos.";
        warnings.className = "alert alert-danger";
        return;
        }

        localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

        warnings.innerHTML = "Login exitoso";
        warnings.className = "alert alert-success";

        setTimeout(() => {
        window.location.href = "index.html";
        }, 1000);
  });
}


const registroForm = document.getElementById("registroForm");

if (registroForm) {
  registroForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombreInput = document.getElementById("regNombre");
    const emailInput = document.getElementById("regEmail");
    const passInput = document.getElementById("regPassword");
    const warnings = document.getElementById("registroWarnings");

    console.log(nombreInput.value, emailInput.value, passInput.value);

    const nombre = nombreInput.value.trim();
    const email = emailInput.value.trim();
    const password = passInput.value.trim();

    let errores = "";
    let valido = true;

    const expCorreo = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

    if (nombre.length < 6) {
      errores += "El nombre debe tener al menos 6 caracteres.<br>";
      valido = false;
    }

    if (!expCorreo.test(email)) {
      errores += "Correo no válido.<br>";
      valido = false;
    }

    if (password.length < 4 || password.length > 10) {
      errores += "La contraseña debe tener entre 4 y 10 caracteres.<br>";
      valido = false;
    }

    if (!valido) {
      warnings.innerHTML = errores;
      warnings.className = "alert alert-danger";
      return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.find(u => u.email === email);
    if (existe) {
      warnings.innerHTML = "El correo ya está registrado.";
      warnings.className = "alert alert-danger";
      return;
    }

    const nuevoUsuario = {
      nombre: nombre,
      email: email,
      password: password,
      rol: "cliente"
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    warnings.innerHTML = "Registro exitoso";
    warnings.className = "alert alert-success";

    registroForm.reset();
  });
}

const contactoForm = document.getElementById("contactoForm");

if (contactoForm) {
    contactoForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nombre = document.getElementById("contactoNombre").value.trim();
            const email = document.getElementById("contactoEmail").value.trim();
            const comentario = document.getElementById("contactoComentario").value.trim();
            const warnings = document.getElementById("contactoWarnings");

            let errores = "";
            let valido = true;

            const expCorreo = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

            if (!nombre || nombre.length > 100) {
            errores += "El nombre es obligatorio y debe tener máximo 100 caracteres.<br>";
            valido = false;
            }

        if (email) {
            if (email.length > 100 || !expCorreo.test(email)) {
                errores += "Correo inválido.<br>";
                valido = false;
            }
        }

        // Validar comentario
        if (!comentario || comentario.length > 500) {
            errores += "El comentario es obligatorio y debe tener máximo 500 caracteres.<br>";
            valido = false;
        }

        if (!valido) {
            warnings.innerHTML = errores;
            warnings.className = "alert alert-danger";
            return;
        }

        let mensajes = JSON.parse(localStorage.getItem("mensajesContacto")) || [];

        mensajes.push({
            nombre,
            email,
            comentario,
            fecha: new Date().toLocaleString()
        });

        localStorage.setItem("mensajesContacto", JSON.stringify(mensajes));

        warnings.innerHTML = "Mensaje enviado correctamente";
        warnings.className = "alert alert-success";
        contactoForm.reset();
    });
}
