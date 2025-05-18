import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if(req.method === 'POST') {
            const {temp, condition, name, country, maxTemp, minTemp, data } = req.body;  
            const search = await prisma.weather.create({
                data: { temp, condition, name, country, maxTemp, minTemp, data }
            });
            res.status(201).json(search);  
        }
        else if (req.method === 'GET') {       
            const searches = await prisma.weather.findMany({ orderBy: { id: "desc" }, take: 4 });
            res.status(200).json(searches);
        }
        else {
            res.status(405).end();
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", details: error });
    }
}