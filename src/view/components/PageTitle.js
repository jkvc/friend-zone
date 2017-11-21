import React, {Component} from 'react';
import './PageTitle.css'

class PageTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title || "No Title"
        }
    }

    render(){
        return(
            <div>
                <div className="page_title" align="center">
                    <div className="page_title_text">
                        {this.state.title}
                    </div>
                </div>
            </div>
        )
    }

}


export default PageTitle;