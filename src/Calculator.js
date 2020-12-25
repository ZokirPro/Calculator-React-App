/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import * as math from 'mathjs'
import './App.css'

export default class Calculator extends Component {

                                             /* STATE*/
    state={
        num1:"0",
        operator:"",
        text:"0",
        hasBinOperator:false
    }

                                            /* CLEAR FIELDS */
    handleClear=()=>{
        this.setState({
            text:"0",
            num1:"0",
            operator:"",
            hasBinOperator:false

        })
    }

                                            /* HANDLE CLICK NUMBER */
    handleClickNumber=(e)=>{
        if(this.state.text.length>20)
        {
            alert("Click \"=\" and then continue");
        }
        else
        {
            const {text,num1}=this.state
            const number=e.target.innerText
                let newText=text
                text==="0"? newText=number:newText+=number
                this.setState({num1:num1==="0"?number:num1+number})
                this.setState({
                    text:newText
                })
        }
        
    }

                                            /* HANDLE CLICK OPERATOR */
    handleClickOperator=(e)=>{
        if(this.state.text.length>20)
        {
            alert("Click \"=\" and then continue");
        }
        else
        {
            let operator=e.target.innerText
            operator=operator==="xy"?"^":operator==="×"?"*":operator==="÷"?"/":operator
            const {text,num1}=this.state
            const last_char=text[text.length-1]
            const hasBinOperatorLast=last_char==="+"||last_char==="-"||last_char==="*"||last_char==="/"||last_char==="^"
            //unary operator
            if((operator==="√"||operator==="+/-")){
            if(hasBinOperatorLast){
                alert("Ifoda noto'g'ri kiritilgan.Iltimos,qaytadan tekshirib urinib ko'ring")
            }
            else{

                
                    let res=0
                    const number=this.state.num1;
                    operator==="+/-" ?res=-number:res=math.sqrt(number);
                    res=this.isInt(res)? res:res.toString().length>10?res.toFixed(10):res.toString()
                    if(!this.state.hasBinOperator){
                        
                        this.setState({
                            text:res.toString(),
                            operator:""
                        })
                    }
                    else{
                        this.setState({
                            text:operator==="+/-"?this.state.text.replace(this.state.num1.toString(),"("+res+")"):this.state.text.replace(this.state.num1.toString(),res)
                        })
                    }
            }   
            }
            else{
                this.setState({
                operator,
                    num1:"0",
                    text: hasBinOperatorLast?text.slice(0,text.length-1)+operator:this.state.text+operator,
                    hasBinOperator:true
                })
            }
        }
    }

                                            /* HANDLE EQUAL(=) BUTTON */
    handleEqual=(e)=>{
        const {operator,num1,num2,text}=this.state
        const last_char=text[text.length-1]
        const isValidExpression=last_char!=="+"&&last_char!=="-"&&last_char!=="*"&&last_char!=="/"&&last_char!=="^"
        if(operator!==""&&isValidExpression){
            let res=math.evaluate(text)
            if(res>math.evaluate("10^20"))
            {
                alert("Overflow.Too Big!!!")
            }
            else{
                console.log(res)
                this.setState({
                text:this.isInt(res)? res:res.toString().length>10?res.toFixed(10):res.toString(),
                num1:"0",
                operator:"",
                hasBinOperator:false
            })
            }
            
        }
        else if(!isValidExpression){
            alert("Ifoda noto'g'ri kiritilgan.Iltimos,qaytadan tekshirib urinib ko'ring")
        }
        
    }
    isInt(n) {
        return n % 1 === 0;
     }

    

                                            /* RENDER */
    render() {
        const fontStyle={fontSize:"1.2em"}
        return (
            <div className="container">
                <div className="unselectable" id="calculator">
                    {/*  Screen and C key */}
                    <div className="top">
                        <div id="display" style={fontStyle}>{this.state.text}</div>
                    </div>
                    <div className="keys">
                        {/*  keys */}
                        <span className="btn operator"onClick={this.handleClickOperator}>+</span> 
                        <span className="btn operator"onClick={this.handleClickOperator}>-</span> 
                        <span className="btn operator"onClick={this.handleClickOperator}>×</span> 
                        <span className="btn operator"onClick={this.handleClickOperator}>&divide;</span>
                        <span className="btn number" onClick={this.handleClickNumber}>7</span> 
                        <span className="btn number" onClick={this.handleClickNumber}>8</span> 
                        <span className="btn number" onClick={this.handleClickNumber}>9</span> 
                        <span className="btn operator" onClick={this.handleClickOperator}>&radic;</span>
                        <span className="btn number" onClick={this.handleClickNumber}>4</span> 
                        <span className="btn number" onClick={this.handleClickNumber}>5</span> 
                        <span className="btn number" onClick={this.handleClickNumber}>6</span> 
                        <span className="btn operator"onClick={this.handleClickOperator}>x<sup>y</sup></span>
                        <span className="btn number" onClick={this.handleClickNumber}>1</span> 
                        <span className="btn number" onClick={this.handleClickNumber}>2</span> 
                        <span className="btn number" onClick={this.handleClickNumber}>3</span> 
                        <span className="btn " id="pnsign" onClick={this.handleClickOperator}>+/-</span>
                        <span className="btn number" onClick={this.handleClickNumber}>0</span> 
                        <span className="btn number" onClick={this.handleClickNumber}>.</span> 
                        <span className="btn operator" id="eval" onClick={this.handleEqual}>=</span> 
                        <span className="btn clear" onClick={this.handleClear}>C</span>
                    </div>
                </div>
            </div>
        )
    }
    
}
