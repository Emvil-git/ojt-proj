import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { iAsset, iProgram } from "../../models/asset.interface";
import { RootState } from "../../store";
import axios from 'axios';

const url = 'http://localhost:3000/assets';

type initStateType = {
    assetList: iAsset[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    selectedAssetModal: number | null;
    error: any; 
};

type assignAssetType = {
    assetId: number;
    assetHireId: number;
} 

type addProgramType = {
    assetPrograms: string;
    assetId: number;
}

type dbAssetType = {
    assetId: number;
    assetName: string;
    assetHireId: string;
    assetPrograms: string | iProgram[] | null;
}

export const dbGetAssets = createAsyncThunk('assets/getAsset', async () => {
    const response = await axios.get(`${url}/get`)
    return response.data.results;
})

export const dbAddAssets = createAsyncThunk('assets/addAsset', async () => {
    const response = await axios.post(`${url}/add`)
    return response.data.results;
})

export const dbAssignAsset = createAsyncThunk('assets/assignAsset', async (assignAsset: assignAssetType) => {
    const response = await axios.post(`${url}/updateHire`, assignAsset)
    console.log(response.data);
    return response.data.results;
})

export const dbAddProgram = createAsyncThunk('assets/updateProgram', async (updateProgram: addProgramType) => {
    const response = await axios.post(`${url}/updateProgram`, updateProgram)
    console.log(response.data);
    return response.data.results;
})

const strToProgArr = (progStr: string) => {
    const strArr = progStr.match(/{(.*?)}/g);

    return strArr?.map(str => JSON.parse(str)) as iProgram[];
} 

const initialState: initStateType = {
    assetList: [],
    status: 'idle',
    error: null,
    selectedAssetModal: null,
}

const assetSlice = createSlice({
    name: 'AssetSlice',
    initialState,
    reducers: {
        addAsset: (state, action: PayloadAction<iAsset>) => {
            state.assetList?.push(action.payload);
        },
        
        delAsset: (state, action: PayloadAction<{id: number}>) => {
            if(state.assetList !== null) {state.assetList = state.assetList?.filter(
                (asset) => asset.assetId !== action.payload.id
            );}
        },

        assignAsset: (state, action: PayloadAction<{assetId: number, assetHireId: number}>) => {
            state.assetList?.map(asset => {
                if(asset.assetId === action.payload.assetId) {
                    asset.assetHireId = action.payload.assetHireId;
                }
            })
        },

        addProgram: (state, action: PayloadAction<{assetId: number, program: iProgram}>) => {
            state.assetList?.map(asset => {
                if(asset.assetId === action.payload.assetId) {
                    asset.assetPrograms?.push(action.payload.program);
                }
            })
        },

        changeSelectedAssetModal(state, action: PayloadAction<number>) {
            state.selectedAssetModal = action.payload;
        },

        installProgram(state, action: PayloadAction<{assetId: number, assetProgName: string}>) {
            state.assetList?.map(asset => {
                if(asset.assetId === action.payload.assetId) {
                    asset.assetPrograms?.map(prog => {
                        if(prog.progName === action.payload.assetProgName) {
                            prog.isInstalled = true
                        }
                    })
                }
            })
        } 
    },
    extraReducers(builder) {
        builder
            .addCase(dbGetAssets.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(dbGetAssets.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const loadedAssets = action.payload
    
                loadedAssets.map((asset: dbAssetType) => 
                    {
                        
                        if(asset.assetPrograms === "null") {asset.assetPrograms = []};
                        if(typeof asset.assetPrograms == 'string') {asset.assetPrograms = strToProgArr(asset.assetPrograms)};
                    }
                    )

                 state.assetList = loadedAssets;
            })
            .addCase(dbGetAssets.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(dbAddAssets.fulfilled, (state, action) => {
                console.log(action.payload)
                state.assetList.push(action.payload)
            })
            .addCase(dbAssignAsset.fulfilled, (state, action) => {
                console.log(action.payload.results[0]);

                const assignedAsset = action.payload.results[0];

                state.assetList.map(asset => {
                    if(asset.assetId === assignedAsset.assetId) {
                        asset.assetHireId = assignedAsset.assetHireId;
                    }
                })
            })
            .addCase(dbAddProgram.fulfilled, (state, action) => {
                console.log(action.payload[0]);

                const progListStr = action.payload[0].assetPrograms;

                const progList = strToProgArr(progListStr);

                state.assetList.map(asset => {
                    if(asset.assetId === state.selectedAssetModal) {
                        asset.assetPrograms = progList;
                    }
                })

            })
    }
});

export const { addAsset, delAsset, assignAsset, addProgram, changeSelectedAssetModal, installProgram } = assetSlice.actions;

export const selectAssets = (state:RootState) => state.assetSlice.assetList;
export const selectAssetsStatus = (state:RootState) => state.assetSlice.status;
export const selectAssetsError = (state:RootState) => state.assetSlice.error;

export default assetSlice;