import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const dateTime = document.querySelector("#datetime-picker")
const button = document.querySelector("[data-start]")

 
const  days = document.querySelector("[data-days]");
const  hours = document.querySelector("[data-hours]");
const minutes = document.querySelector("[data-minutes]");
const seconds = document.querySelector("[data-seconds]");

let userSelectedDate; 
let intervalId = null;

button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    
    
     const selectedDate = selectedDates[0];
     const currentDate = new Date();


      
    if (selectedDate > currentDate) {
      button.disabled = false;
      userSelectedDate = selectedDate;
      
    }
        
  else {
      button.disabled = true;
       iziToast.error({
        message: "Please choose a date in the future",
        position: "topRight",
        
      })
    }
  }
};


flatpickr(dateTime, options);


button.addEventListener("click", start);

function start() {
  if (userSelectedDate) {
    button.disabled = true;
    dateTime.disabled = true; 

    intervalId = setInterval(() => {
      const currentDate = new Date();
      const diff = userSelectedDate - currentDate;

      if (diff <= 0) {
        clearInterval(intervalId);
        iziToast.success({
          message: "Time is up!",
          position: "topRight",
        });

       
        dateTime.disabled = false;
        button.disabled = true;
        return;
      }

      const timeComponents = convertMs(diff);
      days.textContent = pad(timeComponents.days);
      hours.textContent = pad(timeComponents.hours);
      minutes.textContent = pad(timeComponents.minutes);
      seconds.textContent = pad(timeComponents.seconds);
    }, 1000);
  }
}


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day); 
  const hours = Math.floor((ms % day) / hour); 
  const minutes = Math.floor((ms % day % hour) / minute); 
  const seconds = Math.floor((ms % day % hour % minute) / second); 

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0'); 
}