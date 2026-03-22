import type { Request, Response } from 'express';
import { getLocationsByProximity } from '../models/locationModel.js';

export function getLocations(req: Request, res: Response): void {
  const { lat, lng, radius } = req.query as unknown as {
    lat: number;
    lng: number;
    radius: number;
  };

  const locations = getLocationsByProximity(lat, lng, radius);
  res.json({ data: locations });
}
