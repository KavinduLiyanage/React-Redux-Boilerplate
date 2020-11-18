export const fetchData = async () => {
    try {
        const response = await fetch("https://restcountries.eu/rest/v2/all");
        const data = await response.json();

        return data.map(({
                             topLevelDomain, alpha2Code, callingCodes, capital, altSpellings, region, subregion,
                             population, demonym, area, gini, nativeName, numericCode, currencies, languages,
                             translations, flag, regionalBlocs, cioc, ...keepAttrs
                         }) => keepAttrs);
    } catch (e) {
        console.log(e);
    }
};