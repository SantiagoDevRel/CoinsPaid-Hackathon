// pages/api/addresses.js
import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./app/data/addresses.json');

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            try {
                const data = await fs.promises.readFile(filePath, 'utf8');
                res.status(200).json({ addresses: JSON.parse(data) });
            } catch (error) {
                res.status(500).json({ error: 'Failed to read file' });
            }
            break;
        case 'POST':
            try {
                await fs.promises.writeFile(filePath, JSON.stringify(req.body.addresses, null, 2), 'utf8');
                res.status(200).send('Addresses updated successfully');
            } catch (error) {
                res.status(500).json({ error: 'Failed to write file' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
