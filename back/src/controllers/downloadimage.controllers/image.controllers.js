import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

const fsExists = promisify(fs.exists);
const fsMkdir = promisify(fs.mkdir);

const imageController = {
    async getImage(req, res) {
        const content = req.params.content;
        const type = req.params.type;
        const image = req.params.image;
        const pathImage = path.resolve(__dirname, `../../../images/imgs/${content}/${type}/${image}`);
        
        try {
            const pathExists = await fsExists(pathImage);

            if (!pathExists) {
                await fsMkdir(path.dirname(pathImage), { recursive: true });
            }
            
            res.sendFile(pathImage);
        } catch (error) {
            console.error('Error creating directory:', error);
            return res.status(500).send('Internal Server Error');
        }
    }
};

export default imageController;
