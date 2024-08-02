import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import Empty from "../../ui/Empty";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
const [confirmPaid,setConfirmPaid]=useState(false);
const [addBreakfast,setAddbreakfast]=useState(false);
const {booking,isLoading}=useBooking();
const{checkin,isCheckingIn}=useCheckin();
const {settings, isLoading:isLoadingSettings}=useSettings();

useEffect(()=>setConfirmPaid(booking?.isPaid||false),[booking]) 

const moveBack = useMoveBack();

  
  if (isLoading || isLoadingSettings) return <Spinner/>;

  if (!booking) return <Empty resourcename={'booking'}/>

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

 const  optionalBreakfast=settings.breakfastPrice*numNights*numGuests;

  function handleCheckin() {
 if(!confirmPaid) return 

if (addBreakfast){
  checkin({
    bookingId,
    breakfast:{
      hasBreakfast:true,
      extrasPrice:optionalBreakfast,
      totalPrice:totalPrice+optionalBreakfast
    }
  })
}else checkin({bookingId})

  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast&&<Box>
        <Checkbox checked={addBreakfast}
        onChange={()=>{setAddbreakfast((add)=>!add);
          setConfirmPaid(false);
        }} id={"breakfast"}>
          Want to add breakfast for {formatCurrency(optionalBreakfast)} 
        </Checkbox>
      </Box>}

      <Box>
        <Checkbox checked={confirmPaid}onChange={()=>setConfirmPaid((confirm)=>!confirm)} id={'confirm'} disabled={confirmPaid ||isCheckingIn}>I confirm that [{guests.fullName}] has paid the total amount {!addBreakfast?formatCurrency(totalPrice):`${formatCurrency(totalPrice+optionalBreakfast)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfast)})`} </Checkbox>
      </Box>
 
      <ButtonGroup>
        <Button onClick={handleCheckin}disabled={!confirmPaid||isCheckingIn}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </> 
  );
}

export default CheckinBooking;
