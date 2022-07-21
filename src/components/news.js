import { useState } from 'react';
import Meta from 'antd/lib/card/Meta';
import Card from 'antd/lib/card/Card';
import { Button,Typography,Comment,Avatar,Form, Input, Radio } from 'antd';
import { DeleteOutlined, DownCircleOutlined,EditOutlined,UpCircleOutlined } from '@ant-design/icons';
import { Col } from 'antd';
import { Row } from 'antd';


const { Text } = Typography;

function News({title,category,comments,id,deleteNews,updateNews}) {
    const [visibleComments, setVisibleComments] = useState(false);
    const [isUpdate,setIsUpdate] = useState(false);
    const [updatedNews,setUpdatedNews] = useState({title:title,category:category,comments:comments,id:id});

    // const handleUpdateTask = ()=>{
    //     console.log(titleUpdated)
    //     updateTask({id,title:titleUpdated,duration})
    //     setIsUpdated(!isUpdated)
    // }
    const onFormLayoutChange = () => {
        updateNews(updatedNews);
        setIsUpdate(false)

      };
    return ( 
        <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src="https://as2.ftcdn.net/v2/jpg/01/67/74/79/1000_F_167747932_NE1da5cf9FM30QExtlFjbmk9ypItoJl2.jpg" width="200" height="200"/>}
      >
     {isUpdate ? (
      <>
       <Input placeholder="input placeholder" name="newTitle" value={updatedNews.title} onChange={(e)=>setUpdatedNews({...updatedNews,title:e.target.value})}/>
        <Input placeholder="input placeholder" name='newCategory' value={updatedNews.category} onChange={(e)=>setUpdatedNews({...updatedNews,category:e.target.value})}/>
        <Button type="primary" onClick={onFormLayoutChange}>Submit</Button>
        </>
     ) : 
     (
        <Row>
        <Col span={16}>
        <Meta title={title} description={category} />
        </Col>
        <Col style={{ align:'right'}}><DeleteOutlined style={{ color:'red'}} onClick={()=>deleteNews(id)}/> <EditOutlined style={{ color:'blue'}}  onClick={()=>setIsUpdate(!isUpdate)}/> </Col>
      </Row>)} 
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