// Retreiving data from rapidapi
// Wrap the code inside an async function
async function fetchData() {
    const url = 'https://flight-radar1.p.rapidapi.com/flights/list-in-boundary?bl_lat=43.5&bl_lng=-79.7&tr_lat=43.8&tr_lng=-79.2&limit=300';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '967590798amshee898db2d6f428ap17d6d0jsn1cffc6857ba4',
            'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);

        // Converting the data into JSON format
        const flightData = JSON.parse(result);

        // Extract relevant information using array destructuring
        const extractedData = flightData.aircraft.map(([id, label, latitude, longitude]) => ({
            id,
            label,
            latitude,
            longitude,
        }));
        
        // Export the extractedData array
        return extractedData;
    } catch (error) {
        console.error(error);
    }
}

// Call the async function to fetch data
export default fetchData;
