import { execSync } from 'child_process';
import * as fs from 'fs';

export function generateAgeProof(age: number, threshold: number): { proof: any, publicSignals: any } {
    const input = { age, threshold };
    fs.writeFileSync('input.json', JSON.stringify(input));

    // Generate witness
    execSync('snarkjs wtns calculate selective_disclosure.wasm input.json witness.wtns');

    // Generate the proof
    execSync('snarkjs groth16 prove selective_disclosure.pkey witness.wtns proof.json public.json');
    
    // Read and return the generated proof and public signals
    const proof = JSON.parse(fs.readFileSync('proof.json', 'utf8'));
    const publicSignals = JSON.parse(fs.readFileSync('public.json', 'utf8'));

    return { proof, publicSignals };
}
