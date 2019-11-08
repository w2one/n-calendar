/**
 * @author Jay
 * @date 2019-8-5
 * @description calendar
 */

import * as React from "react";
import { getDaysByMonth } from "../utils";
import "./style";

const weeksStr = ["日", "一", "二", "三", "四", "五", "六"];

/**
 * 构建日历数组
 * @param {*} date
 */
function fnGenereateCalendar(firstWeek = 0, date = new Date()) {
    date = new Date(date);
    // let tempDate = new Date();
    // const day = date.getDate();
    // // 当前时间
    // const tempYear = tempDate.getFullYear();
    // const tempMonth = tempDate.getMonth();
    // const tempDay = tempDate.getDate();
    // // 传入的时间
    // const dataYear = date.getFullYear();
    // const dateMonth = date.getMonth();
    // const dateDay = date.getDate();
    let arr = [];

    let weekday2;
    //这个月的第一天是周几 weekday = new Date(date.setDate(1)).getDay();
    weekday2 = (new Date(date.setDate(1)).getDay() + 7 - firstWeek) % 7;
    let weekday = new Date(date.setDate(1)).getDay()

    // 这个月有多少天
    const monthDays = getDaysByMonth(date.getMonth() + 1);
    console.log(monthDays);
    // 构建出数组
    arr = [];
    // 补全前面上个月天数
    for (let i = 0; i < weekday2; i++) {
        arr.push({ day: "" });
    }
    // 构建数据
    for (let i = 1; i <= monthDays; i++) {
        // vo
        const vo = {
            day: i,
            weekday: weekday,
            // today: i === tempDay,
            choose: false
        };
        // 添加进数组
        arr.push(vo);

        weekday++;
        if (weekday == 7) {
            weekday = 0;
        }

    }

    return arr;
}

interface IProps {
    data: Array<object>;
    currentDay?: Date | String;
    firstWeek?: number;
    component?: any;
}

/**
 * 日历
 * IProps 日期
 */
export class Calendar extends React.Component<IProps, any> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            data: [],
            currentDay: props.currentDay || new Date(),
            weeks: [0, 1, 2, 3, 4, 5, 6] // 星期
        };
    }

    componentDidMount() {
        const { firstWeek } = this.props;
        let { weeks, currentDay } = this.state;
        const data = fnGenereateCalendar(firstWeek, currentDay);

        weeks = weeks.concat(weeks.splice(0, firstWeek));
        this.setState({ data, weeks });
    }

    fnChangeMonth = (e: any) => {
        // console.log('flag', e.target.dataset.flag);
        let { currentDay } = this.state;
        const { firstWeek } = this.props;
        currentDay = new Date(currentDay)
        if (e.target.dataset.flag === 'prev') {
            currentDay.setMonth(currentDay.getMonth() - 1)
        } else {
            currentDay.setMonth(currentDay.getMonth() + 1)
        }
        const data = fnGenereateCalendar(firstWeek, currentDay);
        this.setState({ currentDay, data })
    }

    render() {
        let { data, weeks, currentDay } = this.state;
        currentDay = new Date(currentDay);
        const { component: Component } = this.props;
        return (
            <div className="calender">
                <div className="title">
                    <span onClick={this.fnChangeMonth} data-flag='prev'>&lt;</span>
                    <span className='currentDay'>{currentDay.getFullYear() + '-' + (currentDay.getMonth() + 1)}</span>
                    <span onClick={this.fnChangeMonth} data-flag='next'>&gt;</span>
                </div>
                {/* 星期 */}
                <div className="week">
                    {weeks &&
                        weeks.map((item: number, index: number) => (
                            <div key={index}>{weeksStr[item]}</div>
                        ))}
                </div>
                {/* 数据 */}
                <div className="content">
                    {data &&
                        data.map(
                            (item: { day: React.ReactNode }, index: string | number) => (
                                <div key={index} className="item">
                                    {Component ? <Component day={item.day} data={item} /> : item.day}
                                </div>
                            )
                        )}
                </div>
            </div>
        );
    }
}

export default Calendar;
