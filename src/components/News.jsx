import React, { useState } from 'react';
import {Select, Typography, Row, Col, Avatar, Card} from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

import Loader from './Loader';
const {Text, Title} = Typography;
const { Option } = Select;

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = (simplified) => {
  const {newsCategory,setNewsCategory} = useState('Cryptocurrency')
  const { data: cryptoNews} = useGetCryptoNewsQuery({newsCategory: 'Cryptocurrency', count: simplified ? 6 : 12})
  const { data } = useGetCryptosQuery(100);
  
 if (!cryptoNews?.articles) return <Loader/>;

  return (
    <Row gutter = {[24, 24]}>
      {!simplified && (
        <Col span ={24}>
          <Select showSearch
          className="select-news"
          placeholder ="Select a Crypto"
          optionFilterProp="items"
          onChange = {(value) => setNewsCategory(value)}
          filterOption= {(input, option) => option.items.toLowerCase().indexOf(input.toLowerCase())>= 0 }>

          <Option value = "Cryptocurrency">Cryptocurrency</Option>
          {data?.data?.coins.map((coin) => <Option value ={coin.name}>{coin.name}</Option>)}
          </Select>
        </Col>
      )}
      {cryptoNews.articles.map((article, i)=>(
        <Col xs = {24} sm = {12} lg = {8} key = {i}>
          <Card hoverable className = "news-card">
            < a href = {article.url} target = "blank" rel = "noreferrer">
              <div className = "news-image-container">
                <Title className = "news-title" level = {4}>{article.title}</Title> 
                <img style={{maxWidth: '200px', maxHeight: '100px'}} src = {article?.urlToImage || demoImage} alt = "news"/>
              </div>
              <p>
                {article.description > 100 
                ?`${article.description.substring(0, 100)}...`
                : article.description }
              </p>
              <div className = "provider-container">
                <div>
                  {/* <Avatar src = {article.provider[0]?. image?. thumbnail?. contentUrl || demoImage} alt="news"/> */}
                  <Text className = "provider-name"> {article.author?.name}</Text>
                 
                </div>
                <Text>{moment (article.publishedAt).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>



        </Col>
      ))}
    </Row>
  )
}

export default News