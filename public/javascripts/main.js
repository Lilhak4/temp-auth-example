'use strict';

function getCurrentLocation () {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position.coords),
      () => reject('user does not allow browser to share location with us')
    );
  });
  return promise;
}

function main () {
  const latitudeInput = document.querySelector('input[name="latitude"]');
  const longitudeInput = document.querySelector('input[name="longitude"]');
  getCurrentLocation()
    .then((coordinates) => {
      latitudeInput.value = coordinates.latitude;
      longitudeInput.value = coordinates.longitude;
    })
    .catch((err) => console.log(err));
}

window.addEventListener('load', main);
