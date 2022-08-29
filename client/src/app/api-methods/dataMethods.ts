import { iProgram } from "../models/asset.interface"
import { iHireContact } from "../models/hire.interface"

export const strToIdArray = (strIdArr: string) => {
    return strIdArr
    .split(',')
    .map(strId => {return parseInt(strId)});

}

 export const idToStrArray = (numIdArr: number[]) => {
    console.log('numIdArr');
    console.log(numIdArr)

    return numIdArr
    .map(numId => {return numId.toString()})
    .join(",");
}

export const progTypetoString = (prog: iProgram) => {
    return JSON.stringify(prog);
}

export const stringToProgType = (progStr: string) => {
    return JSON.parse(progStr);
}

export const contactToString = (contact: iHireContact) => {
    return JSON.stringify(contact);
}

export const stringToContact = (contactStr: string) => {
    return JSON.parse(contactStr);
}

