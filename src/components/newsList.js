
import News from './news';
import { Col } from 'antd';
import { Row } from 'antd';
function NewsList({ news }) {
  return (
    news &&
    news.map((e, index) => {
      return (
         <Col span={8}>
        <News key={index} {...e}  />
        </Col>
        
      );
    })
  );
}

export default NewsList;
