import React from 'react';
import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';
import Pagination from 'react-js-pagination';
import MediaQuery from 'react-responsive';
import { faSearch, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        settingArticles: [],
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
                    settingArticles: articles,
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

    searchItem(query) {
        if (!query) {
            const articles = this.state.articles;
            this.setState({
                settingArticles: articles,
            });
        } else {
            query = query.replace(/\ /g, '').toLowerCase();
            const result = [];
            const data = this.state.articles;
            data.forEach((item) => {
                if (
                    item.title.toLowerCase().indexOf(query) !== -1 ||
                    item.tags.toLowerCase().indexOf(query) !== -1 ||
                    item.name.toLowerCase().indexOf(query) !== -1
                ) {
                    result.push(item);
                }
            });
            this.setState({
                settingArticles: result,
            });
        };
    };

    render() {
        const { isLoading, currentPage, settingArticles } = this.state;

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
                                <FontAwesomeIcon icon={faCircleNotch} spin />
                                &nbsp;
                                Loading... <br></br>
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        {/* <HomeNavigation props={this.props} /> */}
                        <div class="sticky top-0 float-right z-5 w-auto">
                            <i class="absolute text-gray-400 top-1.5 left-4 md:left-6">
                            <FontAwesomeIcon
                            size="sm"
                            icon={faSearch} />
                            </i>
                            &nbsp;
                            <input
                              class="bg-white h-9 px-8 md:px-12 rounded-lg focus:outline-none hover:cursor-pointer"
                              type="text"
                              onChange={(e) => this.searchItem(e.target.value)}
                              placeholder='Search Articles'
                            />
                        </div>
                        <div class="bg-transparent md:mt-0 -mt-6 w-128 md:w-192">
                            <Pages page={currentPage} articles={settingArticles} />
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
                                totalItemsCount={settingArticles.length}
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
                                totalItemsCount={settingArticles.length}
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