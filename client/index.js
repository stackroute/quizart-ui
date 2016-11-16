class Demo extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={value:''};
    this.handle=this.handle.bind(this);
  }
  handleText(event)
  {
    this.setState({value:event.target.value});
  }
  handle(event)
  {
    alert(this.state.value);
  }
  render(){  
    return(
    <div>
    <h1>HelloWorld</h1>
    <input type="text" value=this.state.value onChange={handleText}/>
    <button type="submit" onClick={handle}>submit</button>
    </div>
    );
}
}
ReactDOM.render(<Demo />,document.getElementById('root'));
