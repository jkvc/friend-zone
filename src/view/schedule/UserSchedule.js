import React, {Component} from 'react';
import AddCourse from './AddCourse'
import ReactDOM from 'react-dom';

class UserSchedule extends Component{

    constructor(props){
        super(props);
        this.title = "UserSchedule.js";
    }

    goto_AddCourse(){
        ReactDOM.render(<AddCourse />, document.getElementById('main-layout'));
    }

    render(){
        return(

            <div align={'center'}>

                <img src={"https://res.cloudinary.com/teepublic/image/private/s--8-dGDDZg--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1470902298/production/designs/627022_1.jpg"}
                     alt={""} width={"300"}/>
                <h1>{this.title}</h1>

                <button onClick={this.goto_AddCourse.bind(this)}>Add course</button>

                <h4>いつでもダラダラしたいなぁ...</h4>
                <h4>いつでもダラダラしたいなぁ...</h4>
                <h4>いつでもダラダラしたいなぁ...</h4>
                <h4>いつでもダラダラしたいなぁ...</h4>
                <h4>いつでもダラダラしたいなぁ...</h4>
                <h4>いつでもダラダラしたいなぁ...</h4>
                <h4>いつでもダラダラしたいなぁ...</h4>
                <h4>いつでもダラダラしたいなぁ...</h4>
                <h4>いつでもダラダラしたいなぁ...</h4>
                <h4>いつでもダラダラしたいなぁ...</h4>
                <h4>いつでもダラダラしたいなぁ...</h4>
                <h4>いつでもダラダラしたいなぁ...</h4>
                <h4>いつでもダラダラしたいなぁ...</h4>
                <h4>いつでもダラダラしたいなぁ...</h4>
                <h4>いつでもダラダラしたいなぁ...</h4>
                <h4>いつでもダラダラしたいなぁ...</h4>
                <h4>いつでもダラダラしたいなぁ...</h4>
                <h4>いつでもダラダラしたいなぁ...</h4>
                <h4>いつでもダラダラしたいなぁ...</h4>
                <h4>いつでもダラダラしたいなぁ...</h4>
                <h4>いつでもダラダラしたいなぁ...</h4>
                <h4>いつでもダラダラしたいなぁ...</h4>
                <h4>いつでもダラダラしたいなぁ...</h4>
                <h4>いつでもダラダラしたいなぁ...</h4>
                <h4>いつでもダラダラしたいなぁ...</h4>
                <h4>いつでもダラダラしたいなぁ...</h4>


            </div>

        )
    }
}

export default UserSchedule;