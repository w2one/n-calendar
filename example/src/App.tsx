import * as React from "react";
import { hot } from "react-hot-loader";
import { Calendar } from "../../src";

function Item(props: any) {
    return (
        <div
            style={
                props.data[props.dayItem.date]
                    ? {
                        color: "red"
                    }
                    : null
            }
        >
            {props.dayItem.day}
        </div>
    );

    // return <div style={props.dayItem.weekday === 0 || props.dayItem.weekday === 6 ? {
    //     color: '#999'
    // } : null}> {props.dayItem.day}</div >
}

function App() {
    const [data, setData] = React.useState({});

    React.useEffect(() => {
        setTimeout(() => {
            setData({
                "2019-10-1": { name: "jay" },
                "2019-10-2": { name: "jay" }
            });
        }, 1000);
    }, []);

    function fnCallbacka(day: Date | string) {
        setTimeout(() => {
            setData({
                "2019-11-1": { name: "jay" },
                "2019-11-2": { name: "jay" },
                "2019-11-3": { name: "jay" }
            });
        }, 1000);
    }

    return (
        <Calendar
            data={data}
            firstWeek={1}
            component={Item}
            currentDay={"2019-10-10"}
            callback={fnCallbacka}
        />
    );
}

export default hot(module)(App);
