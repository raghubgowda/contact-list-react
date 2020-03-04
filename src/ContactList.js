import React, { Component } from 'react';
import Tabs from './Tabs';
import Contact from './Contact';
require('./styles.css');


class ContactList extends Component{
    constructor(props){
        super(props);

        this.state = {
            data: [],
        }
    }

    componentDidMount(){
        fetch('https://randomuser.me/api/?results=100&seed=abc')
        .then(result => {
            return result.json();
        })
        .then(data => {
            let results = [];
            let allUsers = data.results;
            let filteredData = [];
            allUsers.map( a => {
                results.push({
                    title: a.name.title,
                    name: `${a.name.first} ${a.name.last}` ,
                    email: a.email,
                    gender: a.gender
                });
                
                //Sort based on locale
                results.sort((a, b) => {
                    return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });
                });
                
                filteredData = results.reduce((prev, curr) => {
                    if(prev[curr.name[0]] == undefined){
                        prev[curr.name[0]] = [];
                    }

                    prev[curr.name[0]].push(curr);
                    return prev;
                }, []);
            });
            this.setState({
                data: filteredData,
            })
        })
        .catch( e => {console.error(e);});
    }

    render() {
        const {data} = this.state;
        let tabs = [];
        let keys = Object.keys(data);
        let id = 0;
        keys.forEach(key => {
            let tabContent = [];
            let title = <div key={id++} label={`${key} (${data[key].length})`}>{tabContent}</div>;
            let contactId = 0;
            data[key].forEach(contact => {
                const {name, title, email, gender} = contact
                tabContent.push(<Contact name={name} title={title} gender={gender} email={email} id={contactId++}/>);
            });
            tabs.push(title);
        });

        return(
            <div>
                <h1>Contact List</h1>
                <Tabs key={1}>
                    {tabs}
                </Tabs>
            </div>
        );
    }
}

export default ContactList;