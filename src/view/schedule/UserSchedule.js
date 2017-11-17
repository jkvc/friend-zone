import React, {Component} from 'react';
import AddCourse from './AddCourse'
import ReactDOM from 'react-dom';
import CalendarHelper from '../../api/CalendarHelper';
import RecommendedFriends from "../social/RecommendedFriends";

class UserSchedule extends Component{

    constructor(props){
        super(props);
        this.title = "UserSchedule.js";
        this.events = null;
    }

    goto_AddCourse(){
        ReactDOM.render(<AddCourse />, document.getElementById('main-layout'));
    }

    goto_RecommendedFriends(){
        ReactDOM.render(<RecommendedFriends />, document.getElementById('main-layout'));
    }

    initialize_events()
    {
        // Replace this with a DB get and parse the data into this format
        var events = [
            {"days":"MWF", "hours":["1130", "1230"], "title":"A" },
            {"days":"TuTh", "hours":["1020", "1120"], "title":"B"},
            {"days":"MWTu", "hours":["0010", "1100"], "title":"C"},
            {"days":"MTu", "hours":["1030","1800"], "title":"D"}
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
                <button onClick={this.goto_RecommendedFriends.bind(this)}>Recommended Friends</button>

                <br/>

                <CalendarHelper events={this.events}/>

                <h4>いつでもダラダラしたいなぁ...</h4>
                <h4> うまるちゃん！遊びやめてください、手伝いましょう </h4>


            </div>

        )
    }
}

export default UserSchedule;