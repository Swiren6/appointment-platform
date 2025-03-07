// main.js

// Récupérer la liste des rendez-vous
async function fetchAppointments() {
    const response = await fetch("/api/appointments/all");
    const appointments = await response.json();
    const tableBody = document.querySelector("#appointments-table tbody");
  
    tableBody.innerHTML = appointments
      .map(
        (appointment) => `
        <tr>
          <td>${new Date(appointment.date).toLocaleString()}</td>
          <td>${appointment.clientId}</td>
          <td>${appointment.professionalId}</td>
          <td>${appointment.status}</td>
          <td>
            <a href="/edit.html?id=${appointment._id}" class="btn">Modifier</a>
          </td>
        </tr>
      `
      )
      .join("");
  }
  
  // Créer un rendez-vous
  document
    .getElementById("create-appointment-form")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
  
      const response = await fetch("/api/appointments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        alert("Rendez-vous créé avec succès");
        window.location.href = "/index.html";
      } else {
        alert("Erreur lors de la création du rendez-vous");
      }
    });
  
  // Modifier un rendez-vous
  document
    .getElementById("edit-appointment-form")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      const appointmentId = new URLSearchParams(window.location.search).get("id");
  
      const response = await fetch(`/api/appointments/update/${appointmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        alert("Rendez-vous mis à jour avec succès");
        window.location.href = "/index.html";
      } else {
        alert("Erreur lors de la mise à jour du rendez-vous");
      }
    });
  
  // Annuler un rendez-vous
  document
    .getElementById("cancel-appointment-btn")
    ?.addEventListener("click", async () => {
      const appointmentId = new URLSearchParams(window.location.search).get("id");
  
      const response = await fetch(`/api/appointments/delete/${appointmentId}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        alert("Rendez-vous annulé avec succès");
        window.location.href = "/index.html";
      } else {
        alert("Erreur lors de l'annulation du rendez-vous");
      }
    });
  
  // Charger les rendez-vous au chargement de la page
  if (window.location.pathname === "/index.html") {
    fetchAppointments();
  }