
import { ethers } from 'ethers';
import verifierAbi from './verifierAbi.json'; // Import the ABI of the Verifier contract

export async function verifyProofOnChain(proof: any, publicSignals: any, verifierAddress: string): Promise<boolean> {
    const provider = new ethers.providers.JsonRpcProvider('YOUR_RPC_URL');
    const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);

    const verifierContract = new ethers.Contract(verifierAddress, verifierAbi, wallet);

    const isValid = await verifierContract.verifyProof(proof, publicSignals);
    return isValid;
}
