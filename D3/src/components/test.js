import React, { Component} from 'react'

const mapClass = new Map(
  [['success', 'alert-success'], ['message', 'alert-info'], ['caution', 'alert-warning'], ['error', 'alert-danger']]
)

// TODO: Create the Notification Component
const Notification = props => {  
 
  if (!props.notification)
    return null
  
  const {notification: {message, type}, children} = props
  if (!message)
    return null
  const msgClass = mapClass.get(type) || 'alert-info'
    
  return (
     <div className={`alert ${msgClass}`}>
      <p>{message}</p>
      {children}
    </div>
  )
}

// TODO: Create a Confirmation Component
class Confirmation extends React.Component {    
    constructor(props) {
        super(props)
        this.state = {submitted: 0}
    }
  
  handleOk = e => {
    e.preventDefault()
    if (this.state.submitted)
      return
    this.props.accept && this.props.accept()    
    this.setState( (p, s) => ({submitted: 1}) )
  } 
  handleCancel = e => {
    e.preventDefault()
    if (this.state.submitted)
      return
    this.props.decline && this.props.decline()    
    this.setState( (p, s) => ({submitted: 2}) )
  }
  
  getResult = _ => (this.state.submitted)
  
  render() {
    const {message, type, accept, decline} = this.props
    
    if (this.state.submitted)
      return null
    
    return (      
        <Notification notification={{message, type}}>
          <div className="btn btn-primary" onClick={this.handleOk}>Sure</div>
          <div className="btn btn-danger" onClick={this.handleCancel}>No Thanks</div>
        </Notification>      
    )
  }
}

export class QuestionContainer extends React.Component { 
  state = {phase: 0}
  //0 - initial: confirmation has not opened, show answer btn enabled, answer not shown
  //1 - answer is shown
  //2 - answer accepted, answer is shown

  handleShowAnswer = e => {
    e.preventDefault()
    
    if (this.state.phase > 1)
      return    
    this.setState( (p, s) => ({phase: 1}) )
  }

  handleConfirmation = confirmed => _ => {
    this.setState( (p, s) => ({phase: confirmed ? 2:0}) )
  }

  render() {
    const {question, answer} = this.props
    const {phase} = this.state
    
    return (
      <div className="container">
        {phase === 1 && 
          <Confirmation message='Reveal the answer?' accept={this.handleConfirmation(true)} decline={this.handleConfirmation(false)} />}
        <p className="question">{question}</p>
        <div className="btn btn-primary show-answer" onClick={this.handleShowAnswer} disabled={phase === 2} >Show Answer</div>
        {phase === 2 && <p className="answer">{answer}</p>}
      </div>
    )
  }
}

export class QuestionList extends React.Component { 
  render() {
    const {questions} = this.props
    if (!questions)
      return null

    return (
      <div>
        {questions.map((item, i) => <QuestionContainer key={i} {...item} />)} 
      </div>
    )
  }
}
