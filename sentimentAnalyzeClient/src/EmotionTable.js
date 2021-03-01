import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
  
      return (  
        <div>
          {JSON.stringify(this.props.emotions)}
          <table className="table table-bordered">
            <tbody>
            {this.props.emotions.map(emotion => {
                return <tr><td>{emotion}</td></tr>
            })
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
