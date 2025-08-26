
export async function POST(request) {
  const data = await request.formData();
  const username = data.get("username");
  const gender = data.get("gender");
  const dob = data.get("dob");
  const bio = data.get("bio");
  const disable = data.get("disable");
  const disability = data.get("disability");
  const location = data.get("location");
  console.log(dob,location,username,gender,bio,)
  if(!username || !gender || !dob || !bio || !location ){
    return Response.json({message : 'Missing credentials', status : 400}, {status : 400})
  }
  try{
    if(username && gender && dob && bio){
        return Response.json({message : 'Account created', status : 200}, {status : 200})
    } else{
        return Response.json({message : 'Failed to create account', status : 400}, {status : 400})
    }
  } catch(e){
    return Response.json({message : 'server error', error : e, status : 500},{status:500})
  }




}
