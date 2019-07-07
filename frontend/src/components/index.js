import React, { Component } from 'react';
import { getQuestionWithAns } from './../api/api'
import './styles.css'

class Index extends Component{
    constructor(props){
        super(props);
        this.state = {
            question: '',
            ansArr: [],
            finalOutput: [],
            inProgress: true,
        }
        this.apiCaller = this.apiCaller.bind(this);
        this.handleAns = this.handleAns.bind(this);
    }
    componentDidMount(){
        this.apiCaller(1, []);
    }
    apiCaller(id, finalOutput){
        const data = { 
            id: id,
            finalOutput: finalOutput
        }
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
            this.apiCaller(id, this.state.finalOutput)
        }else{
            this.apiCaller(id, this.state.finalOutput)
            this.setState({inProgress: false})
        }
    }
    render(){
        const { question, ansArr, inProgress, finalOutput } = this.state;
        return(
            <div className="main_banner">
                {
                    inProgress &&
                    <div className="question_answer">
                        <div>Question: {question}</div>
                        <div className="answer">
                            {
                                ansArr.map((ans,index) => {
                                    return <div className="" key={index} onClick={() => this.handleAns(ans.ans, ans.next_q)}>{index+1} : {ans.ans}</div>
                                })
                            }
                        </div>
                    </div>
                }
                {
                    !inProgress &&
                    <div className="good_bye">
                        Good Bye!
                    </div>  
                }
            </div>
        )
    }
}

export default Index;