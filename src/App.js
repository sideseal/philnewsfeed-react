import React from 'react';
import axios from 'axios';
import Article from './Article';

class App extends React.Component{
  state = {
    isLoading: true,
    articles: []
  };


  getArticles = async() => {
    const {data: {body}} = await axios.get("https://vvoary23fi.execute-api.ap-northeast-2.amazonaws.com/default/getPhilArticle");
    const articles = body
    this.setState({articles, isLoading: false})
  };

  componentDidMount() {
    this.getArticles();
  }

  render() {
    const { isLoading, articles } = this.state;
    return (
      <section class="container">
        {isLoading ? (
          <div class="loader">
            <span class="loader__text">Loading...</span>
          </div>
        ) : (
            <div class="articles">
              {articles.map(article => (
              <Article Key={article.id} id={article.id} name={article.name} title={article.title} published={article.published} link={article.link} />
            ))}
          </div>
          )}
      </section>
    );
  }
}

export default App;
