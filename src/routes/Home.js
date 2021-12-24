import React from 'react';
import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';
import Pagination from 'react-js-pagination';
import MediaQuery from 'react-responsive';
// import Article from '../components/Article/Article';
import '../index.css'
import Pages from '../components/Article/Pages';
import CheckToken from '../functions/CheckToken';
// import HomeNavigation from '../components/Navigation/HomeNavigation';


const instance = axios.create({
    baseURL: '/',
    adapter: cacheAdapterEnhancer(axios.defaults.adapter,
        { enabledByDefault: false })
})


class Home extends React.Component {
    state = {
        isLoading: true,
        articles: [],
        currentPage: 1,
    };

    componentDidMount() {
        this.getArticles();
        this.checkUrlPage();
        CheckToken();
        window.onpopstate = () => {
            const matchParams = this.props.match.params.page;
            if (matchParams === undefined){
                this.setState({currentPage: 1});
            } else {
                this.onChangePage(parseInt(matchParams));
            };
        };
    }

    onChangePage = currentPage => {
        this.setState({currentPage});
    }

    checkUrlPage() {
        const matchParams = this.props.match.params.page;
        if (matchParams === undefined){
            this.setState({currentPage: 1})
        } else {
            this.setState({currentPage: parseInt(matchParams)});
        }
    }

    componentWillUnmount() {
        // 임시방편으로... 
        this.setState = (state, callback) => {
            return;
        };
    }

    componentDidUpdate(){
        //
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
                this.setState({ 
                    articles: articles, 
                    isLoading: false,
                });
            });
    };

    // handleClick = (event) => {
    //     this.setState({
    //         currentPage: parseInt(event.target.id)
    //     });
    //     this.props.history.push(`/${parseInt(event.target.id)}`)
    //     window.scrollTo(0, 0);
    // }
    handleClick(pageNumber) {
        this.setState({currentPage: pageNumber});
        this.props.history.push(`/${parseInt(pageNumber)}`);
        window.scrollTo(0, 0); 
    }

    render() {
        const { isLoading, articles, currentPage } = this.state;

        // // Logic for Pagination
        // const pageNumbers = [];
        // for (let i = 1; i <= Math.ceil(articles.length / 10); i++) {
        //     pageNumbers.push(i);
        // }
        // const renderPageNumbers = pageNumbers.map(number => {
        //     return (
        //         <li
        //             key={number}
        //             id={number}
        //             onClick={this.handleClick}
        //         >
        //             {number}
        //         </li>
        //     );
        // });

        return (
            <section className="container">
                {isLoading ? (
                    <>
                        {/* <HomeNavigation props={this.props} /> */}
                        <div class="animate-pulse text-lg flex min-h-screen">
                            <p class="m-auto">
                                Loading... <br></br>
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        {/* <HomeNavigation props={this.props} /> */}
                        <div class="bg-red-500 md:mt-0 -mt-6 w-full lg:w-256">
                            <Pages page={currentPage} articles={articles} />
                        {/* <div className="articles">
                            {articles.map(article => (
                                <Article key={article.id} id={article.id} name={article.name} title={article.title} published={article.published} link={article.link} comments={article.comments} tags={article.tags} />
                            ))}
                        </div> */}
                        </div>
                        {/* <ul id="page-numbers">
                            {renderPageNumbers}
                        </ul> */}
                        <div className='pagination__desktop'>
                        <MediaQuery minWidth={767}>
                            <Pagination className="pagination"
                                activePage={this.state.currentPage}
                                itemsCountPerPage={15}
                                totalItemsCount={articles.length}
                                pageRangeDisplayed={5}
                                onChange={this.handleClick.bind(this)}
                            />
                        </MediaQuery>
                        </div>
                        <div className='pagination__mobile'>
                        <MediaQuery maxWidth={767}>
                            <Pagination className="pagination"
                                activePage={this.state.currentPage}
                                itemsCountPerPage={15}
                                totalItemsCount={articles.length}
                                pageRangeDisplayed={1}
                                onChange={this.handleClick.bind(this)}
                            />
                        </MediaQuery>
                        </div>
                    </>
                )}
            </section>
        );
    }
}

export default Home;