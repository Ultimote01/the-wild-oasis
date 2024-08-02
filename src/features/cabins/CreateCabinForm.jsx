import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import {useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";


function CreateCabinForm({cabintoEdit={},onCloseModal}) {
  

const {id:editId,...editValues}=cabintoEdit;
const iseditSession=Boolean(editId);
const {register,handleSubmit,reset,getValues,formState}=useForm({
  defaultValues:iseditSession?editValues:{}
});
const {errors}=formState;
const {isCreating,createCabin}=useCreateCabin();
const {isEditing,editCabin}=useEditCabin();



const isWorking= isCreating||isEditing;   

function onSubmit(data){
  
  const image = typeof data.image === 'string' ? data.image:data.image[0];
  if (iseditSession){
    editCabin({newCabinData:{...data,image:
      !image?editValues.image:image},id:editId},{
      onSuccess:()=> {
        reset()
        onCloseModal?.()
      }
    })
  }else createCabin({...data,image:image},{
    onSuccess:()=> {
      reset() 
      onCloseModal?.()
    }
  }
  )
}

// function getError(error){
// console.log(typeof getValues().regularPrice);
// }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}
    type={onCloseModal? "modal":"regular"}>
    
      <FormRow label='Cabin name' error={errors?.name?.message} >
      <Input type="text" id="name" {...register('name',{required:
        'This field is required',
        min:{
          value:1,
          message: "Minimum capacity is 1"}})}/>
        </FormRow>

        <FormRow label={ 'Maximum capacity'} error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity"  {...register('maxCapacity',{required:
        'This field is required'})}/>
      </FormRow>

      <FormRow label={'Regular price'} error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" {...register('regularPrice',{required:
        'This field is required'})} />
      </FormRow>


      <FormRow label={'Discount'} error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} {...register('discount',{required:
        'This field is required',
         validate:
         (value)=>Number(value) <= Number(getValues().regularPrice)|| 
         "Discount should be lesser than regular price."})} />
      </FormRow>

      <FormRow label={'Description for website'} error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" {...register('description',{required:
        'This field is required'})} />
      </FormRow>


      <FormRow label={'Cabin Photo'} error={errors?.image?.message}>
        <FileInput id="image" accept="image/*"  {...register('image',{required:editValues.image?false: 'This field is required'})}/>
      </FormRow>



      <FormRow>
        {/* type is an HTML attribute! */}
       <Button variation="secondary" type="reset" 
       onClick={()=>onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{iseditSession?"Edit Cabin":"Create new cabin"}</Button>
      </FormRow> 

    </Form>
  );
}

export default CreateCabinForm;
