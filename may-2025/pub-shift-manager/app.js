'use strict';

const form = document.getElementById('shift-form');
const employeeInput = document.getElementById('employee');
const dateInput = document.getElementById('date');
const startInput = document.getElementById('start');
const endInput = document.getElementById('end');
const roleSelect = document.getElementById('role');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const tableBody = document.querySelector('#shifts-table tbody');

let shifts = JSON.parse(localStorage.getItem('shifts')) || [];
let editIndex = null;

function saveAndRender() {
  localStorage.setItem('shifts', JSON.stringify(shifts));
  renderShifts();
}

function renderShifts() {
  tableBody.innerHTML = '';
  shifts.forEach((shift, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${shift.employee}</td>
      <td>${shift.date}</td>
      <td>${shift.start}</td>
      <td>${shift.end}</td>
      <td>${shift.role}</td>
      <td>
        <button class="action-btn edit">Edit</button>
        <button class="action-btn delete">Delete</button>
      </td>
    `;
    const editBtn = row.querySelector('.action-btn.edit');
    const deleteBtn = row.querySelector('.action-btn.delete');
    editBtn.addEventListener('click', () => startEdit(index));
    deleteBtn.addEventListener('click', () => {
      shifts.splice(index, 1);
      saveAndRender();
    });
    tableBody.appendChild(row);
  });
}

function startEdit(index) {
  const shift = shifts[index];
  employeeInput.value = shift.employee;
  dateInput.value = shift.date;
  startInput.value = shift.start;
  endInput.value = shift.end;
  roleSelect.value = shift.role;
  submitBtn.textContent = 'Update Shift';
  cancelBtn.hidden = false;
  editIndex = index;
}

function resetForm() {
  form.reset();
  submitBtn.textContent = 'Add Shift';
  cancelBtn.hidden = true;
  editIndex = null;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newShift = {
    employee: employeeInput.value.trim(),
    date: dateInput.value,
    start: startInput.value,
    end: endInput.value,
    role: roleSelect.value
  };
  if (editIndex === null) {
    shifts.push(newShift);
  } else {
    shifts[editIndex] = newShift;
  }
  saveAndRender();
  resetForm();
});

cancelBtn.addEventListener('click', () => {
  resetForm();
});

document.addEventListener('DOMContentLoaded', renderShifts);