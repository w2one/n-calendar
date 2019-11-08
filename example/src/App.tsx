import * as React from "react";
import { hot } from "react-hot-loader";
import { Calendar } from "../../src";

function Item(props: any) {
    return <div style={props.data.weekday === 0 || props.data.weekday === 6 ? {
        color: '#999'
    } : null}> {props.data.day}</div >
}

function App() {
    return (
        <Calendar
            data={[]}
            firstWeek={1}
            component={Item}
            currentDay={'2019-10-10'}
        />
    );
}

export default hot(module)(App);
