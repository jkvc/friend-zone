import React, {Component} from 'react';
import AddCourse from './AddCourse'
import ReactDOM from 'react-dom';
import CalendarHelper from '../../api/CalendarHelper';

class UserSchedule extends Component{

    constructor(props){
        super(props);
        this.title = "UserSchedule.js";
        this.events = null;
    }

    goto_AddCourse(){
        ReactDOM.render(<AddCourse />, document.getElementById('main-layout'));
    }

    initialize_events()
    {
        var events = [
            {"days":"MWF", "hours":["11:30", "12:30"], "title":"CSE11" },
            {"days":"TuTh", "hours":["10:20", "11:20"], "title":"CSE100"},
            {"days":"MWTu", "hours":["00:10", "11:00"], "title":"Chilling"}
        ];
        this.events = events;
    }

    render(){

        this.initialize_events();

        return(

            <div align={'center'}>

                <img src={"https://res.cloudinary.com/teepublic/image/private/s--8-dGDDZg--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1470902298/production/designs/627022_1.jpg"}
                     alt={""} width={"300"}/>
                <h1>{this.title}</h1>

                <button onClick={this.goto_AddCourse.bind(this)}>Add course</button>

                <br/>

                <CalendarHelper events={this.events}/>

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