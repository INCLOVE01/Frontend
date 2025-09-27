import fs from 'fs';
import path from 'path';

export async function GET() {
    try{
        const filePath = path.join(process.cwd(), 'src/data', 'community.json');
        const jsonData = fs.readFileSync(filePath, 'utf8');
        let objectData = JSON.parse(jsonData);
        
        
        if(objectData){
        return Response.json({data:objectData},{status:200})

        } else{
        return Response.json({message:'not found'},{status:400})
        }
    } catch(e){
        return Response.json({message:e},{status:500})
    }

    
}