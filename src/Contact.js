import React from 'react';

export default function Contact(props){
    return(
        <div>
            <button onClick={() => {console.log(props.id)}}>
                {`${props.name}`}
            </button>
            <div hidden={props.id !== props.contactClicked}>  
                <p>Name: <label>{`${props.title} ${props.name}`}</label></p>
                <p>Gender: <label>{props.gender}</label></p>
                <p>Email: <label>{props.email}</label></p>
            </div>
        </div>
    );
};