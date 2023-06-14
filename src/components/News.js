import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
// import InfiniteScroll from 'react-infinite-scroll-component'
const News=(props)=>{
const[articles,setArticles]=useState([])
const[loading,setLoading]=useState(true)
const[page,setPage]=useState(1)
const[totalArticles,settotalArticles]=useState(0)
// document.title=`${props.category[0].toUpperCase() + props.category.substr(1)}-News24`

  const update=async()=>
  {
    setLoading(true)
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data=await fetch(url)
    let parsedData=await data.json()
    // console.log(parsedData)
    setArticles(parsedData.articles)
    setLoading(false)
    settotalArticles(parsedData.totalResults)
  }
  useEffect(() => {
    update();
  }, [])
  
  const handleNextClick=async ()=>{
      setPage(page+1)
      update()
  }
  const handlePreviousClick=async()=>{ 
    setPage(page-1)
    update()
  }
    return (
      <div className="container my-3 " >
        <div className="headline text-center">
        <h1>News24 Top {props.category[0].toUpperCase() + props.category.substr(1)} Headlines</h1>
        </div>
        {loading && <Spinner/>}
        <div className='row'>
        {articles.map((element)=>{
          return <div className='col-md-3 ' key={element.url}>
            <NewsItem  title={element.title?element.title:" "} description={element.description?element.description:" "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} dates={element.publishedAt} />
          </div>
          })}
        </div>
        <div className="d-flex justify-content-between">
        <button disabled={page<=1 } type="button" className="btn btn-dark" onClick={handlePreviousClick}>&larr; Previous</button>
        <button disabled={page>=Math.ceil(totalArticles/props.pageSize)} type="button" className="btn btn-dark mx-3" onClick={handleNextClick}>Next &rarr;</button>
        </div>

      </div>
    )
  }

News.defaultProps={
  country:"in",
  pageSize:8,
  category:'general'
}

News.propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
}

export default News