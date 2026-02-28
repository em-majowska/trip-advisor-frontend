const $ = document;

$.addEventListener("DOMContentLoaded", () => {
  // add header border when scrolled
  $.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    if (scrollY > 0) {
      $.querySelector("header").classList.add("scrolled");
    } else {
      $.querySelector("header").classList.remove("scrolled");
    }
  });

  // interactive heart buttons
  const hearts = $.querySelectorAll(".heart");
  hearts.forEach((heart) => {
    heart.addEventListener("click", () => {
      heart.classList.toggle("clicked");
      heart.firstChild.classList.toggle("icon-heart");
      heart.firstChild.classList.toggle("icon-heart_fill");
    });
  });

  const loginBtn = $.querySelector(".login-btn");
  const closeModalBtn = $.querySelector(".close-btn");
  const modal = $.querySelector(".modal");
  const submitBtn = $.querySelector("#submitBtn");
  const contactForm = $.querySelector("#contactForm");

  // open modal
  loginBtn.addEventListener("click", () => {
    if (modal.classList.contains("hidden")) {
      modal.classList.remove("hidden");
      $.querySelector("body").classList.add("stop-scrolling");
    }
  });

  // close modal
  closeModalBtn.addEventListener("click", (e) => {
    if (!modal.classList.contains("hidden")) {
      modal.classList.add("hidden");
      $.querySelector("body").classList.remove("stop-scrolling");
      contactForm.reset();
    }
  });

  // check form validity
  for (let element of contactForm.elements) {
    element.addEventListener("change", () => {
      if (contactForm.checkValidity()) {
        submitBtn.disabled = false;
      } else {
        submitBtn.disabled = true;
      }
    });
  }
  // get form data
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    contactForm.reportValidity();

    const firstName = $.querySelector("#firstName").value;
    const lastName = $.querySelector("#lastName").value;
    const email = $.querySelector("#email").value;
    const content = $.querySelector("#content").value;

    const body = {
      firstName,
      lastName,
      email,
      content,
    };

    try {
      const response = await axios.post(
        "https://lasandra-unsympathising-roxann.ngrok-free.dev/contact",
        body,
      );
      console.log(response.data);
      contactForm.reset();
      contactForm.querySelector("p").textContent =
        "Votre message a été envoyé !";
    } catch (error) {
      console.log(error.message);
    }
  });
});
