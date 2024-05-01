/**
 * TODO: 8.4 Register new user
 *       - Handle registration form submission
 *       - Prevent registration when password and passwordConfirmation do not match
 *       - Use createNotification() function from utils.js to show user messages of
 *       - error conditions and successful registration
 *       - Reset the form back to empty after successful registration
 *       - Use postOrPutJSON() function from utils.js to send your data back to server
 */

// Pseudo-code for handling user registration

const registrationForm = document.getElementById('register-form');

registrationForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const password = document.getElementById('password').value;
  const passwordConfirmation = document.getElementById('passwordConfirmation').value;

  // Check if passwords match
  if (password !== passwordConfirmation) {
    createNotification('error: Passwords do not match', 'notifications-container', false);
    return;
  }

  // Prepare user registration data
  const userData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    password: password,
  };

  try {
    // Send registration data to the server using postOrPutJSON
    console.log(userData);
    await postOrPutJSON('/api/register', 'POST', userData);

    // Display a success message
    createNotification('success: Registration successful', registrationForm.id);

    // Reset the form
    registrationForm.reset();
  } catch (error) {
    // Handle registration error
    createNotification('error: Registration failed', registrationForm.id, false);
  }
});