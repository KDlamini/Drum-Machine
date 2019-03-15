document.getElementById('power-btn').onchange = function(){
  const slider =  document.getElementById('volume');
  const volLevel = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

    if(this.checked) {
      document.getElementById('power').style.color = '#ffc600';

      const keys = Array.from(document.querySelectorAll('.key'));
      const audioName =  {81: "Clap", 87: "Hihat", 69: "Kick", 65: "Openhat", 83: "Boom", 68: "Ride", 90: "Snare", 88: "Tom", 67: "Tink"};
      
      window.addEventListener('keydown', e => {
        const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
        const key = document.querySelector(`div[data-key="${e.keyCode}"]`);

        if (audioName[e.keyCode]) {
          document.getElementById('audio-name').innerHTML = `${audioName[e.keyCode]}`;
        }
        
        if (!audio) return;

        slider.oninput = function() {
          audio.volume = volLevel[this.value];
        }
        audio.volume = volLevel[slider.value];
        key.classList.add('playing');
        audio.currentTime = 0;
        audio.play();
      });

      keys.forEach(key => key.addEventListener('click', e => {
        const keycode = e.currentTarget.dataset.key;
        const audio = document.querySelector(`audio[data-key="${keycode}"]`);
        const key = document.querySelector(`div[data-key="${keycode}"]`);

        if (audioName[keycode]) {
          document.getElementById('audio-name').innerHTML = `${audioName[keycode]}`;
        }
        console.log();
        if (!audio) return;

        slider.oninput = function() {
          audio.volume = volLevel[this.value];
        }
        audio.volume = volLevel[slider.value];
        key.classList.add('playing');
        audio.currentTime = 0;
        audio.play();
      }, true));

      keys.forEach(key => key.addEventListener('transitionend', removeTransition));

      function removeTransition(e) {
          if (e.propertyName !== 'transform') return;
          e.target.classList.remove('playing');
      }
    } 
    else {
      document.getElementById('power').style.color = '#111125';
      document.location.reload(true);
    }
};