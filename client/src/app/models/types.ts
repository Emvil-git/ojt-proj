import { type } from "os";

export enum ViewType {
    DASHBOARD,
    HIRES,
    DOCUMENTS,
    LOST
}

export enum BGType {
    EDUCATION,
    EXPERIENCE,
    SEMINARS
}

export type BGIdsType = {
    cHireRefIds: number[] | null;
    cHireDocIds: number[]| null;
}

export enum ModalType {
    MHIRE,
    MREF,
    MDOC,
    MEVENT,
    MASSET,
    MCONTACT,
    MPROGRAM,
}

export type postHireType = {
    hireName: string;
    hireRole: string;
    hireDepartment: string;
    hireReportsTo: string;
    hireStartDate: string; 
}
