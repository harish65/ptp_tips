import React from 'react'
import { Table } from 'reactstrap'
import NumberFormat from 'react-number-format';
import moment from 'moment-timezone';

const statsTable = (props) => {
        return (
            <div>
                <Table bordered responsive style={{ backgroundColor: 'white', marginTop: 24 }}>
                    <thead style={{ backgroundColor: "grey", color: 'white', textAlign: 'center' }}>
                        <tr style={{ height: 32 }}>
                            <th>Career</th>
                            <th>Short Form</th>
                            <th>Prize</th>
                            {window.innerWidth > 700 ?
                                <>
                                    <th>Last Run</th>
                                    <th>Last Win</th>
                                    <th>Last Run Winner</th>
                                    <th>Win</th>
                                    <th>Place</th>
                                </> : null}
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center', backgroundColor: 'white' }}>
                        <tr>
                            <td>{props.data?.CAREERSTS}</td>
                            <td>{props.data?.bookie_form}</td>
                            <td><NumberFormat value={props.data?.CAREERPRZ} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                            {window.innerWidth > 700 ? <>
                                <td>{moment(props.data?.last_start).format('DD-MM-YYYY')}</td>
                                <td>{moment(props.data?.last_win).format('DD-MM-YYYY')}</td>
                                <td>{props.data?.last_start === props.data?.last_win ? "Yes" : "No"}</td>
                                <td>{props.data?.WINPERC}%</td>
                                <td>{props.data?.PLACEPERC}%</td>
                            </> : null}
                        </tr>
                    </tbody>
                </Table>

                {window.innerWidth < 700 ? <Table bordered responsive style={{ backgroundColor: 'white', marginTop: 24, borderRadius: 16 }}>
                    <thead style={{ backgroundColor: "grey", color: 'white', textAlign: 'center', width: '34%' }}>
                        <tr>
                            <th>LR</th>
                            <th>LW</th>
                            <th>LRW</th>
                            <th>Win</th>
                            <th>Place</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center', backgroundColor: 'white' }}>
                        <tr>
                            <td>{moment(props.data?.last_start).format('DD-MM-YYYY')}</td>
                            <td>{moment(props.data?.last_win).format('DD-MM-YYYY')}</td>
                            <td>{props.data?.last_start === props.data?.last_win ? "Yes" : "No"}</td>
                            <td>{props.data?.WINPERC}%</td>
                            <td>{props.data?.PLACEPERC}%</td>
                        </tr>
                    </tbody>
                </Table> : null}

                <Table bordered responsive style={{ backgroundColor: 'white', marginTop: 24 }}>
                    <thead style={{ backgroundColor: "grey", color: 'white', textAlign: 'center', width: '34%' }}>
                        <tr>
                            <th>Firm</th>
                            <th>Good</th>
                            <th>Soft</th>
                            <th>Heavy</th>
                            <th>Synth</th>
                            {window.innerWidth > 700 ? <>
                                <th>Group 1</th>
                                <th>Group 2</th>
                                <th>Group 3</th>
                            </> : null}
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center', backgroundColor: 'white' }}>
                        <tr>
                            <td>{props.data?.FIRMSTAT}</td>
                            <td>{props.data?.GOODSTAT}</td>
                            <td>{props.data?.SOFTSTAT}</td>
                            <td>{props.data?.HEAVYSTAT}</td>
                            <td>{props.data?.SYNTHSTAT}</td>
                            {window.innerWidth > 700 ? <>
                                <td>
                                    {props.data?.group1?.runs}:
                                {props.data?.group1?.fst}-
                                {props.data?.group1?.scnd}-
                                {props.data?.group1?.thrd}
                                </td>
                                <td>
                                    {props.data?.group2?.runs}:
                                {props.data?.group2?.fst}-
                                {props.data?.group2?.scnd}-
                                {props.data?.group2?.thrd}
                                </td>
                                <td>
                                    {props.data?.group3?.runs}:
                                {props.data?.group3?.fst}-
                                {props.data?.group3?.scnd}-
                                {props.data?.group3?.thrd}
                                </td>
                            </> : null}
                        </tr>
                    </tbody>
                </Table>

                {window.innerWidth < 700 ? <Table bordered responsive style={{ backgroundColor: 'white', marginTop: 24 }}>
                    <thead style={{ backgroundColor: "grey", color: 'white', textAlign: 'center' }}>
                        <tr style={{ height: 32 }}>
                            <th>Group 1</th>
                            <th>Group 2</th>
                            <th>Group 3</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center', backgroundColor: 'white' }}>
                        <tr>
                            <td>
                                {props.data?.group1?.runs}:
                                {props.data?.group1?.fst}-
                                {props.data?.group1?.scnd}-
                                {props.data?.group1?.thrd}
                            </td>
                            <td>
                                {props.data?.group2?.runs}:
                                {props.data?.group2?.fst}-
                                {props.data?.group2?.scnd}-
                                {props.data?.group2?.thrd}
                            </td>
                            <td>
                                {props.data?.group3?.runs}:
                                {props.data?.group3?.fst}-
                                {props.data?.group3?.scnd}-
                                {props.data?.group3?.thrd}
                            </td>
                        </tr>
                    </tbody>
                </Table> : null}

                {window.innerWidth < 700 ? <Table bordered responsive style={{ backgroundColor: 'white', marginTop: 24 }}>
                    <thead style={{ backgroundColor: "grey", color: 'white', textAlign: 'center' }}>
                        <tr style={{ height: 32 }}>
                            <th>1st Up</th>
                            <th>2nd Up</th>
                            <th>3rd Up</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center', backgroundColor: 'white' }}>
                        <tr>
                            <td>
                                {props.data?.firstup}
                            </td>
                            <td>
                                {props.data?.secondup}
                            </td>
                            <td>
                                {props.data?.thirdUp}
                            </td>
                        </tr>
                    </tbody>
                </Table> : null}


                <Table bordered responsive style={{ backgroundColor: 'white', marginTop: 24 }}>
                    <thead style={{ backgroundColor: "grey", color: 'white', textAlign: 'center', width: '34%' }}>
                        <tr>
                            {window.innerWidth > 700 ? <>
                                <th>First Up</th>
                                <th>Second Up</th>
                                <th>Third Up</th>
                            </> : null}

                            <th>As FAV</th>
                            <th>As PTP</th>
                            <th>Clockwize</th>
                            <th>A-Clockwize</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center', backgroundColor: 'white' }}>
                        <tr>
                            {window.innerWidth > 700 ? <>
                                <td>
                                    {props.data?.firstup}
                                </td>

                                <td>
                                    {props.data?.secondup}
                                </td>

                                <td>
                                    {props.data?.thirdUp}
                                </td>
                            </> : null}

                            <td>
                                {props.data?.is_fav.runs}:
                                {props.data?.is_fav.fst}-
                                {props.data?.is_fav.scnd}-
                                {props.data?.is_fav.thrd}
                            </td>
                            <td>
                                {props.data?.ptpStats.runs}:
                                {props.data?.ptpStats.won}-
                                {props.data?.ptpStats.second}-
                                {props.data?.ptpStats.third}
                            </td>
                            <td>
                                {props.data?.is_clockwise.runs}:
                                {props.data?.is_clockwise.fst}-
                                {props.data?.is_clockwise.scnd}-
                                {props.data?.is_clockwise.thrd}
                            </td>
                            <td>
                                {props.data?.is_not_clockwise.runs}:
                                {props.data?.is_not_clockwise.fst}-
                                {props.data?.is_not_clockwise.scnd}-
                                {props.data?.is_not_clockwise.thrd}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
}

export default statsTable

