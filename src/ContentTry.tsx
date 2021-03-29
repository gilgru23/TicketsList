import * as React from 'react'
import './App.scss';

interface IProps {
  text: string
  id:string
}

export type AppState = {
  isOverflow:boolean
  show:string
  contentStatus:string
  element:HTMLDivElement|null
}

export class Content extends React.Component<IProps,AppState > {

  constructor(props: IProps) {
    super(props);
    this.state = {
      isOverflow: false,
      show:"more",
      contentStatus:'-hidden',
      element:null
    };
  }

  
  componentDidMount() {
    const span = this.span
    this.setState({ isOverflow: this.isOverflown(span) });
  }

  span:HTMLDivElement | null = null
  isOverflown(element:HTMLElement | null) {
      if(element){
        return element.scrollHeight > element.clientHeight 
        || element.scrollWidth > element.clientWidth;
      }
      else{
        return false
      }
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

    checkOverflow = () =>{
      return this.isOverflown(document.getElementById(this.props.id))
    }


    render() {
      var isOverflow = false
      return (

        
				<div>
				<div className={`content${this.state.contentStatus}` } ref={ref => (this.span = ref)}>
          {this.props.text}
        </div>
        <div>
					{
               this.state.isOverflow ?
						 <button onClick = {() => this.toggleShow()}>{`show ${this.state.show}`}</button>
             :
             null
					}
        </div>
				</div>
         
      );
    }
  }

  export default Content;