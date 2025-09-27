export async function GET(params) {
    try{
    const objectData = [
        {id:1, name:'Maria Yen', age:21, src : '/images/pp1.jpg', alt : '1'},
        {id:2, name:'Sana Minotsuzaki', age:24, src : '/images/pp6.jpg', alt : '2'},
        {id:3, name:'Diya Jha', age:22, src : '/images/pp7.jpg', alt : '3'},
        // {id:4, name:'Yenna Kim', src : '', alt : ''},
        // {id:5, name:'Jane Doe', src : '', alt : ''},


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