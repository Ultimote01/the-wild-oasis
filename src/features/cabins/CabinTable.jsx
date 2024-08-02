// import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";



// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);  
//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;


function CabinTable() {
  const {isLoading,cabins,count}=useCabins();
  const [searchParams]=useSearchParams();




  
  if (isLoading) return <Spinner/>

  if (!cabins?.length) return <Empty resourcename={'cabins'}/>

  const filterValue= searchParams.get('discount')||
  "all";


   
  // Filter
let filteredCabins;

if ( filterValue === "all") filteredCabins=cabins;
if( filterValue === 'no-discount')
  filteredCabins=cabins?.filter((cabin)=>cabin.discount===0);
if(filterValue === 'with-discount')
  filteredCabins=cabins?.filter((cabin)=>cabin.discount>0);



// Sort
const sortBy= searchParams.get('sortby') || "name-asc";
const [field,direction]=sortBy.split('-');
const modifier = direction === 'asc'? 1:-1
const sortedCabins= filteredCabins.sort((a,b)=>{
 return  (a[field]-b[field])*modifier});


   const duplicate = cabins?cabins.filter(
     (element)=>element.name.includes('Copy')):''


  return(
    <Menus> 
      <Table columns=" 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row" >
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={sortedCabins}  filterClicked={filterValue !== "all"?filterValue:''}  render={(cabin)=><CabinRow cabin={cabin} duplicate={duplicate} key={cabin.id}/>}/>
       
       <Table.Footer>
        <Pagination count={count}/>
       </Table.Footer>
      </Table>
      </Menus>
    
  )
}

export default CabinTable;

