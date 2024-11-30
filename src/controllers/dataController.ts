import { Request, Response } from "express";
import { IpfsService } from "../services/ipfsService";
import { ZkSyncService } from "../services/zkSyncService";

export class DataController {
    static async storeData(req: Request, res: Response) {
        try {
            const { fileContent, secretKey } = req.body;

            // Encrypt the file content
            const encryptedContent = IpfsService.encryptData(fileContent, secretKey);

            // Upload encrypted content to IPFS
            const cid = await IpfsService.uploadFile(Buffer.from(encryptedContent));

            // Hash the IPFS CID
            const dataHash = IpfsService.hashData(cid);

            // Store the hash on the zkSync L2 network
            const txHash = await ZkSyncService.storeData(dataHash);
            res.json({ txHash, cid });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateData(req: Request, res: Response) {
        try {
            const { fileContent, secretKey, cid } = req.body;

            // Encrypt the new file content
            const encryptedContent = IpfsService.encryptData(fileContent, secretKey);

            // Upload the new encrypted content to IPFS
            const newCid = await IpfsService.uploadFile(Buffer.from(encryptedContent));

            // Hash the new IPFS CID
            const newDataHash = IpfsService.hashData(newCid);

            // Update the hash on the zkSync L2 network
            const txHash = await ZkSyncService.updateData(newDataHash);
            res.json({ txHash, newCid });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteData(req: Request, res: Response) {
        try {
            const { cid } = req.body;

            // Simulate data deletion by removing the reference to the CID
            const nullHash = IpfsService.hashData("");
            const txHash = await ZkSyncService.deleteData(nullHash);
            res.json({ txHash });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async grantAccess(req: Request, res: Response) {
        try {
            const { userAddress, role } = req.body;

            const txHash = await ZkSyncService.grantAccess(userAddress, role);
            res.json({ txHash });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async revokeAccess(req: Request, res: Response) {
        try {
            const { userAddress } = req.body;

            const txHash = await ZkSyncService.revokeAccess(userAddress);
            res.json({ txHash });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
