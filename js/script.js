// Animate links one by one for smooth entry
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".links a");
  links.forEach((link, index) => {
    setTimeout(() => {
      link.style.opacity = "1";
    }, index * 100);
  });
});

// Subtle gradient background movement
document.body.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  document.body.style.background = `radial-gradient(circle at ${x * 100}% ${
    y * 100
  }%, #111, #000)`;
});

// Custom glowing cursor
document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.createElement("div");
  cursor.classList.add("cursor");
  document.body.appendChild(cursor);

  let x = 0,
    y = 0;
  let targetX = 0,
    targetY = 0;

  document.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  function animate() {
    x += (targetX - x) * 0.15;
    y += (targetY - y) * 0.15;
    cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    requestAnimationFrame(animate);
  }
  animate();
});
