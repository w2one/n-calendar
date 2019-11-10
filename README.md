# n-calendar

## install

```
npm install n-calendar -S
yarn add n-calendar
```

## how to use

```
import React, { Component } from "react";
import { Calendar } from "n-calendar";
import "n-calendar/lib/index.css";

function Item(props) {
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
}

export class Demo extends Component {
  render() {
    const data = {
      "2019-11-1": { name: "jay" },
      "2019-11-2": { name: "jay" }
    };
    return (
      <div>
        <Calendar
            data={data}
            firstWeek={1}
            component={Item}
        />
      </div>
    );
  }
}

export default Demo;
```
