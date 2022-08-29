export interface iProgram{
    progName: string;
    isInstalled: boolean;
}

export interface iAsset{
    assetId: number;
    assetName: string;
    assetHireId: number | null;
    assetPrograms: iProgram[] | null;
}