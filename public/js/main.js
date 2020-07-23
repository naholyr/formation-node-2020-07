$('#login').on('submit', e => {
  e.preventDefault();
  $.post('/login', {
    username: e.target.elements.username.value,
    password: e.target.elements.password.value,
  })
    .then((info) => {
      // Login OK
      // TODO Load game UI
      console.log(info);
      $('body').html('Yay!');
    })
    .catch(() => {
      alert('Login failed');
    })
});