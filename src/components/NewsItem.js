import React from 'react'

const NewsItem=(props)=> {

    let {title,description,imageUrl,newsUrl,author,dates}=props
    return (
      <div className='my-4 justify-content-around'>
        <div className="card " >
        <img src={imageUrl?imageUrl:"https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg"}className="card-img-top"alt="https://neurosciencenews.com/files/2023/06/anogonosia-psychology-neurosicnes.jpg" style={{height:"10rem"}}/>
        <div className="card-body my-3 ">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author?author:"unknown"} on {new Date(dates).toGMTString()}</small></p>
            <a href={newsUrl} target='blank' className="btn btn-sm btn-dark">Read More</a>
        </div>
        </div>
      </div>
    )
  }


export default NewsItem
