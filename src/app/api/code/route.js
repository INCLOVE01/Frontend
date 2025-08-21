
export async function POST(request) {
  const data = await request.formData();
  const code = data.get("code");
   try{
        if(code == 123456){
            return Response.json({ message: 'verified', status:200 },{status:200});
        } else{
            return Response.json({ message: 'code does not match', status : 400 },{status:400});
        }

   } catch(e){
        return Response.json({ message: 'failed', error:e, status : 500 },{status:500});

   }

}
