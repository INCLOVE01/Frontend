export async function GET() {
    try{
        const objectData = [
            {id:1,name:'La-Poma', src : 'https://images.pexels.com/photos/1383776/pexels-photo-1383776.jpeg', alt : 'la-poma'},
            {id:1,name:'SunDry Resort', src : 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg', alt : 'sundry resort'}
        ]
        
        
        if(objectData.length){
        return Response.json({data:objectData},{status:200})

        } else{
        return Response.json({message:'no data'},{status:400})
        }
    } catch(e){
        return Response.json({message:e},{status:500})
    }

    
}