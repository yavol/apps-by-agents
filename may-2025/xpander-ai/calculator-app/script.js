$(document).ready(function () {
  const $display = $('.display');
  $('.btn.number, .btn.operator, .btn.decimal').on('click', function () {
    const value = $(this).text();
    $display.val($display.val() + value);
  });
  $('.btn.clear').on('click', function () {
    $display.val('');
  });
  $('.btn.backspace').on('click', function () {
    $display.val($display.val().slice(0, -1));
  });
  $('.btn.equals').on('click', function () {
    try {
      const result = eval($display.val());
      $display.val(result);
    } catch {
      $display.val('Error');
    }
  });
});