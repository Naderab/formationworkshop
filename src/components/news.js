import { useState } from 'react';
import Meta from 'antd/lib/card/Meta';
import Card from 'antd/lib/card/Card';
import { Button,Typography,Comment,Avatar } from 'antd';
import { DownCircleOutlined,UpCircleOutlined } from '@ant-design/icons';
import { Col } from 'antd';
import { Row } from 'antd';


const { Text } = Typography;

function News({title,category,comments,_id}) {
    const [visibleComments, setVisibleComments] = useState(false);
    // const handleUpdateTask = ()=>{
    //     console.log(titleUpdated)
    //     updateTask({_id,title:titleUpdated,duration})
    //     setIsUpdated(!isUpdated)
    // }

    return ( 
        <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src="https://as2.ftcdn.net/v2/jpg/01/67/74/79/1000_F_167747932_NE1da5cf9FM30QExtlFjbmk9ypItoJl2.jpg" width="200" height="200"/>}
      >
      <Row>
        <Col span={16}>
        <Meta title={title} description={category} />

        </Col>
      </Row>
      <Row style={{marginTop:'20px'}}>
      <Col span={24}>
      <Button type="primary" shape="round" icon={ visibleComments ? <UpCircleOutlined />  : <DownCircleOutlined/>} size="small" onClick={()=>setVisibleComments(!visibleComments)}>
        Show Comments
      </Button>
        </Col>
      </Row>
      {visibleComments && (
      comments ?(
    <Row>
      <Col span={24}>
      {comments.map((comment)=>(
        <Comment
        key={comment._id}
      author={<a>Nader Abdellaoui</a>}
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
      content={
        <p>
          {comment.text}
        </p>
      }
     
    />
      ))}
     
        </Col>
      </Row>) : ( <Text type="danger">No comments</Text>
)
      
      )}
      </Card>
        );
}

export default News;