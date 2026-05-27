const URL = "http://localhost:8080/api/v1/flights";

class FlightService {

    async saveFlight(flight) {

    const response = await fetch(URL + "/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(flight)
    });

    console.log(response);

    if (!response.ok) {
        throw new Error("Failed to save flight");
    }

    return response;
    }


    getFlights() {

        return fetch(URL + "/all");

    }


    deleteFlight(code) {

        return fetch(URL + "/" + code, {

            method: "DELETE"

        });
    }
}

export default new FlightService();