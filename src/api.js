export const fetchData = async () => {
    try {
        const response = await fetch("https://restcountries.eu/rest/v2/all");
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e);
    }
};