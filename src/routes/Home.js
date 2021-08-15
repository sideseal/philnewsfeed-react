import React from 'react';
import axios from 'axios';
import Article from '../components/Article';

class Home extends React.Component {
    state = {
        isLoading: true,
        articles: []
    };

    getArticles = async () => {
        const { data: { body } } = await axios.get("https://vvoary23fi.execute-api.ap-northeast-2.amazonaws.com/default/getPhilArticle");
        const articles = body
        const sortedArticles = articles.sort((a,b) => new Date(b.published) - new Date(a.published));
        this.setState({ articles: sortedArticles, isLoading: false })
    };

    componentDidMount() {
        this.getArticles();
    }

    render() {
        const { isLoading, articles } = this.state;
        return (
            <section className="container">
                {isLoading ? (
                    <div className="loader">
                        <span className="loader__text">Loading...</span>
                    </div>
                ) : (
                    <div className="articles">
                        {articles
                        .map(article => (
                            <Article key={article.id} id={article.id} name={article.name} title={article.title} published={article.published} link={article.link} />
                        ))}
                    </div>
                )}
            </section>
        );
    }
}

export default Home;