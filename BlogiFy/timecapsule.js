document.addEventListener("DOMContentLoaded", () => {
  const capsuleContainer = document.querySelector(".capsule-container");
  const capsuleForm = document.getElementById("capsule-form");
  
  const capsules = [
    {
      title: "Dream Job",
      message: "I hope to land my dream job at SpaceTech Inc. by 2025!",
      unlockDate: "2025-06-10T09:00",
    },
    {
      title: "Personal Growth",
      message: "I want to be fluent in French and travel to Paris!",
      unlockDate: "2024-12-25T12:00",
    },
    {
      title: "Health Goal",
      message: "Run a marathon and maintain a healthy lifestyle.",
      unlockDate: "2025-03-15T07:30",
    },
  ];

  const renderCapsules = () => {
    const currentTime = new Date();
    capsuleContainer.innerHTML = ""; 
    capsules.forEach((capsule) => {
      const unlockTime = new Date(capsule.unlockDate);
      if (unlockTime <= currentTime) {
        const capsuleEntry = document.createElement("div");
        capsuleEntry.classList.add("capsule-entry");

        capsuleEntry.innerHTML = `
          <h3>${capsule.title}</h3>
          <p>${capsule.message}</p>
          <div class="unlock-date">Unlocked on: ${capsule.unlockDate}</div>
        `;

        capsuleContainer.appendChild(capsuleEntry);
      }
    });
  };

  renderCapsules();
  setInterval(renderCapsules, 86400000); //86400000 miliseconds in 1 day 

  capsuleForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("capsule-title").value;
    const message = document.getElementById("capsule-message").value;
    const unlockDate = document.getElementById("unlock-date").value;

    capsules.push({ title, message, unlockDate });
    capsuleForm.reset();

    renderCapsules(); 
  });
});
