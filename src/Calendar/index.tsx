/**
 * @author Jay
 * @date 2019-11-10
 * @description calendar
 */

import * as React from "react";
import { genereateCalendar } from "../utils";
import "./style";

const weeksStr = ["日", "一", "二", "三", "四", "五", "六"];

interface IProps {
    data: object;
    currentDay?: Date | String;
    firstWeek?: number;
    component?: any;
    callback?: Function;
}

/**
 * 日历
 * IProps 日期
 */
export class Calendar extends React.Component<IProps, any> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            days: [],
            currentDay: props.currentDay || new Date(),
            weeks: [0, 1, 2, 3, 4, 5, 6] // 星期
        };
    }

    // static getDerivedStateFromProps(props: any, state: any) {
    //     console.log('getDerivedStateFromProps', props, state)
    // }

    componentDidMount() {
        const { firstWeek } = this.props;
        let { weeks, currentDay } = this.state;
        const days = genereateCalendar(firstWeek, currentDay);
        weeks = weeks.concat(weeks.splice(0, firstWeek));
        this.setState({ days, weeks });
    }

    fnChangeMonth = (e: any) => {
        let { currentDay } = this.state;
        const { firstWeek, callback } = this.props;
        currentDay = new Date(currentDay)
        if (e.target.dataset.flag === 'prev') {
            currentDay.setMonth(currentDay.getMonth() - 1)
        } else {
            currentDay.setMonth(currentDay.getMonth() + 1)
        }
        const days = genereateCalendar(firstWeek, currentDay);
        this.setState({ currentDay, days })

        // callback
        callback && callback(currentDay)

    }

    render() {
        let { days, weeks, currentDay } = this.state;
        currentDay = new Date(currentDay);
        const { component: Component, data } = this.props;
        return (
            <div className="calender">
                <div className="title">
                    <span onClick={this.fnChangeMonth} data-flag='prev'>&lt;</span>
                    <span className='currentDay'>{currentDay.getFullYear() + '-' + (currentDay.getMonth() + 1)}</span>
                    <span onClick={this.fnChangeMonth} data-flag='next'>&gt;</span>
                </div>
                {/* week */}
                <div className="week">
                    {weeks &&
                        weeks.map((item: number, index: number) => (
                            <div key={index}>{weeksStr[item]}</div>
                        ))}
                </div>
                {/* days */}
                <div className="content">
                    {days &&
                        days.map(
                            (item: { day: React.ReactNode }, index: string | number) => (
                                <div key={index} className="item">
                                    {Component ? <Component day={item.day} dayItem={item} data={data} /> : item.day}
                                </div>
                            )
                        )}
                </div>
            </div>
        );
    }
}

export default Calendar;
