
// Obtén referencia al formulario de login
const formLogin = document.getElementById('form-Login');
formLogin.addEventListener('submit', async (e) => {
  e.preventDefault();

  const cedula = formLogin.querySelector('input[name="documento"]');
  const contrasena = formLogin.querySelector('input[name="contrasenia"]');

  if (!cedula.value || !contrasena.value) {
    alert('Por favor completa todos los campos');
    return;
  }
  try {
    const respuesta = await fetch(`http://localhost:8080/proyecto/api/usuarios/${cedula.value}`);
    if (!respuesta.ok) {
      alert('Usuario no encontrado');
      return;
    }
    const usuario = await respuesta.json();
    console.log(usuario);
    
    if (usuario.contrasena === contrasena.value) {
        alert(`¡Bienvenido, ${usuario.nombre}!`);
        formLogin.reset();
        window.location.href = 'inicio.html';
    } else {
      alert('Contraseña incorrecta');
    }
  } catch(error) {
    alert('Error de red, inténtalo más tarde.');
    console.error(error);
  }
});