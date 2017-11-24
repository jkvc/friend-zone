import React, {Component} from 'react';
import './Loading.css'

class loading extends Component {

  
  render() {
	return(
		<div>
  			<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.4.1/react.js"></script>
    		<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.4.1/react-dom.js"></script>

			<div id="root"></div>

				<div class="sk-cube-grid">
  				<div class="sk-cube sk-cube1"></div>
  				<div class="sk-cube sk-cube2"></div>
  				<div class="sk-cube sk-cube3"></div>
  				<div class="sk-cube sk-cube4"></div>
  				<div class="sk-cube sk-cube5"></div>
  				<div class="sk-cube sk-cube6"></div>
  				<div class="sk-cube sk-cube7"></div>
  				<div class="sk-cube sk-cube8"></div>
  			<div class="sk-cube sk-cube9"></div>
			</div>
		</div>
	)
  }
}
export default loading;