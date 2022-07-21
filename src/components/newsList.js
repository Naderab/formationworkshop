
import News from './news';
import { Col } from 'antd';
import { Row } from 'antd';
function NewsList({ news,updateNews,deleteNews }) {
  return (
    news &&
    news.map((e, index) => {
      return (
         <Col span={8}>
        <News key={index} {...e}  updateNews={updateNews} deleteNews={deleteNews}/>
        </Col>
        
      );
    })
  );
}

export default NewsList;
