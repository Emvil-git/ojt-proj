import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { iEvent } from "../../models/event.interface";
import { RootState } from "../../store";
import axios from 'axios';
import { strToIdArray } from "../../api-methods/dataMethods";

const url = 'http://localhost:3000/events';

type initStateType = {
    eventList: iEvent[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: any; 
};

type addEventType = {
    eventName: string,
    eventDate: string,
    eventPlatform: string,
    eventLink: string | null,
    eventParticipants: string,
}

export const dbGetEvents = createAsyncThunk('events/getEvents', async () => {
    const response = await axios.get(`${url}/get`)
    return response.data.results;
})

export const dbAddEvents = createAsyncThunk('events/addEvent', async (newEvent: addEventType) => {
    const response = await axios.post(`${url}/create`, newEvent)
    return response.data.results;
})

const initialState: initStateType = {
    eventList: [],
    status: 'idle',
    error: null,
}
const eventSlice = createSlice({
    name: 'EventSlice',
    initialState,
    reducers: {
        addEvent: (state, action: PayloadAction<{event: iEvent}>) => {
            state.eventList.push(action.payload.event);
        },

        delEvent: (state, action: PayloadAction<{id: number}>) => {
            state.eventList = state.eventList.filter(
                (event) => event.eventId !== action.payload.id
            );
        },
    },
    extraReducers(builder) {
        builder
            .addCase(dbGetEvents.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(dbGetEvents.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const loadedEvents = action.payload
                // Add any fetched posts to the array
                state.eventList = loadedEvents;
            })
            .addCase(dbGetEvents.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(dbAddEvents.fulfilled, (state, action) => {
                console.log(action.payload[0]);

                const newEvent = action.payload[0];

                newEvent.eventParticipants = strToIdArray(newEvent.eventParticipants);
                
                state.eventList.push(newEvent);
            })
    }
});

export const { addEvent, delEvent } = eventSlice.actions;

export const selectEvents = (state:RootState) => state.eventSlice.eventList;
export const selectEventsStatus = (state:RootState) => state.eventSlice.status;
export const selectEventsError = (state:RootState) => state.eventSlice.error;

export default eventSlice;