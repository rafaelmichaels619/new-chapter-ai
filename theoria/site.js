/* Opens a waitlist email. The address the visitor typed goes in the body.
   Subject is exactly "Theoria waitlist". With JavaScript off, the
   fallback mailto link under the form still works. */
(function () {
  var forms = document.querySelectorAll("[data-waitlist]");
  for (var i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", function (event) {
      event.preventDefault();
      var input = this.querySelector("input[type='email']");
      var email = input ? input.value.trim() : "";
      if (!email) {
        if (input) input.focus();
        return;
      }
      var body = "Please add this address to the Theoria waitlist:\n\n" + email;
      window.location.href = "mailto:support@newchapteraistudio.com?subject="
        + encodeURIComponent("Theoria waitlist")
        + "&body="
        + encodeURIComponent(body);
    });
  }
})();
