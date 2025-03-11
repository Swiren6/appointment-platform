document.getElementById('signup-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const formData = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Inscription réussie !');
        window.location.href = 'signin.html';
      } else {
        throw new Error(data.message || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      console.error('Erreur :', error);
      alert(error.message);
    }
  });
  
  //  connexion
  document.getElementById('signin-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const formData = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token); 
        alert('Connexion réussie !');
        window.location.href = './index.html'; 
      } else {
        throw new Error(data.message || 'Erreur lors de la connexion');
      }
    } catch (error) {
      console.error('Erreur :', error);
      alert(error.message);
    }
  });