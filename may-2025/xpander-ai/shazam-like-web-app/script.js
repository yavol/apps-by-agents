document.addEventListener('DOMContentLoaded', () => {
  const listenBtn = document.getElementById('listen-btn');
  const resultEl = document.getElementById('result');
  const titleEl = document.getElementById('result-title');
  const artistEl = document.getElementById('result-artist');
  const songs = [
    { title: 'Shape of You', artist: 'Ed Sheeran' },
    { title: 'Blinding Lights', artist: 'The Weeknd' },
    { title: 'Rolling in the Deep', artist: 'Adele' },
    { title: 'Levitating', artist: 'Dua Lipa' },
    { title: 'Uptown Funk', artist: 'Bruno Mars' }
  ];

  listenBtn.addEventListener('click', () => {
    listenBtn.disabled = true;
    listenBtn.classList.add('listening');
    resultEl.classList.add('hidden');
    setTimeout(() => {
      const randomSong = songs[Math.floor(Math.random() * songs.length)];
      titleEl.textContent = randomSong.title;
      artistEl.textContent = randomSong.artist;
      resultEl.classList.remove('hidden');
      listenBtn.disabled = false;
      listenBtn.classList.remove('listening');
    }, 2000);
  });
});