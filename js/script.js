document.getElementById('enter-btn').addEventListener('click', function() {
    alert('Welcome to Epic Game Rental! Stay tuned for the adventure ahead!');
  });
  
  //generate user ID
function generateUserId(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let userId = '';
    for (let i = 0; i < length; i++) {
      userId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return userId;
  }
  
  document.getElementById('enter-btn').addEventListener('click', function() {
    const button = this;
    button.disabled = true; 
    const originalText = button.textContent;
    button.textContent = 'Please wait. Generating account...';
  
    const userId = generateUserId();
    
    // generate acc wait time
    const waitTime = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
  
    setTimeout(() => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'create_account.php', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            try {
              const response = JSON.parse(xhr.responseText);
              if (response.success) {
                alert(`Account created successfully! User ID: ${response.user_id}`);
                setTimeout(loadStartPage, 5000)
              } else {
                alert(`Error: ${response.message}`);
                button.textContent = originalText;
                button.disabled = false;
              }
            } catch (e) {
              alert('Unexpected server response.');
              button.textContent = originalText;
              button.disabled = false;
            }
          } else {
            alert('Server error. Please try again later.');
            button.textContent = originalText;
            button.disabled = false;
          }
        }
      };
  
      
      const params = `user_id=${encodeURIComponent(userId)}&game_name=${encodeURIComponent('User')}`;
      xhr.send(params);
    }, waitTime);
  });

  function loadStartPage() {
    window.location.href = "home.html";
  }
  