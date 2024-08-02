import { PAGE_SIZE } from "../utils/constatnts";
import supabase from "./supabase";
import { supabaseUrl } from "./supabase";


export async function getCabin(page){

let query = supabase
  .from('cabins')
  .select('*',{count:"exact"})

  


  if(page){
    const from =(page-1)*PAGE_SIZE;
    const to=from+PAGE_SIZE-1;
   query=query.range(from,to);
 }
    
  
  let { data, error ,count} = await  query  
  
  if (error){
    console.error(error)
    throw  new Error('Could not be loaded')
  }  


  return {data,count};
}



// CREATE AND EDIT CABIN
export async function createEditCabin(newCabin,id){

  const hasImagePath= ()=>{
    if (typeof newCabin?.image === 'string')return true;
    else return false;
  };

  const imageName= `${Math.random()}-${newCabin?.image.name}`.replace('/','');


const imagePath=hasImagePath()?newCabin?.image:`${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

//Create and edit cabin
let query = supabase.from('cabins');

//(A) Create 
if (!id)query=query.insert([{...newCabin,image:imagePath}]);

//(B) Edit
if (id) query=query.update({...newCabin,image:imagePath}).eq("id",id);


const { data, error } = await query
.select().single();

if (error){
  console.error(error);
  throw new Error("Cabin could not be Created")
}

if (hasImagePath()) return data;
//upload the image
const { error:storageError } = await supabase
  .storage
  .from('cabins')
  .upload(imageName,newCabin.image
   
 );

if (storageError){
  console.error(storageError);
  deleteCabin(data.at(0).id);
  throw new Error('Could not upload image ');
}



return data;

}

export async function deleteCabin(id){

 const{data,error}=await supabase.from("cabins").delete().eq("id",id)
;

if (error){
  console.error(error);
  throw new Error("Cabin could not be deleted")
}

return data;
}