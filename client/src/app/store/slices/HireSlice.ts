import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { iHire, iHireContact } from "../../models/hire.interface";
import { useAppDispatch } from "../../reduxHooks";
import { RootState } from "../../store";
import { BGType } from "../../models/types";
import axios from "axios";
import { type } from "os";

const url = 'http://localhost:3000/hires';

type initStateType = {
    hireList: iHire[];
    selectedHireModal: number | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: any; 
};

//  TYPES FOR THUNKS

type newHireType = {
        hireName: string;
        hireRole: string,
        hireDepartment: string,
        hireReportsTo: string,
        hireStartDate: string,
}

type newHireContactType = {
        hireId: number,
        contactInfo: string,
}

type dbHireType = {
    hireId: number;
    hireName: string;
    hireRole: string;
    hireDepartment: string;
    hireReportsTo: string;
    hireStartDate: string;
    hireRefs: string | number[] | null;
    hireDocs: string | number[] | null;
    hireAsset: string | number[] | null;
    hireEvents: string | number[] | null;
    hireContact: string | iHireContact | null;
}

type newHireRefType = {
    hireRefs: string,
    hireId: number
}

type newHireDocType = {
    hireDocs: string,
    hireId: number
}

type hireAssignAssetType = {
    hireId: number;
    hireAsset: number;
}

type hireAddEventType = {
    hireId: number;
    hireEventIds: string;
}

// DATA CONVERSION METHODS

const strToObjContact = (strObj: string) => {
    return JSON.parse(strObj);
}

const objToStrContact = (objContact: iHireContact) => {
    return JSON.stringify(objContact);
}

const strToIdArray = (strIdArr: string) => {
    console.log('strIdMethod: ');
    console.log(strIdArr);

    return strIdArr
    .split(',')
    .map(strId => {return parseInt(strId)});

}

const idToStrArray = (numIdArr: number[]) => {
    return numIdArr
    .map(numId => {return numId.toString()})
    .join(",");
}

const initialState: initStateType = {
    hireList: [],
    selectedHireModal: 0,
    status: 'idle',
    error: null
}

export const dbGetHires = createAsyncThunk('hires/getHires', async () => {
    const response = await axios.get(`${url}/get`)
    console.log("-----------------------------------------------");
    console.log("Get called for hires");
    return response.data.results;
})

export const dbAddHire = createAsyncThunk('hires/addHire', async (newHire: newHireType) => {
    const response = await axios.post(`${url}/add`, newHire)
    return response.data;
}, )

export const dbAddHireContact = createAsyncThunk('hires/addHireContact', async (newHireContact: newHireContactType) => {
    console.log('req.body is: ' + JSON.stringify(newHireContact))
    const response = await axios.post(`${url}/update/contact`, newHireContact)
    console.log("-----------------------------------------------");
    console.log("dbAddHire returned this (data only): " + JSON.stringify(response.data.results));
    console.log("-----------------------------------------------");
    return response.data.results;
}, )

export const dbAddHireRef = createAsyncThunk('hires/addHireRef', async (newHireRef: newHireRefType) => {
    console.log('req.body is: ' + JSON.stringify(newHireRef));
    const response = await axios.post(`${url}/update/refs`, newHireRef)
    console.log("-----------------------------------------------");
    console.log("dbAddHireRef returned this (data only): " + JSON.stringify(response.data));
    console.log("-----------------------------------------------");
    return response.data;
}, )

export const dbAddHireDoc = createAsyncThunk('hires/addHireDoc', async (newHireDoc: newHireDocType) => {
    console.log('req.body is: ' + JSON.stringify(newHireDoc));
    const response = await axios.post(`${url}/update/docs`, newHireDoc)
    console.log("-----------------------------------------------");
    console.log("newHireDoc returned this (data only): " + JSON.stringify(response.data));
    console.log("-----------------------------------------------");
    return response.data;
}, )

export const dbHireAssignAsset = createAsyncThunk('hires/assignHireAsset', async (hireAssignAsset: hireAssignAssetType) => {
    console.log('req.body is: ' + JSON.stringify(hireAssignAsset));
    const response = await axios.post(`${url}/update/asset`, hireAssignAsset)
    console.log("-----------------------------------------------");
    console.log("dbHireAssignAsset returned this (data only): " + JSON.stringify(response.data));
    console.log("-----------------------------------------------");
    return response.data;
}, )

export const dbHireAddEvent = createAsyncThunk('hires/dbHireEvent', async (hireAddEvent: hireAddEventType) => {
    console.log('req.body is: ' + JSON.stringify(hireAddEvent));
    const response = await axios.post(`${url}/update/events`, hireAddEvent)
    console.log("-----------------------------------------------");
    console.log("dbHireAddEvent returned this (data only): " + JSON.stringify(response.data));
    console.log("-----------------------------------------------");
    return response.data;
}, )

