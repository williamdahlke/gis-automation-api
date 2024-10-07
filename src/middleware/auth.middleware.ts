import { NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction } from "express";
import * as dotenv from 'dotenv';

dotenv.config();
const API_KEY = process.env.API_KEY;

export class AuthMiddleware implements NestMiddleware{
    use(req: any, res: any, next: NextFunction) {        
        console.log(req.headers) ; 
        const authHeader = req.headers['authorization'];
   
        if (!authHeader) {
          throw new UnauthorizedException('No authorization header provided');
        }
        
        const token = authHeader.split(' ')[1];

        if (token === API_KEY) {
            next();
        } else {
            throw new UnauthorizedException('Invalid token');
        }       
    }
}