import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);


class BasicCalendar extends Component{

    render(){
        return (
            <BigCalendar
                {...this.props}
                events={  [{
                    'title': 'Late Night Event',
                    'start':new Date(2015, 3, 17, 19, 30, 0),
                    'end': new Date(2015, 3, 17, 22, 0, 0)
                },
                    {
                        'title': 'Another',
                        'start': new Date(2015, 3, 17, 20, 0, 0),
                        'end': new Date(2015, 3, 17, 23, 0, 0)
                    }] }
                views={allViews}
                step={60}
                defaultDate={new Date(2015, 3, 1)}
            />
        )
    }
}

export default BasicCalendar;