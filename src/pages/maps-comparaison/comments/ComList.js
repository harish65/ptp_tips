import React, {useEffect, useState} from 'react';
import "../table-fixed-header.css";

// import actions from '../../../../redux/actions/venuesActions';


export const ComList = (props) => {

    const [comments, setComments] = useState([]);
    const [title, setTitle] = useState("No comments for this venue");

    useEffect(() => {
        setComments(props.comments.venueCmts);
        settingTitle(props.comments.venueCmts);

    }, []);

    const settingTitle = (vcs) => {
        for(let i = 0; i < vcs.length; i++)
        {
            setTitle(vcs[i]["venue_fullName"]);
            break;
        }
    }



    return (
        <div className="container-fluid">
            <h4 className={"text-dark"}>{title}</h4>
            <div style={{overflow: 'scroll', height: '400px', width: '100%'}}>
                <table className={"table-sm table-bordered text-dark table-wrapper"}>
                    <thead className={"text-white"}>
                        <tr>
                            <th>Dist.</th>
                            <th>First Turn</th>
                            <th>Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                    {comments.map((item)=>{
                        return(
                            <tr key={item.venue_comment_id}>
                                <td style={{fontWeight: 'bold'}}>{item.distance}</td>
                                <td style={{fontWeight: 'bold'}}>{item.first_turn}</td>
                                <td style={{fontWeight: 'bold'}}>{item.race_comment}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ComList;
