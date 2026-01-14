const url = 'http://localhost:3000/api/contact';
const body = JSON.stringify({
    name: "Test User",
    email: "test@example.com",
    phone: "1234567890",
    company: "Test Co",
    message: "This is a test message"
});

console.log('Sending request to', url);

fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: body
})
    .then(async res => {
        console.log('Status:', res.status);
        const text = await res.text();
        console.log('Body:', text);
    })
    .catch(err => console.error('Error:', err));
