import { BGType } from "./types";

export interface iReference {
    refId: number;
    refHireId: number;
    refType: BGType | string;
    refName: string;
    refInst: string;
    refNumber: string;
    refIsContacted: boolean;
}

export interface iDocument {
    docId: number;
    docHireId: number;
    docTitle: string;
    docType: BGType | string;
    docDate: string;
    docSize: number;
    docIsVerified: boolean;
}