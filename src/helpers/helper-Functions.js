import _find from "lodash.find";
import getDistance from "geolib/es/getDistance";
import store from '../store';
import _sortBy from "lodash.sortby";

export const findDistance = (country1, country2) => {

    const state = store.getState();

    const country1Result = _find(state.data, ['alpha3Code', country1]);
    const country2Result = _find(state.data, ['alpha3Code', country2]);

    let temp = getDistance(
        { latitude: country1Result.latlng[0], longitude: country1Result.latlng[1] },
        { latitude: country2Result.latlng[0], longitude: country2Result.latlng[1] }
    );

    return {
        distance: (temp / 1000).toFixed(1),
        country1Name: country1Result.name,
        country2Name: country2Result.name
    };
};

export const findClosest = (country1) => {

    const state = store.getState();

    let min = 1000000000000000;
    let minCountry = "";
    let countryInputName = "";

    state.data.map((country) => {

        const country1Result = _find(state.data, ['alpha3Code', country1]);
        countryInputName = country1Result.name;

        const country1lat = country1Result.latlng[0];
        const country1lng = country1Result.latlng[1];
        const country2lat = country.latlng[0];
        const country2lng = country.latlng[1];

        if(country2lat) {
            let temp = getDistance(
                { latitude: country1lat, longitude: country1lng },
                { latitude: country2lat, longitude: country2lng }
            );

            if(temp>0) {
                if(temp<min) {
                    min = temp;
                    minCountry = country.name;
                }
            }
        }
        return min;
    });

    return {
        countryClosestName: minCountry,
        countryClosestDistance: (min/1000).toFixed(1),
        countryInputName: countryInputName
    };
};

export const searchCountries = (search) => {

    const state = store.getState();

    return state.data.filter(country => {
        return country.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
};

export const findTimezones = (timeZone1,timeZone2) => {

    const state = store.getState();

    let minTimeZone = timeZone1;
    let maxTimeZone = timeZone2;

    if(minTimeZone>maxTimeZone) {
        minTimeZone = timeZone2;
        maxTimeZone = timeZone1;
    }

    let filteredData = [];

    state.data.map((data) => {
        (
            data.timezones.map((item) => {

                let temp = item.replace(':', '.');
                temp = parseFloat(temp.replace('UTC', ''));
                if((minTimeZone < temp) && (maxTimeZone > temp)) {

                    let obj = {
                        name : data.name,
                        timeZone: item,
                        timeZoneFloat: temp
                    };
                    filteredData.push(obj);

                }
                return filteredData;
            })
        )
        return filteredData;
    });

    const unique = filteredData
        .map(e => e['name'])

        // store the keys of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)

        // eliminate the dead keys & store unique objects
        .filter(e => filteredData[e]).map(e => filteredData[e]);

    return _sortBy(unique, ['timeZoneFloat']);
};
