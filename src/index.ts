import express from 'express';
import { generateAgeProof } from './services/proofService';
import { verifyProofOnChain } from './services/verifyProofService';
import { DataController } from './controllers/dataController';
import { authenticate } from './middleware/authMiddleware';
import { AuthService } from './services/authService';

const app = express();
app.use(express.json());

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        await AuthService.register(username, password);
        res.status(201).json({ message: 'User registered' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await AuthService.login(username, password);
        res.json({ token });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
});

app.post('/generate-age-proof', (req, res) => {
    const { age, threshold } = req.body;
    const { proof, publicSignals } = generateAgeProof(age, threshold);
    res.json({ proof, publicSignals });
});

app.post('/verify-proof', async (req, res) => {
    const { proof, publicSignals, verifierAddress } = req.body;
    const isValid = await verifyProofOnChain(proof, publicSignals, verifierAddress);
    res.json({ valid: isValid });
});

app.post('/store-data', authenticate, DataController.storeData);
app.post('/update-data', authenticate, DataController.updateData);
app.post('/delete-data', authenticate, DataController.deleteData);
app.post('/grant-access', authenticate, DataController.grantAccess);
app.post('/revoke-access', authenticate, DataController.revokeAccess);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
