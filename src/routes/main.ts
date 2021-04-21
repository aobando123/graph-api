import { Request, Response } from "express";
import path from "path";

const index = (req: Request, res: Response) => {
  return res.sendFile(path.join(__dirname, '/../../dist/public', '/index.html'));
};

export { index };
