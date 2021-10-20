import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { cacheAdapterEnhancer } from 'axios-extensions';
import Pagination from 'react-js-pagination';
import Article from '../components/Article/Article';
import CheckToken from '../functions/CheckToken';
import HomeNavigation from '../components/Navigation/HomeNavigation';


const instance = axios.create({
    baseURL: '/',
    adapter: cacheAdapterEnhancer(axios.defaults.adapter,
        { enabledByDefault: false }),
})


class Home extends React.Component {
    state = {
        isLoading: true,
        articles: [],
        nickname: '',
    };

    componentDidMount() {
        this.getArticles();
        const currentPage = window.sessionStorage.getItem('currentPage')
        this.props.history.push(`/page/${currentPage}`);
        const token = window.localStorage.getItem('Token');
        CheckToken(token);
    }

    componentWillUnmount() {
        // 임시방편으로... 
        this.setState = (state, callback) => {
            return;
        };
    }

    componentDidCatch(error, info) {
        console.error(error, info);
        alert(error, info);
    }


    getArticles = async () => {
        await instance.get("https://vvoary23fi.execute-api.ap-northeast-2.amazonaws.com/default/getPhilArticle",
            { forceUpdate: this.props.history.action === 'POP', cache: true })
            .then(resp => {
                // CheckToken(resp.config.headers.Authorization);
                const articles = resp.data.body;
                // const sortedArticles = articles.sort((a, b) => new Date(b.published) - new Date(a.published));
                const nickname = window.localStorage.getItem('nickname')
                this.setState({ articles: articles, isLoading: false, nickname: nickname });
            });
        
        let val = window.sessionStorage.getItem('currentPage')
        if (!val) {
            window.sessionStorage.setItem('currentPage', 1);
        }
    };

    handlePageClick = (event) => {
        // this.setState({
        //     currentPage: Number(event.target.textContent)
        // });
        // this.setState({currentPage: event})
        window.sessionStorage.setItem('currentPage', event)
        this.props.history.push({
            pathname: `/page/${event}`,
        });
    }

    render() {
        const { isLoading, articles, nickname } = this.state;

        // 뒤로가기 기능 구현
        if (this.props.history.action === "POP") {
            let val = Number(window.sessionStorage.getItem('currentPage'));
            window.sessionStorage.setItem('currentPage', val - 1);
            // this.props.history.push({
            //     pathname: `/page/${val-1}`
            // });
            return <Redirect push to={`/page/${val - 1}`} />
        }

        if (Number(window.sessionStorage.getItem('currentPage')) <= 0) {
            window.sessionStorage.setItem('currentPage', 1);
            window.location.reload();
        }

        const currentPage = Number(window.sessionStorage.getItem('currentPage'))
        const perPage = 10;
        const indexOfLast = currentPage * perPage;
        const indexOfFirst = indexOfLast - perPage;
        const currentArticles = articles.slice(indexOfFirst, indexOfLast);

        const renderArticles = currentArticles.map(article => {
            return <Article
                key={article.id}
                id={article.id}
                name={article.name}
                title={article.title}
                published={article.published}
                link={article.link}
                comments={article.comments}
            />
        })

        // const pageNumbers = [];
        // for (let i = 1; i <= Math.ceil(articles.length / perPage); i++) {
        //     pageNumbers.push(i);
        // }

        // const renderPageNumbers = pageNumbers.map(number => {
        //     return (
        //         <li
        //             key={number}
        //             id={number}
        //             onClick={this.handlePageClick}
        //         >
        //             <Link to={`${number}`}>{number}</Link>
        //         </li>
        //     );
        // });

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
                            {renderArticles}
                            {/* {articles
                        .map(article => (
                            <Article key={article.id} id={article.id} name={article.name} title={article.title} published={article.published} link={article.link} comments={article.comments} />
                        ))} */}
                        </div>
                        <div className="pagination">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={10}
                                totalItemsCount={articles.length}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageClick}
                            />
                            {/* {renderPageNumbers} */}
                        </div>
                    </>
                )}
            </section>
        );
    }
}

export default Home;