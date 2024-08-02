import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import Spinner from '../../ui/Spinner';
import useUpdateSetting from './useUpdateSetting';

function UpdateSettingsForm() {
const {isLoading,
  settings:{
    minBookingLength,
    maxBookingLength,
    maxGuestPerBooking,
    breakfastPrice
  }={}}=useSettings();


const {isUpdating,updateSetting}=useUpdateSetting();

  if(isLoading) return <Spinner/>

function handleSubmit(e,field){
  const {value}=e.target;

  if(!value) return;

  console.log(field)
  updateSetting({[field]:value})

  
}


  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' defaultValue={minBookingLength}
        disabled={isUpdating}
        onBlur={(e)=>handleSubmit(e,'minBookingLength')}/>
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights'  defaultValue={maxBookingLength}
        disabled={isUpdating}
        onBlur={(e)=>handleSubmit(e,'maxBookingLength')}/>
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' defaultValue={maxGuestPerBooking} 
        disabled={isUpdating}
        onBlur={(e)=>handleSubmit(e,'maxGuestPerBooking')}/>
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={breakfastPrice} 
        disabled={isUpdating}
        onBlur={(e)=>handleSubmit(e,'breakfastPrice')}/>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
