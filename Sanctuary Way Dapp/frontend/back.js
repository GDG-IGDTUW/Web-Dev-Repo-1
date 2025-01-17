document.getElementById('transferForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const recipient = document.getElementById('recipient').value;
    const amount = document.getElementById('amount').value;

    try {
        const response = await fetch('http://127.0.0.1:5500/frontend/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recipient, amount }),
        });

        const data = await response.json();
        if (data.success) {
            alert('Tokens transferred successfully!');
            // Update UI with additional information
            displayTokenInformation();
            document.getElementById('recipient').value = '';
            document.getElementById('amount').value = '';
        } else {
            alert('Error transferring tokens.');
        }
    } catch (error) {
        console.error('Error transferring tokens:', error);
        alert('Error transferring tokens. Please try again later.');
    }
});

const displayTokenInformation = async () => {
    try {
        const response = await fetch('http://localhost:3000/token-info');
        const data = await response.json();

        if (data.success) {
            document.getElementById('admin').textContent = data.admin;
            document.getElementById('allowance').textContent = data.allowance;
            document.getElementById('balance').textContent = data.balance;
            document.getElementById('contract').textContent = data.contract;
        } else {
            alert('Error fetching token information.');
        }
    } catch (error) {
        console.error('Error fetching token information:', error);
        alert('Error fetching token information. Please try again later.');
    }
}

// Initial call to display token information when the page loads
displayTokenInformation();


