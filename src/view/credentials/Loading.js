import React, {Component} from 'react';
import './Loading.css'

class Loading extends Component {


    render() {
        return (
            <div>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.4.1/react.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.4.1/react-dom.js"></script>

                <div id="root"></div>

                <div className="sk-cube-grid">
                    <div className="sk-cube sk-cube1"></div>
                    <div className="sk-cube sk-cube2"></div>
                    <div className="sk-cube sk-cube3"></div>
                    <div className="sk-cube sk-cube4"></div>
                    <div className="sk-cube sk-cube5"></div>
                    <div className="sk-cube sk-cube6"></div>
                    <div className="sk-cube sk-cube7"></div>
                    <div className="sk-cube sk-cube8"></div>
                    <div className="sk-cube sk-cube9"></div>
                </div>
            </div>
        )
    }
}

export default Loading;