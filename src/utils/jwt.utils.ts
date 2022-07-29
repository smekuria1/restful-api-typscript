import jwt from 'jsonwebtoken';
import config from 'config';
import log from './logger';
const privateKey = Buffer.from(config.get<string>('privateKey'), 'base64').toString('ascii');
const publicKey = Buffer.from(config.get<string>('publicKey'), 'base64').toString('ascii');

export function signJwt(object: Object, options?: jwt.SignOptions | undefined){
  return jwt.sign(object,privateKey,{
    ...(options && options),
    algorithm: "RS256"
  })
}


export function verifyJwt(token:string){
    try{
        const decoded = jwt.verify(token, publicKey);
        //console.log(decoded, "in verifyJwt")
        return {
            valid: true,
            expired: false,
            decoded: decoded,
        }
    } catch(e: any){
        console.log(e.message, "in verifyJwt error")
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null,
        }
    }
}

// const newAccessToken = responseHeaders['x-access-token']

// if(newAccessToken){
//     console.log('Set new access token')
// postman.setEnvironmentVariable("accessToken", newAccessToken);
// }

