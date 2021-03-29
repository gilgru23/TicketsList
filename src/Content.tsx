import * as React from 'react'
import './App.scss';

interface IProps {
  text: string
}

export type AppState = {
    isOverflow:boolean,
    show:string,
    contentStatus:string

}

export class Content extends React.Component<IProps,AppState > {
    NUM_OF_LETTERS =418 // calculated by hand

  constructor(props: IProps) {
    super(props);
    this.state = {
      isOverflow: this.props.text.length>this.NUM_OF_LETTERS,
      show:'more',
      contentStatus:'-hidden'
    };
  }



    toggleShow = () =>
    {
      if(this.state.show==='more'){
        this.setState({show:'less',contentStatus:''})
      }
      else{
        this.setState({show:'more',contentStatus:'-hidden'})
      }
    }


    render() {
      return (

        
		<div>
			<div className={`content${this.state.contentStatus}` } >
                {this.props.text}
      </div>
        <div>
            {this.state.isOverflow ?
             <button className="ui button" onClick = {() => this.toggleShow()}>{`see ${this.state.show}`}</button>
              :
              null
            }
        </div>
	  </div>
         
      );
    }
  }

  export default Content;