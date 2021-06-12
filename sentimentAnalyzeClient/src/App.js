import './bootstrap.min.css';	
	import './App.css';
	import EmotionTable from './EmotionTable.js';
	import React from 'react';
	import axios from 'axios';
	
	class App extends React.Component {
	state = {innercomp:<textarea rows="4" cols="50" id="textinput"/>,
	mode: "text",
	sentimentOutput:[],
	sentiment:true
	}
	
	componentDidMount(){
	document.title = "Sentiment Analyzer"
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
	let url = ".";
	
	if(this.state.mode === "url") {
	url = url+"/url/sentiment?url="+document.getElementById("textinput").value;
	} else {
	url = url+"/text/sentiment?text="+document.getElementById("textinput").value;
	}
	ret = axios.get(url);
	ret.then((response)=>{
	
	let output = '';
	if(response.data.result === "positive") {
	output = <div style={{color:"green",fontSize:20}}>{response.data.result}</div>
	} else if (response.data.result === "negative"){
	output = <div style={{color:"red",fontSize:20}}>{response.data.result}</div>
	} else {
	output = <div style={{color:"yellow",fontSize:20}}>{response.data.result}</div>
	}
	this.setState({sentimentOutput:output});
	});
	}
	
	sendForEmotionAnalysis = () => {
	this.setState({sentiment:false});
	let ret = "";
	let url = ".";
	if(this.state.mode === "url") {
	url = url+"/url/emotion?url="+document.getElementById("textinput").value;
	} else {
	url = url+"/text/emotion/?text="+document.getElementById("textinput").value;
	}
	ret = axios.get(url);
	
	ret.then((response)=>{
	this.setState({sentimentOutput:<EmotionTable emotions={response.data}/>});
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