const hireSlice = createSlice({
    name: 'HireSlice',
    initialState,
    reducers: {
        addHire: (state, action: PayloadAction<iHire>) => {
            state.hireList?.push(action.payload);
        },
        
        delHire: (state, action: PayloadAction<{id: number}>) => {
            state.hireList = state.hireList.filter(
                (hire) => hire.hireId !== action.payload.id
            );
        },

        addHireAsset: (state, action: PayloadAction<{assetId: number, hireId: number}>) => {
            state.hireList.map(hire => {
                if(hire.hireId === action.payload.hireId) {
                    hire.hireAsset?.push(action.payload.assetId)
                }
            })
        },

        addHireRef: (state, action: PayloadAction<{refId: number, hireId: number}>) => {
            state.hireList.map(hire => {
                if(hire.hireId === action.payload.hireId) {
                    hire.hireRefs?.push(action.payload.refId);
                }
            })
        },

        addHireEvent: (state, action: PayloadAction<{eventId: number, hireId: number}>) => {
            state.hireList.map(hire => {
                if(hire.hireId === action.payload.hireId) {
                    hire.hireEvents?.push(action.payload.eventId);
                }
            })
        },

        addContact: (state, action: PayloadAction<{hireId: number, contactInfo: iHireContact}>) => {
            state.hireList.map(hire => {
                if(hire.hireId === action.payload.hireId) {
                    hire.hireContact = action.payload.contactInfo
                }
            })
        },

        hireFORCEIdle: (state) => {
            state.status = 'idle';
        },

        changeSelectedHireModal(state, action: PayloadAction<number>) {
            state.selectedHireModal = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(dbGetHires.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(dbGetHires.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const loadedHires = action.payload
    
                loadedHires.map((hire: dbHireType) => 
                    {
                        if(typeof hire.hireContact == 'string') {hire.hireContact = JSON.parse(hire.hireContact)};
                        if(hire.hireRefs === null) {hire.hireRefs = []};
                        if(typeof hire.hireRefs == 'string') {hire.hireRefs = strToIdArray(hire.hireRefs)};
                        if(hire.hireDocs === null) {hire.hireDocs = []};
                        if(typeof hire.hireDocs == 'string') {hire.hireDocs = strToIdArray(hire.hireDocs)};
                        if(hire.hireAsset === null) {hire.hireAsset = []};
                        if(typeof hire.hireAsset == 'string') {hire.hireAsset = strToIdArray(hire.hireAsset)};
                        if(hire.hireEvents === null) {hire.hireEvents = []};
                        if(typeof hire.hireEvents === 'string') {hire.hireEvents = strToIdArray(hire.hireEvents)};

                        console.log(hire.hireRefs)
                    }
                    )

                state.hireList = loadedHires;
            })
            .addCase(dbGetHires.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(dbAddHire.fulfilled, (state, action) => {
                console.log("I will push this to the state: " + action.payload)
                state.hireList.push(action.payload.results[0]);
            })
            .addCase(dbAddHireContact.fulfilled, (state, action) => {
                const newContactStr = action.payload;
                console.log(newContactStr);

                const newContact = strToObjContact(newContactStr[0].hireContact);

                console.log(newContact);

                state.hireList.map(hire => {
                    if(hire.hireId === state.selectedHireModal) {
                        hire.hireContact = newContact
                    }
                })
            })
            .addCase(dbAddHireRef.fulfilled, (state, action) => {
                console.log("I will push this to the state: ");
                console.log(action.payload)

                state.hireList.map(hire => {
                    if(hire.hireId === state.selectedHireModal) {
                        hire.hireRefs = strToIdArray(action.payload.results[0].hireRefs);
                    }
                })
            })
            .addCase(dbAddHireDoc.fulfilled, (state, action) => {
                console.log("I will push this to the state: ");
                console.log(action.payload)

                state.hireList.map(hire => {
                    if(hire.hireId === state.selectedHireModal) {
                        hire.hireDocs = strToIdArray(action.payload.results[0].hireDocs);
                    }
                })
            })
            .addCase(dbHireAssignAsset.fulfilled, (state, action) => {
                console.log("I will push this to the state (dbHireAssignAsset): ");
                console.log(action.payload)

                state.hireList.map(hire => {
                    if(hire.hireId === state.selectedHireModal) {
                        hire.hireAsset = strToIdArray(action.payload.results[0].hireAsset);
                    }
                })
            })
            .addCase(dbHireAddEvent.fulfilled, (state, action) => {
                console.log("I will push this to the state (dbHireAddEvent): ");
                console.log(action.payload.results[0])

                state.hireList.map(hire => {
                    if(hire.hireId === action.payload.results[0].hireId) {
                        hire.hireEvents = strToIdArray(action.payload.results[0].hireEvents);
                    }
                })
            })

    }
});

export const { addHire, delHire, addHireRef, addHireAsset, addHireEvent, addContact, hireFORCEIdle, changeSelectedHireModal} = hireSlice.actions;

export const selectHires = (state:RootState) => state.hireSlice.hireList;
export const selectHiresStatus = (state:RootState) => state.hireSlice.status;
export const selectHiresError = (state:RootState) => state.hireSlice.error;

export default hireSlice;