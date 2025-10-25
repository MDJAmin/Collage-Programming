"use strict";
const towers = {
  A: document.getElementById("A"),
  B: document.getElementById("B"),
  C: document.getElementById("C"),
};

const diskCountDisplay = document.getElementById("diskCountDisplay");
const increaseDisk = document.getElementById("increaseDisk");
const decreaseDisk = document.getElementById("decreaseDisk");
const message = document.getElementById("message");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const resetBtn = document.getElementById("resetBtn");
const algoBtn = document.getElementById("algoBtn");
const modal = document.getElementById("algoModal");
const closeModal = document.getElementById("closeModal");

let diskCount = 4;
const maxDisks = 5;
const minDisks = 1;
let moves = [];
let currentMove = 0;

function setupDisks() {
  towers.A.innerHTML = '<div class="rod"></div>';
  towers.B.innerHTML = '<div class="rod"></div>';
  towers.C.innerHTML = '<div class="rod"></div>';

  for (let i = diskCount; i >= 1; i--) {
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

function updateButtons() {
  backBtn.disabled = currentMove === 0;
  nextBtn.disabled = currentMove >= moves.length;
  resetBtn.disabled = currentMove === 0;
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
  const diskWord = diskCount === 1 ? "disk" : "disks";
  const moveWord = moves.length === 1 ? "move" : "moves";
  message.textContent = `🎉 Congratulations! ${diskCount} ${diskWord} moved successfully in ${moves.length} ${moveWord}!`;
}

  }
  updateButtons();
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
  }
  updateButtons();
}

function resetGame() {
  setupDisks();
  moves = [];
  currentMove = 0;
  hanoi(diskCount, "A", "C", "B");
  message.textContent = 'Click "Next Step" to start.';
  updateButtons();
}

nextBtn.addEventListener("click", nextStep);
backBtn.addEventListener("click", backStep);
resetBtn.addEventListener("click", resetGame);
increaseDisk.addEventListener("click", () => {
  if (diskCount < maxDisks) {
    diskCount++;
    diskCountDisplay.textContent = `${diskCount} Disks`;
    resetGame();
  }
});

decreaseDisk.addEventListener("click", () => {
  if (diskCount > minDisks) {
    diskCount--;
    diskCountDisplay.textContent = `${diskCount} Disks`;
    resetGame();
  }
});

algoBtn.addEventListener("click", () => {
  modal.style.display = "block";
});
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

resetGame();
