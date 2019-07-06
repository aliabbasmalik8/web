import React, { Component } from 'react';
import { getQuestionWithAns } from './../api/api'
import './styles.scss'

class Index extends Component{
    constructor(props){
        super(props);
        this.state = {
            question: '',
            ansArr: [],
            finalOutput: [],
        }
        this.apiCaller = this.apiCaller.bind(this);
        this.handleAns = this.handleAns.bind(this);
    }
    componentDidMount(){
        this.apiCaller(1);
    }
    apiCaller(id){
        const data = { id: id }
        let newFinalOutput = this.state.finalOutput;
        getQuestionWithAns(data)
        .then((res) => {
            newFinalOutput.push(res.question);
            this.setState({
                question: res.question,
                ansArr: res.answer,
                finalOutput: newFinalOutput,
            })
        })        
    }
    handleAns(ans, id){
        this.setState({finalOutput: this.state.finalOutput.push(ans)})
        if(id !== -1){
            this.apiCaller(id)
        }else{
            console.log(this.state.finalOutput)
        }
    }
    render(){
        const { question, ansArr } = this.state;
        return(
            <div className="main_banner">
                <div>{question}</div>
                {
                    ansArr.map((ans,index) => {
                        return <div key={index} onClick={() => this.handleAns(ans.ans, ans.next_q)}>{ans.ans}</div>
                    })
                }
            </div>
        )
    }
}

export default Index;