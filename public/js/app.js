const form = document.getElementById('myForm');
const input = document.getElementById('input');
const messageOne = document.getElementById('messageOne');
const messageTwo = document.getElementById('messageTwo');

const getWeather = (location, callback) =>
  fetch(`/weather?address=${location}`)
    .then(data => data.json())
    .then(data => {
      if (data.error) {
        return callback(data.error, undefined);
      }
      callback(undefined, data);
      //   console.log(data);
    })
    .catch(err => {
      console.error(err);
    });

form.addEventListener('submit', e => {
  e.preventDefault();
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  const location = input.value;
  getWeather(location, (error, { weather, location: place } = {}) => {
    if (error) {
      console.log(error);
      return (messageOne.textContent = error);
    }
    messageOne.textContent = place;
    messageTwo.textContent = weather;
  });
  input.value = '';
});
