"use strict";
const towers = {
  A: document.getElementById("A"),
  B: document.getElementById("B"),
  C: document.getElementById("C"),
};

const message = document.getElementById("message");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const resetBtn = document.getElementById("resetBtn");

let moves = [];
let currentMove = 0;

function setupDisks() {
  towers.A.innerHTML = '<div class="rod"></div>';
  towers.B.innerHTML = '<div class="rod"></div>';
  towers.C.innerHTML = '<div class="rod"></div>';

  for (let i = 4; i >= 1; i--) {
    const disk = document.createElement("div");
    disk.className = `disk disk${i}`;
    disk.textContent = `Disk ${i}`;
    towers.A.appendChild(disk);
  }
}

function hanoi(n, from, to, aux) {
  if (n === 1) {
    moves.push({ from, to });
    return;
  }
  hanoi(n - 1, from, aux, to);
  moves.push({ from, to });
  hanoi(n - 1, aux, to, from);
}

function nextStep() {
  if (currentMove < moves.length) {
    const { from, to } = moves[currentMove];
    const fromTower = towers[from];
    const toTower = towers[to];
    const disk = fromTower.querySelector(".disk:last-child");
    if (disk) {
      toTower.appendChild(disk);
      message.textContent = `Move ${currentMove + 1}: Move ${
        disk.textContent
      } from tower ${from} → ${to}`;
    }
    currentMove++;
    if (currentMove === moves.length) {
      message.textContent = "✅ Congratulations! All disks moved successfully!";
      nextBtn.disabled = true;
    }
  }
}

function backStep() {
  if (currentMove > 0) {
    currentMove--;
    const { from, to } = moves[currentMove];
    const toTower = towers[to];
    const fromTower = towers[from];
    const disk = toTower.querySelector(".disk:last-child");
    if (disk) {
      fromTower.appendChild(disk);
      message.textContent = `Undo move ${currentMove + 1}: Move ${
        disk.textContent
      } back from ${to} → ${from}`;
    }
    nextBtn.disabled = false;
  }
}

function resetGame() {
  setupDisks();
  moves = [];
  currentMove = 0;
  hanoi(4, "A", "C", "B");
  message.textContent = 'Click "Next Step" to start.';
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", nextStep);
backBtn.addEventListener("click", backStep);
resetBtn.addEventListener("click", resetGame);

resetGame();
