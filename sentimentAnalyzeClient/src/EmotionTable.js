import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      return (  
        <div class="container vw-60">
          {/* {JSON.stringify(this.props.emotions)} */}
          <table className="table table-hover">
            <tbody>
            {
              Object.entries(this.props.emotions).map((value) => (
                <tr className="table-row">
                  <th scope="row">{value[0]}</th>
                  <td>{value[1]}</td>
                </tr>
              ))}
             </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
