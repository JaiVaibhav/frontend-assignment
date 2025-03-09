import React, { useEffect, useState } from "react";
import './app.css';
const App = () => {
  const [projectDetails, setProjectDetails] = useState([]);
  const [pages, setPages] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  async function fetchDetails(){
    const response = await fetch('https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json');
    return await response.json();
  }
 function updateSelectedPage(num){
  setSelectedPage(num);
 }
  useEffect(()=>{
     fetchDetails().then((data)=>{
      setProjectDetails(data);
      console.log(data.length);
      if(data.length%5)
      {
        setPages(Number.parseInt(data.length/5)+1);
      }
      else{
        setPages(data.length/5 )
      }
      
     })
  },[])
  return <div>
    <header>
      Project Details
      </header>
      <div className="tableWrapper">
      <table className="tstyle">
        <thead>
          <tr>
          <th>Serial Number</th>
          <th>Percent Funded</th>
          <th>Amount Pledged</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {
         projectDetails.length>0 &&  new Array(5).fill(0).map((_,i)=>{
          console.log(projectDetails.length, selectedPage*5+i, projectDetails[(selectedPage*5)+i])
            return (selectedPage*5)+i < projectDetails.length && <tr>
                <td>{projectDetails[(selectedPage*5)+i]["s.no"]}</td>
                <td>{projectDetails[(selectedPage*5)+i]["amt.pledged"]}</td>
                <td>{projectDetails[(selectedPage*5)+i]["percentage.funded"]}</td>
            </tr>
           })
          }
         
          </tbody>
      </table>
      
      </div>
      <div className="paginate">
        <div className="arrowcss" onClick={()=>updateSelectedPage(selectedPage-1 === -1?0:selectedPage-1)}>{"<"}</div>
        {
          (new Array(pages)).fill(0).map((_, i) =>
            {
            if(i<2)
            {
              return <div className={`${ selectedPage === i ?"selectedcss":""}`} onClick={()=>updateSelectedPage(i)}>{i+1}</div>
            }
        })
        }
         {pages>4 && (selectedPage >=2 && selectedPage < pages-2)? <div className="selectedcss" >...&nbsp;&nbsp;&nbsp;{selectedPage+1}&nbsp;&nbsp;&nbsp;...</div>:<div>...</div>}
         {
          (new Array(pages)).fill(0).map((_, i) =>
            {
            if(i>pages-3)
            {
              return <div className={`${ selectedPage === i ?"selectedcss":""}`}  onClick={()=>updateSelectedPage(i)}>{i+1}</div>
            }
        })
        }
        <div className="arrowcss" onClick={()=>updateSelectedPage(selectedPage+1 === pages?selectedPage:selectedPage+1)} >{">"}</div>
      </div>
  </div>
};

export default App;
