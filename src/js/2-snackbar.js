import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form")
const formDelay = document.querySelector(".form-delay")
const radioButtons = document.querySelectorAll(".radio-button")

form.addEventListener("submit", (event) => {
  event.preventDefault();

 
  const delay = parseInt(formDelay.value);

 
  let selectedState = "";
  radioButtons.forEach(radio => {
    if (radio.checked) {
      selectedState = radio.value;
    }
  });



  const promise = new Promise((resolve, reject) => {
   
    setTimeout(() => {
      if (selectedState === "fulfilled") {
        resolve(delay); 
      } else {
        reject(delay);  
      }
    }, delay);  
  });

 
  promise
    .then((delay) => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: "topRight",
      });
      form.reset();
    })
    .catch((delay) => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: "topRight",
      });
      form.reset();
    });
});
 