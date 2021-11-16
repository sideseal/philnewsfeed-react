import React from 'react';
import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';
import Article from '../components/Article/Article';
import CheckToken from '../functions/CheckToken';
import HomeNavigation from '../components/Navigation/HomeNavigation';


const instance = axios.create({
    baseURL: '/',
    adapter: cacheAdapterEnhancer(axios.defaults.adapter,
        { enabledByDefault: false })
})


class Home extends React.Component {
    state = {
        isLoading: true,
        articles: [],
        nickname: '',
    };

    componentDidMount() {
        this.getArticles();
        const token = window.localStorage.getItem('Token');
        CheckToken(token);
    }

    componentWillUnmount() {
        // 임시방편으로... 
        this.setState = (state, callback) => {
            return;
        };
    }

    componentDidUpdate(){
        // console.log('component update')
    }

    componentDidCatch(error, info) {
        console.error(error, info);
        alert(error, info);
    }


    getArticles = async () => {
        await instance.get("https://vvoary23fi.execute-api.ap-northeast-2.amazonaws.com/default/getPhilArticle",
            { forceUpdate: this.props.history.action === 'PUSH', cache: true })
            .then(resp => {
                // CheckToken(resp.config.headers.Authorization);
                const articles = resp.data.body;
                const nickname = window.localStorage.getItem('nickname')
                this.setState({ articles: articles, isLoading: false, nickname: nickname });
            });
    };

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
                        <HomeNavigation />
                        {nickname ? (
                            <div className="nickname">Welcome, {nickname}</div>
                        ) : (
                            <div className="nickname">Please Login</div>
                        )}
                        <div className="articles">
                            {articles.map(article => (
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