'use strict';
const url =
  'https://script.google.com/macros/s/AKfycbyx6aEdMl1Gsdm9kXzvLLZUbYG45KbOXt0WLCvmxuZkb1t_fMBlgjfmxgtjRzbyXdSzxQ/exec';
const emailInput = $('#user-email');

$(function () {
  async function validateEmail() {
    const email = emailInput.val();

    let isEmailValid = /\S+@\S+\.\S+/.test(email);
    if (isEmailValid) {
      try {
        const res = await fetch(
          `https://api.zerobounce.net/v1/validate?apikey=46d0e8781d8f4d169061ed923a7575ca&email=${email}`
        );
        const data = await res.json();
        console.log(data);

        isEmailValid = data.status == 'Valid' && !data.disposable;
        if (isEmailValid) {
          send(email);
          clearForm();
        }
      } catch (err) {
        console.error(err);
      }
    }

    if (!isEmailValid) {
      emailInput.css('border', '2px solid red');
    }
  }

  function send(email) {
    const body = {
      email,
      user: $('#user-fullname').val(),
      message: $('#user-message').val(),
    };
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  function clearForm() {
    const els = document.querySelector('#contact-form').elements;
    for (let i = 0; i < els.length; i++) {
      const element = els[i];
      if (element.type != 'submit') element.value = '';
    }
    emailInput.css('border', 'initial');
  }

  const sendBtn = $('.send-msg-btn');
  sendBtn.click((e) => {
    e.preventDefault();
    validateEmail();
  });
});
