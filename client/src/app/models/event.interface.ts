import { iHire } from "./hire.interface"

export interface iEvent{
    eventId: number;
    eventName: string;
    eventDate: string;
    eventPlatform: string;
    eventLink?: string | null;
    eventParticipants: number[]; // hireIDs
}