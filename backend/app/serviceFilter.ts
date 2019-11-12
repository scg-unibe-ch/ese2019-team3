import {Service} from "./models/service.model";


/** Wird gebraucht um Services zu filtern.
 * @param input
 * @param searchType
 * @param services Array of all the Services in the database
 */
export function filter(input: string, searchType: string, services: Service[]): Service[]{
    if(searchType != null && searchType.length > 0){
//        if(searchType == 'date')                                    return dateFilter(input, services);
        if(searchType == 'location' || searchType == 'city')        return locationFilter(input, services);
        if(searchType == 'services' || searchType == 'serviceType') return servicesFilter(input, services);
    }
    console.log("Couldn't understand the Query");
    var A: Service[];
    A = [];
    return A;
}

/**
 * Erwartet ein String von Daten (13.10.1995, 14.10.1995,...)
 * filtert jene Services, welche in diesem Zeitraum zur Verfügung stehen.
 * @param input
 */
/*
function dateFilter(input: string, services: Service[]): Service[] {
    var dates: Date[] = ([]);
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
    return s;
}
*/

function servicesFilter(input: string,services: Service[]): Service[]{
    let s = services.filter(service => service.serviceType == input);
    return s;
}

function locationFilter(input: string,services: Service[]): Service[]{
    let s = services.filter(service => service.city == input);
    return s;
}
