import React, { ChangeEvent } from 'react';
import './App.scss';
import {createApiClient, Ticket} from './api';




const api = createApiClient();

export type AppState = {
    title:string,
    content:string,
    email:string
    labels:string
    showError:boolean,
    msgShown:string,
    showSucc:boolean
}


export class AddTicket extends React.PureComponent<{}, AppState> {

    state: AppState = {
		title: '',
		content:'',
		email:'',
        labels:'',
        showError: false,
        showSucc:false,
        msgShown:''
	}

    handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({title: event.target.value})
      }

    handleContentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({content: event.target.value})
      }

    handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({email: event.target.value})
    }

    handleLabelsChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({labels: event.target.value})
        }

    togglePop = () => {
        this.setState({
        showError: false,
        showSucc:false
        });
    };

    popMsg = (status:string) => {
        return(
            <div className={`ui ${status} message`}>
            <div className="header">{
             `Adition Has Been ${status==='success' ? "Completed" : "Failed"}` 
            }</div>
            <p>{this.state.msgShown}</p>
          </div>

        )

    }






    handleSubmit(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const {title,content,email,labels} = this.state
        const create_UUID = () =>{
            var dt = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (dt + Math.random()*16)%16 | 0;
                dt = Math.floor(dt/16);
                return (c==='x' ? r :(r&0x3|0x8)).toString(16);
            });
            return uuid;
        }

        const emptyLabels = (labels:string[]) =>{
            return labels.length===1 && labels[0]===''
        }

        const PopError = (msg : string) =>{
            this.setState({showError:true,showSucc:false, msgShown:msg})
        }

        const validateMailAddr = (email:string) =>{
            return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
        } 

        if(email.length===0){
            PopError("The email shouldn't be empty")
        }
        else if(! validateMailAddr(email)){
            PopError("Email address is invalid")
        }
        else if(title.length===0){
            PopError("The title shouldn't be empty")
        }
        else if(content.length===0){
            PopError("The content shouldn't be empty")
        }
        else{
        const labelSperated = labels.split(',')

        const ticketToSend:Ticket ={
            id:create_UUID(),
            title:this.state.title,
            content:this.state.content,
            creationTime:new Date().getTime(),
            userEmail:this.state.email,
            labels: !emptyLabels(labelSperated) ? labelSperated : undefined
        }

        api.addTicket(ticketToSend).then((res) =>{
                this.setState({title:'',content:'',email:'',labels:'',showError:false,showSucc:true,msgShown:"You can see the new ticket in the tickets list"})
            })
            .catch((res) =>{
                this.setState({showError:true,showSucc:false,msgShown:"The operation failed beacause of network issues, please try again"})
            } )
      }
    }


    render(){
        return(
        <div>
        <form className="ui form" onSubmit={(e)=>this.handleSubmit(e)}>
        <div className="field">
          <label>Enter an Email</label>
          <input type="text" name="Email" value={this.state.email} onChange={(e)=>{this.handleEmailChange(e)}}/>
        </div>
        <div className="field">
          <label>Enter a Title</label>
          <input type="text" name="Title" value={this.state.title} onChange={(e)=>{this.handleTitleChange(e)}}/>
        </div>
        <div className="field">
          <label>Enter tags seperated by comma</label>
          <input type="text" name="Labels" value={this.state.labels} onChange={(e)=>{this.handleLabelsChange(e)}}/>
        </div>
        <div className="field">
            <label>Enter a Content</label>
             <textarea value={this.state.content} onChange={(e)=>{this.handleContentChange(e)}}></textarea>
        </div>
        <button className="ui primary button" type="submit">Submit</button>
      </form>
      <div>
      {this.state.showError ? this.popMsg("error") : null}
      {this.state.showSucc ? this.popMsg("success") : null}

      </div>
      </div>
      
        )

    }
}

export default AddTicket;
