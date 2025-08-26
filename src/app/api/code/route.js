
export async function POST(request) {
  const data = await request.formData();
  const code = data.get("code");
  if(!code){
    return Response.json({ message: 'no code provided', error:e, status : 400 },{status:400})
  }
  try{
    var raw = JSON.stringify({
        verificationCode: code
    });

    const req = await fetch(`${process.env.NEXT_BACKENED_URL}/auth/register/verificationCode`,{
        method : 'POST',
        headers: {
        'Content-Type': 'application/json', // Corrected header key
        },
        body : raw,
        redirect : 'follow'

    })
    const resp = await req.json()

    if(resp.status == 200){
       return Response.json({ message: 'success', status : 200 },{status:200});
    } else if(resp.status == 1005){
       return Response.json({ message: 'invalid verification code', status : 401 },{status:401});
    } else{
        return Response.json({ message: 'code verification failed', status : 400 },{status:400});
    }

  } catch(e){
        return Response.json({ message: 'failed', error:e, status : 500 },{status:500});

  }


}
