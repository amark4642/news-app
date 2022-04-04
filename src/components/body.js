// import { render } from '@testing-library/react';
import React from 'react';
// import { renderIntoDocument } from 'react-dom/test-utils';
import About from './about';

const URL = "https://inshortsapi.vercel.app/news?category=";
// const testURL = "https://inshortsapi.vercel.app/news?category=all";
// const URL = "https://api.spaceflightnewsapi.net/v3/articles?_limit=10&_start=0";
// const URL = "https://inshortsv2.vercel.app/news?category="
// const URL = "https://newsapi.org/v2/everything?q=&from=2022-03-04&sortBy=publishedAt&apiKey=ffa588cd7d6f42d697f808b601de86fd"

// var newsArray = [10];

var searchWord = "";

class Body extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            items: [],
            pageNo: 0,
            error: false,
            about: false
        }
    }

    fetchNewsss = () => {
        let keyword = document.getElementById("input").value;
        let keywordd = null;
        if (keywordd === keyword) return;
        keywordd = keyword;
        if (keyword == null) keyword = "technology";
        const apiUrl = `https://saurav.tech/NewsAPI/top-headlines/category/${keyword}/in.json`;
        fetch(apiUrl)
            .then(res => {
                // console.log("status "+res.status);
                if (res.status!== 200) {
                    this.setState({ error: true });
                    return;
                }
                return res.json()
            })
            .then((data) => {
                this.setState({ items: data.articles, isLoaded: true, pageNo: 1, error: false, about: false });
            });
    }

    fetchNews = (potato) => {
        console.log(potato);
        // let keywordd = document.getElementById("input").value;
        const apiUrl = `https://saurav.tech/NewsAPI/top-headlines/category/${potato}/in.json`;
        console.log(apiUrl);
        fetch(apiUrl)
            .then(res => res.json())
            .then((data) => {
                this.setState({ items: data.articles, isLoaded: true, pageNo: 1, error: false, about: false });
            });
    }

    componentDidMount() {
        const apiUrl = `https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json`;
        // console.log(apiUrl);
        fetch(apiUrl)
            .then(res => res.json())
            .then((data) => {
                console.log(data.articles);
                this.setState({
                    items: data.articles,
                    isLoaded: true,
                    pageNo: this.state.pageNo + 1,
                });
                // console.log(this.state.items);
            });
    }

    handleNext = () => { this.setState({ pageNo: this.state.pageNo + 1 }) }
    handlePrev = () => { this.setState({ pageNo: this.state.pageNo - 1 }) }
    handleAbout = () => { this.setState({ about: true, error:false }) }

    render() {
        const { items, isLoaded, pageNo, error, about } = this.state;
        if (isLoaded) {
            console.log(isLoaded);
            console.log(items);
            return (
                <>
                    <div className="navbar">
                        <div><h1>My News</h1></div>
                        <div><input id="input" class="temp" placeholder='REACT___________________' /></div>
                        <div><button id="btn" onClick={this.fetchNewsss} class="temp">Search</button></div>
                    </div>
                    <div className='category'>
                        <div onClick={() => { this.fetchNews("technology") }}><strong>Home</strong></div>
                        <div onClick={() => { this.fetchNews("science") }}><strong>Science</strong></div>
                        <div onClick={() => { this.fetchNews("entertainment") }}><strong>Entertainment</strong></div>
                        <div onClick={() => { this.fetchNews("sports") }}><strong>Sports</strong></div>
                        <div onClick={() => { this.fetchNews("business") }}><strong>Business</strong></div>
                        {/* <div onClick={() => { this.fetchNews("entertainment") }}><strong>Entertainment</strong></div> */}
                        <div onClick={this.handleAbout}><strong>About</strong></div>

                    </div>
                    <div className='body'>

                        {about ? null : error ? <h2>No Data Found !!</h2> : <h2 style={{ color: 'yellow' }}><strong>Top Headlines of the Day</strong></h2>}
                        <ul>
                            {about && !error ? <About /> : null}
                            {
                                items.map((i, idx) => {
                                    return (
                                        idx < 10 * pageNo && idx >= 10 * (pageNo - 1) && !about && !error ?
                                            <div className='result'>
                                                <div>
                                                    <h3 style={{ backgroundColor: 'azure', color: 'black', width: '80%', textAlign: 'center', borderRadius: "10px" }}>Author : {i.author == null || i.author.startsWith('https:')? "Unknown" : i.author}</h3>
                                                    <img src={i.urlToImage} alt ="image" /></div>
                                                <div className='content '>
                                                    <h4 style={{ backgroundColor: 'azure', color: 'black', textAlign: 'left', borderRadius: "10px" }}>Date _ Time:- {i.publishedAt}</h4>
                                                    <h3 style={{ backgroundColor: 'azure', color: 'black', paddingLeft: '5px',paddingRight:'5px', borderRadius: "10px" }}>{i.title}</h3>
                                                    {i.description}<br></br>
                                                    <a href={i.url} target='_blank'><button style={{ color: "crimson", fontSize: "14px", borderRadius: "10px" }}>Read full article..</button></a>
                                                </div>
                                            </div> : null
                                    )
                                })
                            }
                        </ul>
                        {(pageNo > 1) ?
                            <>
                                <button
                                    style={{
                                        marginRight: '2rem',
                                        borderRadius: '5px',
                                        backgroundColor: 'blackalmond',
                                        color: 'red'
                                    }}
                                    onClick={this.handlePrev}><strong>Previous Page</strong></button>
                                {pageNo * 10 < items.length ? <button
                                    style={{
                                        marginLeft: '2rem',
                                        borderRadius: '5px',
                                        backgroundColor: 'blackalmond',
                                        color: 'red'
                                    }}
                                    onClick={this.handleNext}><strong>Next Page</strong></button> : null}
                            </> : !error && !about ?
                                <button
                                    style={{
                                        backgroundColor: 'blackalmond',
                                        borderRadius: '5px',
                                        color: 'red'
                                    }} onClick={this.handleNext}><strong>Next Page</strong></button> : null
                        }
                    </div>

                </>
            );
        }
        else {
            return (
                <div className='flashScreen'>
                    <h1><strong>Please wait , News bulletin is loading...</strong></h1>
                </div>
            );
        }
    }
}


export default Body;