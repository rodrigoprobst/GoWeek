import React, { Component } from 'react';
import socket from "socket.io-client";
import api from "../services/api";

import twitterLogo from '../twitter.svg';

import Tweet from '../components/Tweet';

import './Timeline.css';

export default class Timeline extends Component {
    state = {
        tweets: [],
        newTweet: "",
    };

    async componentDidMount(){
        this.subscribeToEvents();
        const response = await api.get('tweets');
        this.setState({ tweets: response.data });
    }

    handleInputChange = (event) => {
        this.setState({
            newTweet: event.target.value
        });
    };

    handleNewTweet = async (event) => {
        if (event.keyCode !== 13) return;

        const content = this.state.newTweet;
        const author = localStorage.getItem('@GoTwitter:username');

        await api.post('tweets', { content, author });

        this.setState({ newTweet: '' });
    };

    subscribeToEvents = () => {
        const io = socket('http://localhost:3000');
        io.on('tweet', data => {
            this.setState({ tweets: [data, ...this.state.tweets] });
        });
        io.on('like', data => {
            this.setState({ 
                tweets: this.state.tweets.map(tweet => 
                    tweet._id === data._id ? data : tweet
                )
            });
        });
    };

    render() {
        return (
            <div className="timeline-wrapper">
                <img height={24} src={twitterLogo} alt="GoTwitter" />
                <form onSubmit={this.handleSubmit}>
                    <textarea
                        value={this.state.newTweet}
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleNewTweet}
                        placeholder="O que está acontecendo?"
                    ></textarea>
                </form>
                <ul className="tweet-list">
                    { 
                        this.state.tweets.map(tweet => (
                            <Tweet key={tweet._id} tweet={tweet} />
                        )) 
                    }
                </ul>
            </div>  
    
        );
    }
}
