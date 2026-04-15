// Simple localStorage auth for login/signup
let users = JSON.parse(localStorage.getItem('users')) || [];

function signup(email, password) {
  if (users.find(u => u.email === email)) {
    alert('User exists!');
    return false;
  }
  users.push({email, password});
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('loggedIn', 'true');
  localStorage.setItem('userEmail', email);
  localStorage.setItem('userPlace', email.includes('phuentsholing') ? 'Phuentsholing HQ' : email.includes('pasakha') ? 'Pasakha Bamboo Plant' : 'Thimphu Office');
  alert('Signup successful! Redirecting to dashboard...');
  window.location.href = 'dashboard.html';
  return true;
}

function login(email, password) {
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPlace', email.includes('phuentsholing') ? 'Phuentsholing HQ' : email.includes('pasakha') ? 'Pasakha Bamboo Plant' : 'Thimphu Office');
    alert('Login successful! Redirecting to dashboard...');
    window.location.href = 'dashboard.html';
    return true;
  } else {
    alert('Invalid credentials');
    return false;
  }
}

function logout() {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('userEmail');
  alert('Logged out');
  location.reload();
}

// Auto-check login status & dashboard protect
if (window.location.pathname.endsWith('dashboard.html') && localStorage.getItem('loggedIn') !== 'true') {
  window.location.href = 'index.html';
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('loggedIn') === 'true') {
      const authLinks = document.querySelector('.auth-links');
      if (authLinks) authLinks.innerHTML = `Hi, ${localStorage.getItem('userEmail')} (${localStorage.getItem('userPlace')}) | <a href="#" onclick="logout()">Logout</a>`;
    }
  });
} else {
  if (localStorage.getItem('loggedIn') === 'true') {
    const authLinks = document.querySelector('.auth-links');
    if (authLinks) authLinks.innerHTML = `Hi, ${localStorage.getItem('userEmail')} (${localStorage.getItem('userPlace')}) | <a href="#" onclick="logout()">Logout</a>`;
  }
}

