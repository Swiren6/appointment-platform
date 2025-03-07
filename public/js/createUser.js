document.getElementById("create-user-form").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
  
    try {
      const response = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const user = await response.json();
        document.getElementById("message").textContent = "Utilisateur créé avec succès !";
        e.target.reset(); // Réinitialiser le formulaire
      } else {
        const error = await response.json();
        document.getElementById("message").textContent = error.message || "Erreur lors de la création de l'utilisateur";
      }
    } catch (error) {
      document.getElementById("message").textContent = "Erreur lors de la connexion au serveur";
    }
  });