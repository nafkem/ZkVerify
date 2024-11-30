
import { syncWallet } from "../config/config";
import { ethers } from "ethers";
import { Verifier__factory } from "../types";

export class ZkSyncService {
    static async storeData(dataHash: string): Promise<string> {
        const contract = Verifier__factory.connect(syncWallet.address, syncWallet);

        const tx = await contract.storeData(ethers.utils.formatBytes32String(dataHash));
        await tx.wait();

        return tx.hash;
    }

    static async updateData(newDataHash: string): Promise<string> {
        const contract = Verifier__factory.connect(syncWallet.address, syncWallet);

        const tx = await contract.updateData(ethers.utils.formatBytes32String(newDataHash));
        await tx.wait();

        return tx.hash;
    }

    static async deleteData(nullHash: string): Promise<string> {
        const contract = Verifier__factory.connect(syncWallet.address, syncWallet);

        const tx = await contract.deleteData(ethers.utils.formatBytes32String(nullHash));
        await tx.wait();

        return tx.hash;
    }

    static async grantAccess(userAddress: string, role: number): Promise<string> {
        const contract = Verifier__factory.connect(syncWallet.address, syncWallet);

        const tx = await contract.grantAccess(userAddress, role);
        await tx.wait();

        return tx.hash;
    }

    static async revokeAccess(userAddress: string): Promise<string> {
        const contract = Verifier__factory.connect(syncWallet.address, syncWallet);

        const tx = await contract.revokeAccess(userAddress);
        await tx.wait();

        return tx.hash;
    }

    static async verifyProof(proof: any, publicSignals: any): Promise<boolean> {
        const contract = Verifier__factory.connect(syncWallet.address, syncWallet);

        const isValid = await contract.verifyProof(proof, publicSignals);
        return isValid;
    }
}
