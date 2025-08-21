
export async function POST(request) {
  const data = await request.formData();
  const email = data.get("email");
  const password = data.get("password");
    if(email && password){
        return Response.json({ message: 'Form submitted successfully!', status:200 },{status:200});
    } else{
        return Response.json({ message: 'Invalid Credentials', status : 400 },{status:400});
    }

}
