import {Service} from "./models/service.model";

const fullTextSearch = require('full-text-search');

const search = new fullTextSearch();
/** Wird gebraucht um Services zu filtern.
 * @param input
 * @param services Array of all the Services in the database
 */
export function filterFunction(input: string, services: Service[]): Service[]{
    console.log('asd');
    console.log(input);
    const inp = input.split(',');
    console.log(inp[0]);
        while (inp.length > 0) {
            if(inp.length > 1) {
                let query = inp.pop();
                let searchType = inp.pop();
                if (query != null && searchType != null) {
                    query = query.trim();
                    searchType = searchType.trim();
                    if (searchType == 'date')                                     services = dateFilter(<string>query, services);
                    if (searchType == 'location' || searchType == 'city')        services = locationFilter(<string>query, services);
                    if (searchType == 'services' || searchType == 'serviceType') services = servicesFilter(<string>query, services);
                } else console.log("Couldn't understand the Query")
            } else if(inp.length == 1){
                let re = new RegExp(<string>inp.pop());
                services = services.filter(service => re.test(service.toSimplification().toString));
            }
        }

    return services;
}

/**
 * TODO: implementieren
 * Erwartet ein String von Daten (13.10.1995, 14.10.1995,...)
 * filtert jene Services, welche in diesem Zeitraum zur Verfügung stehen.
 * @param input
 * @param services
 */

function dateFilter(input: string, services: Service[]): Service[] {
    /*var dates: Date[] = ([]);
    try{
        let days = input.split(/,/);
        for(var i = 0; i < days.length; i++){
            let day = days[i].split(/./);
            if(day.length == 3) {
                dates.push(new Date(parseInt(day[0]), parseInt(day[1]), parseInt(day[2])));
            } else new Error();
        }
    } catch(Error){ throw new Error("Somethings wrong with the Date Filter."); }
    let s = services.filter(service => service.availableDates.forEach(date => dates.includes(date)));
    return s; */
    return services;
}


function servicesFilter(input: string,services: Service[]): Service[]{
    return services.filter(service => service.serviceType == input);
}

function locationFilter(input: string,services: Service[]): Service[]{
    return services.filter(service => service.city == input);
}
