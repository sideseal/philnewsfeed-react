import React from 'react';
import axios from 'axios';
import Article from '../components/Article';
import CheckToken from '../functions/CheckToken';

class Home extends React.Component {
    state = {
        isLoading: true,
        articles: [],
        nickname: '',
    };

    getArticles = async () => {
        await axios.get("https://vvoary23fi.execute-api.ap-northeast-2.amazonaws.com/default/getPhilArticle")
        .then(resp => {
            const articles = resp.data.body;
            const sortedArticles = articles.sort((a, b) => new Date(b.published) - new Date(a.published));
            const nickname = window.localStorage.getItem('nickname')
            this.setState({ articles: sortedArticles, isLoading: false, nickname:nickname })
        });
    };

    // checkToken = async (info,...props) => {
    //     const token = info.config.headers.Authorization;
    //     console.log(props[0])
    //     if (token) {
    //         await axios.get("https://7c42fzd3b1.execute-api.ap-northeast-2.amazonaws.com/default/checkToken", { params: { token: token } })
    //         .then(resp => {
    //             const jwt = require("jsonwebtoken");
    //             const secret = resp.data.body;
    //             jwt.verify(token, secret, function (err, decoded) {
    //                 if (err) {
    //                     alert(err);
    //                     console.log(err);
    //                 } else {
    //                     const nickname = decoded.nickname;
    //                     console.log(nickname);
    //                     props[0].setState({ nickname: nickname })
    //                 }
    //             })    
    //         })
    //     }
    // }


  

    componentDidMount() {
        CheckToken();
        this.getArticles();
    }

    render() {
        const { isLoading, articles, nickname } = this.state;
        return (
            <section className="container">
                {isLoading ? (
                    <div className="loader">
                        <span className="loader__text">Loading...</span>
                    </div>
                ) : (
                    <>
                    {nickname ? (
                        <div className="nickname">Welcome, {nickname}</div>
                    ) : (
                        <div className="nickname">Please Login</div>
                    )}
                    <div className="articles">
                        {articles
                        .map(article => (
                            <Article key={article.id} id={article.id} name={article.name} title={article.title} published={article.published} link={article.link} comments={article.comments} />
                        ))}
                    </div>
                    </>
                )}
            </section>
        );
    }
}

export default Home;