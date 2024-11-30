import { create } from "ipfs-http-client";
import crypto from "crypto-js";

// Initialize IPFS
const ipfs = create({ url: "https://ipfs.infura.io:5001/api/v0" });

export class IpfsService {
    static async uploadFile(fileContent: Buffer): Promise<string> {
        const { cid } = await ipfs.add(fileContent);
        return cid.toString();  // Return the CID (Content Identifier)
    }

    static encryptData(data: string, secretKey: string): string {
        return crypto.AES.encrypt(data, secretKey).toString();
    }

    static decryptData(encryptedData: string, secretKey: string): string {
        const bytes = crypto.AES.decrypt(encryptedData, secretKey);
        return bytes.toString(crypto.enc.Utf8);
    }

    static hashData(data: string): string {
        return crypto.SHA256(data).toString();
    }
}
