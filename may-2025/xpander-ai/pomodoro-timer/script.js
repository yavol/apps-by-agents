$(function() {
  let workDuration = parseInt($('#work-duration').val(), 10) * 60;
  let breakDuration = parseInt($('#break-duration').val(), 10) * 60;
  let remaining = workDuration;
  let timer = null;
  let onBreak = false;

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  }

  function updateDisplay() {
    $('#timer-display').text(formatTime(remaining));
  }

  function startTimer() {
    workDuration = parseInt($('#work-duration').val(), 10) * 60;
    breakDuration = parseInt($('#break-duration').val(), 10) * 60;
    if (timer) return;
    timer = setInterval(() => {
      remaining--;
      updateDisplay();
      if (remaining < 0) {
        clearInterval(timer);
        timer = null;
        onBreak = !onBreak;
        alert(onBreak ? 'Time for a break!' : 'Back to work!');
        remaining = onBreak ? breakDuration : workDuration;
        updateDisplay();
        startTimer();
      }
    }, 1000);
  }

  function pauseTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function resetTimer() {
    pauseTimer();
    workDuration = parseInt($('#work-duration').val(), 10) * 60;
    breakDuration = parseInt($('#break-duration').val(), 10) * 60;
    onBreak = false;
    remaining = workDuration;
    updateDisplay();
  }

  $('#start').click(startTimer);
  $('#pause').click(pauseTimer);
  $('#reset').click(resetTimer);
  $('#work-duration, #break-duration').change(resetTimer);

  updateDisplay();
});