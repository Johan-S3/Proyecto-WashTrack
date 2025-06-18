const formRegistro = document.getElementById("form-Registro");

formRegistro.addEventListener("submit", async (e) => {
    e.preventDefault();

    const cedula = formRegistro.querySelector('input[name="cedula"]');
    const nombre = formRegistro.querySelector('input[name="nombre"]');
    const correo = formRegistro.querySelector('input[name="correo"]');
    const telefono = formRegistro.querySelector('input[name="telefono"]');
    const rol = formRegistro.querySelector('select[name="rol"]');
    const contrasena = formRegistro.querySelector('input[name="contrasenia"]');

    const usuario = {
        cedula: cedula.value,
        nombre: nombre.value,
        correo: correo.value,
        telefono: telefono.value,
        // rol: rol.value,
        contrasena: contrasena.value
    }

    console.log(usuario);
    
    if (!usuario.cedula || !usuario.nombre || !usuario.correo || !usuario.telefono || !usuario.contrasena) {
        alert('Por favor completa todos los campos');
        return;
    }

    try {
        const respuesta = await fetch('http://localhost:8080/proyecto/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
        });
        if (respuesta.ok) {
        alert('Registro exitoso. Ya puedes iniciar sesión.');
        formRegistro.reset();
        window.location.href = 'index.html';
    } else {
        const errorTexto = await respuesta.text();
        alert('Error al registrar: ' + errorTexto);
        }
    } catch (error) {
    alert('Error de red, inténtalo más tarde.');
    console.error(error);
    }
})