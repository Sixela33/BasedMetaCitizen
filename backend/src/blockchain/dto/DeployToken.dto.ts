export class DeployTokenDto {
    jsonUri: string;
    fileUris: string[];
    data: {
        name: string;
        symbol: string;
        decimals: number;
        initialSupply: number; 
    }
}