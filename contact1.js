function sendEmail() {
  var params = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      subject: document.getElementById("subject").value,
  };
  const serviceID = "service_cd3fl6w";
  const templateID = "template_zns5m2s";

  emailjs
      .send(serviceID, templateID, params)
      .then(
      (res) => {
          document.getElementById("name").value = "";
          document.getElementById("email").value = "";
          document.getElementById("phone").value = "";
          document.getElementById("subject").value = ""; 
          console.log(res);
          alert("Your message sent successfully!");
          

      })
      .catch((err) => console.log(err));
}