import './bootstrap.min.css';
import './App.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {innercomp:<textarea rows="4" cols="50" id="textinput"/>,
            mode: "text",
          sentimentOutput:[],
          sentiment:true
        }
  
  renderTextArea = ()=>{
    document.getElementById("textinput").value = "";
    if(this.state.mode === "url") {
      this.setState({innercomp:<textarea rows="4" cols="50" id="textinput"/>,
      mode: "text",
      sentimentOutput:[],
      sentiment:true
    })
    } 
  }

  renderTextBox = ()=>{
    document.getElementById("textinput").value = "";
    if(this.state.mode === "text") {
      this.setState({innercomp:<textarea rows="1" cols="50" id="textinput"/>,
      mode: "url",
      sentimentOutput:[],
      sentiment:true
    })
    }
  }

  sendForSentimentAnalysis = () => {
    this.setState({sentiment:true});
    let ret = "";
    let url = "";
    if(this.state.mode === "url") {
      url = "http://localhost:3333/url?url="+document.getElementById("textinput").value;
    } else {
      url = "http://localhost:3333/text/"+document.getElementById("textinput").value;
    }
    ret = axios.get(url);
    ret.then((response)=>{
      //Include code here to check the sentiment and fomrat the data accordingly
      // this.setState({sentimentOutput:response.data});
      let output = ""
      if(response.data === "positive") {
        output = <div style={{color:"green",fontSize:20}}>{response.data}</div>
      } else if (response.data === "negative"){
        output = <div style={{color:"red",fontSize:20}}>{response.data}</div>
      } else {
        output = <div style={{color:"orange",fontSize:20}}>{response.data}</div>
      }
      this.setState({sentimentOutput:output});
    });
  }

  sendForEmotionAnalysis = () => {
    this.setState({sentiment:false});
    let ret = "";
    let url = "";
    if(this.state.mode === "url") {
      url = "http://localhost:3333/url/emotion?url="+document.getElementById("textinput").value;
    } else {
      url = "http://localhost:3333/text/emotion/"+document.getElementById("textinput").value;
    }
    ret = axios.get(url);

    ret.then((response)=>{
      this.setState({sentimentOutput:
        <table className="table table-bordered">
          <tbody>
          {
            Object.entries(response.data).map(([key,val])=>{
              return <tr><td>{key}</td><td>{val}</td></tr>
            })
          }
          </tbody>
        </table>
    });
  });
  }
  

  render() {
    return (  
      <div className="App">
      <button className="btn btn-info" onClick={this.renderTextArea}>Text</button>
        <button className="btn btn-dark"  onClick={this.renderTextBox}>URL</button>
        <br/><br/>
        {this.state.innercomp}
        <br/>
        <button className="btn-primary" onClick={this.sendForSentimentAnalysis}>Analyze Sentiment</button>
        <button className="btn-primary" onClick={this.sendForEmotionAnalysis}>Analyze Emotion</button>
        <br/>
            {this.state.sentimentOutput}
      </div>
    );
    }
}

export default App;
