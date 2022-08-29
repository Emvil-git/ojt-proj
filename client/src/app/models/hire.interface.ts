import { iReference } from "./background.interface";
import { BGType } from "./types"

export interface iHireContact{
    email: string;
    phone: string;
}

export interface iHire { 
    hireId: number;
    hireName: string;
    hireRole: string;
    hireDepartment: string;
    hireReportsTo: string;
    hireStartDate: string;
    hireRefs: number[] | null;
    hireDocs: number[] | null;
    hireAsset: number[] | null;
    hireEvents: number[] | null;
    hireContact: iHireContact | null;
}