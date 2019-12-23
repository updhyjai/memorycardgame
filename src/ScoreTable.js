import React from 'react';
import './ScoreTable.css';

function ScoreTable(props) {
  if(props.scores.length ===0){
    return (<></>)
  }
  console.log(props)
  let tableData = props.scores.map((item, index) => {
    return (
      <tr key = {index}>
        <td>{index+1}</td>
        <td>{item.turns}</td>
        <td>{item.name}</td>
      </tr>
    );
  });
  return (
    <table>
      <thead>
        <tr>
          <th>Serial Number</th>
          <th>Turns</th>
          <th>Player Name</th>
        </tr>
        
      </thead>
      <tbody>{tableData}</tbody>
    </table>
  );
}

export default ScoreTable;
