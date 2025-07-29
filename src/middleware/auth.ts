import jwt from 'jsonwebtoken';
export function verifyToken(headers:Headers):{userId?:string;error?:string}{
    const authHeader = headers.get("authorization");
    if(!authHeader) return {error:"Token missing"};
    const token = authHeader.replace("Bearer ","");
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as{_id:string};

        return {userId: decoded._id}
    }
    catch(error){
        return {
            error:"Invalid Token"
        }
    }
}