import protectHpp from 'hpp';
import helmet from 'helmet';
import { RequestHandler } from 'express';


/**
 *  More security feature can be added here
 *  See https://helmetjs.github.io/
 */
export function createSecurityHandler(){
    return [
        // Use default Helmet security headers as a baseline
        helmet(),

        // Protects against HTTP Parameter Pollution attacks
        protectHpp(),
    ].filter((middleware): middleware is RequestHandler => !!middleware);
}