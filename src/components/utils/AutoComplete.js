import React from 'react';

class AutoComplete extends React.Component {

    constructor(props, context) {
	    super(props, context);

	    this.state = {
	    	data:this.props.data,
            values:[],
            selectedValue:this.props.default || ''
	    }

	    this.handleInput = this.handleInput.bind(this);
	    this.handleAClick = this.handleAClick.bind(this);
	    this.pageClick = this.pageClick.bind(this);
	}

    handleInput(e){
        this.state.selectedValue = e.target.value;
        this.state.values = this.state.data.filter((item) => {
            if(item.includes(e.target.value)){
                    return true;
            }
            return false;
        });
        this.setState(this.state);
    }

    handleAClick(e){
        this.state.selectedValue = e.target.value;
        this.state.values = [];
        this.setState(this.state);
    }

    componentDidMount(){
        document.addEventListener("mousedown",this.pageClick,false);
    }

    pageClick(e){
        var env = e.target;
        if(env === this._input || env===this._popup || env.parentNode === this._popup)
            return;
        this.state.values = [];
        this.forceUpdate();
    }

    componentWillUnmount(){
        document.removeEventListener("mousedown",this.pageClick)
    }

  	render() {
    	var self = this;

	    if(this.props.openPopup){
	        this.state.values = [];
	        this.setState(this.state);
	    }
	        
	    var popups = this.state.values.map(function(value){
	        return (
	            <div href="#" onClick={self.handleAClick} value={value} >{value}
	            </div>
	        );
	    });

        var autocompleteStyle={width:this.props.width};
        var inputStyle = {height:this.props.height};
        var popupStyle = {top:this.props.height};
        var className = 'autocomplete '+this.props.className;

        return (
            <div className={className} style={autocompleteStyle} >
	            <input ref={(c)=>this._input=c} style={inputStyle} value={this.state.selectedValue} onClick={this.handleInput} onChange={this.handleInput} type="text" />
	            <div ref={(c)=>this._popup=c} className="popup" style={popupStyle}>
	            	{popups}
        		</div>
    		</div>
        );
  	}
}

export default AutoComplete;