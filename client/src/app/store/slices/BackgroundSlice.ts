import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { iDocument, iReference } from "../../models/background.interface";
import { RootState } from "../../store";
import { BGType } from "../../models/types";
import axios from "axios";


const refUrl = 'http://localhost:3000/refs';
const docUrl = 'http://localhost:3000/docs';

type initStateType = {
    refList: iReference[];
    docList: iDocument[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: any; 
};

type newRefType = {
    refHireId: number,
    refType: string,
    refName: string,
    refInst: string,
    refNumber: string,
    refIsContacted: number,
}

type dbRefType = {
    refId: number;
    refHireId: number;
    refType: BGType | string;
    refName: string;
    refInst: string;
    refNumber: string;
    refIsContacted: boolean | number;
}

type newDocType = {
    docHireId: number,
    docTitle: string,
    docType: string,
    docDate: string,
    docSize: number,
    docIsVerified: number,
}

type dbDocType = {
    docId: number,
    docHireId: number,
    docTitle: string,
    docType: BGType | string,
    docDate: string,
    docSize: string,
    docIsVerified: boolean |  number,
}

type onlyRefIdType = {
    refId: number,
}

type onlyDocIdType = {
    docId: number,
}


const initialState: initStateType = {
    refList: [],
    docList: [],
    status: 'idle',
    error: null
}

export const dbGetRefs = createAsyncThunk('refs/getRefs', async () => {
    const response = await axios.get(`${refUrl}/get`)
    return response.data.results;
})

export const dbGetDocs = createAsyncThunk('docs/getRefs', async () => {
    const response = await axios.get(`${docUrl}/get`)
    return response.data.results;
})

export const dbAddRef = createAsyncThunk('refs/addRef', async (newRef: newRefType) => {
    const response = await axios.post(`${refUrl}/add`, newRef)
    return response.data;
})

export const dbAddDoc = createAsyncThunk('docs/addDoc', async (newDoc: newDocType) => {
    const response = await axios.post(`${docUrl}/add`, newDoc)
    return response.data;
})

export const dbDelRef = createAsyncThunk('refs/delRef', async (refDel: onlyRefIdType) => {
    const response = await axios.post(`${refUrl}/delete`, refDel)
    return response.data;
})

export const dbDelDoc = createAsyncThunk('docs/delDoc', async (docDel: onlyDocIdType) => {
    const response = await axios.post(`${docUrl}/delete`, docDel)
    return response.data;
})

export const dbVerifyRef = createAsyncThunk('refs/verifyRef', async (refVerify: onlyRefIdType) => {
    const response = await axios.post(`${refUrl}/verify`, refVerify)
    return response.data;
})

export const dbVerifyDoc = createAsyncThunk('docs/verifyDoc', async (docVerify: onlyDocIdType) => {
    const response = await axios.post(`${docUrl}/verify`, docVerify)
    return response.data;
})

const strToBGType = (strType: any) => {
    let type;
    switch (strType) {
        case "Educational Attainment":
            type = BGType[0];
            break;
        case "Previous Work Experience":
            type = BGType[1];
            break;
        case "Seminars Attended":
            type = BGType[2];
            break;
        default:
            type = 'error';
            break;
    }
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAd' + type);
    return type;

}

const bgSlice = createSlice({
    name: 'bgSlice',
    initialState,
    reducers: {
        addDoc: (state, action: PayloadAction<iDocument>) => {
            state.docList?.push(action.payload);
        },

        addRef: (state, action: PayloadAction<iReference>) => {
            state.refList?.push(action.payload);
        },

        delDoc: (state, action: PayloadAction<{id: number}>) => {
            if(state.docList !== null) {state.docList = state.docList?.filter(
                (doc) => doc.docId !== action.payload.id
            );}
        },

        delRef: (state, action: PayloadAction<{id: number}>) => {
            if(state.refList !== null) {state.refList = state.refList?.filter(
                (doc) => doc.refId !== action.payload.id
            );}
        },

        setRefVerified: (state, action: PayloadAction<{refId: number, isVerified: boolean}>) => {
            state.refList?.map(ref =>
                {if (ref.refId === action.payload.refId) {
                    ref.refIsContacted = action.payload.isVerified
                }}
            )
        },

        setDocVerified: (state, action: PayloadAction<{docId: number, isVerified: boolean}>) => {
            state.docList?.map(doc =>
                {if (doc.docId === action.payload.docId) {
                    doc.docIsVerified = action.payload.isVerified
                }}
            )
        },
    },
    extraReducers(builder) {
        builder
            .addCase(dbGetRefs.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(dbGetDocs.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(dbGetRefs.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const loadedRefs = action.payload

                loadedRefs.map((ref: dbRefType) => {
                    ref.refType = strToBGType(ref.refType);
                    ref.refIsContacted = (ref.refIsContacted) ? true : false;
                });


                state.refList = loadedRefs;
            })
            .addCase(dbGetDocs.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const loadedDocs = action.payload

                loadedDocs.map((doc: dbDocType) => {
                    doc.docType = strToBGType(doc.docType);
                    doc.docIsVerified = (doc.docIsVerified) ? true : false;
                });

                state.docList = loadedDocs;
            })
            .addCase(dbGetRefs.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(dbGetDocs.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(dbAddRef.fulfilled, (state, action) => {
                console.log(action.payload)

                const addedRef = action.payload.results[0];

                addedRef.refType = strToBGType(addedRef.refType);

                state.refList.push(addedRef);
            })
            .addCase(dbAddDoc.fulfilled, (state, action) => {
                console.log(action.payload)

                const addedDoc = action.payload.results[0];

                addedDoc.docType = strToBGType(addedDoc.docType);

                state.docList.push(addedDoc);
            })
            .addCase(dbVerifyRef.fulfilled, (state, action) => {
                console.log(action.payload)
                console.log(' ref verified ')
            })
            .addCase(dbVerifyDoc.fulfilled, (state, action) => {
                console.log(action.payload)
                console.log(' doc verified ')
            })
            .addCase(dbDelRef.fulfilled, (state, action) => {
                console.log(action.payload)
                console.log(' ref deleted ')
            })
            .addCase(dbDelDoc.fulfilled, (state, action) => {
                console.log(action.payload)
                console.log(' doc deleted ')
            })
    },
    });

export const { addRef, addDoc, delDoc, delRef, setRefVerified, setDocVerified } = bgSlice.actions;

export const selectRefs = (state:RootState) => state.bgSlice.refList;

export const selectDocs = (state:RootState) => state.bgSlice.docList;

export const selectBGStatus = (state:RootState) => state.bgSlice.status;
export const selectBGError = (state:RootState) => state.bgSlice.error;

export default bgSlice;