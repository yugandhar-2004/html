// Replace 'your_api_key' with your OpenCage API key
const apiKey = '39a41a277b4a474c9bc1316104a2862d';

function getGeocode() {
    const location = document.getElementById('location-input').value;
    if (!location) {
        alert('Please enter a location');
        return;
    }

    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const lat = data.results[0].geometry.lat;
                const lng = data.results[0].geometry.lng;

                document.getElementById('latitude').textContent = lat;
                document.getElementById('longitude').textContent = lng;
            } else {
                alert('No results found');
            }
        })
        .catch(error => console.error('Error fetching geocoding data:', error));
}
