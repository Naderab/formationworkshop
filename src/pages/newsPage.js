import { Col, Row, Space, Input,Button } from "antd";
import { useCallback, useState, useEffect } from "react";
import NewsList from "../components/newsList";
import * as api from "../services/news.service";
import { Select } from 'antd';
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const { Search } = Input;

function NewsPage() {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [visibleAdd, setVisibleAdd] = useState(false);

  const [searchValue, setSearchValue] = useState({input:'',category:''});

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const onChange = (value) => {
    setSearchValue({...searchValue,category:value});
  };
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await api.fetchNews();
        setNews(data);
        setLoading(false);
      } catch (error) {
        setIsError(true);
        console.log(error);
      }
      console.log(isError);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await api.fetchCategories();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        setIsError(true);
        console.log(error);
      }
      console.log(isError);
    }
    fetchData();
  }, []);

  const search = async () => {
    console.log(searchValue);
    const searchedNews = news;
    if(searchValue.input.length<0){
    setNews(news.filter(e=>e.category===searchValue.category));
    } else if(searchValue.category.length>0) {
        setNews(news.filter(e=>e.category===searchValue.category && e.title.toLowerCase().includes(searchValue.input.toLowerCase())));
    }else {
        const data = await api.fetchNews();
        setNews(data);
    }
  }
  // useEffect(() => {
  //   async function search(){
  //     try {
  //     setLoading(true);
  //     if (searchValue.length === 0){
  //       setTasks([]);
  //       setLoading(false);
  //     }else {
  //       const newData =  await api.fetchTasksByFilter(searchValue);
  //       setLoading(false);
  //       setTasks(newData);
  //     }

  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   search();
  // }, [searchValue]);

//   useEffect(() => {
//     let didCancel = false;
//     async function search(){
//       try {
//       setLoading(true);
//       if (searchValue.length === 0){
//         setTasks([]);
//         setLoading(false);
//       }else {
//         const newData =  await api.fetchTasksByFilter(searchValue);
//         console.log(didCancel);
//         if (!didCancel){
//           console.log('did not cancel');
//           setTasks(newData);
//           setLoading(false);
//         }
//         setLoading(false);
//         setTasks(newData);
//       }

//       } catch (error) {
//         console.log(error)
//       }
//     }
//     search();
//     return(()=>{console.log(`cleanup ${searchValue}`) ;
//     didCancel = true;});
//   }, [searchValue]);

  //   const addNews = async (title) => {
  //         try {
  //           setLoading(true);
  //           const newTask = await api.addTask({title,});
  //           setTasks([...tasks, newTask]);
  //           setLoading(false);
  //         } catch (error) {
  //           console.log('error')
  //         }
  //       };
        const deleteNews = async (id) => {
          try {
            setLoading(true);
            await api.deleteNews(id);
            setNews(news.filter((news) => news.id !== id));
            setLoading(false);
          } catch (error) {
            console.log('error')
          }
        }
        const updateNews = async (newnews) => {
          try {
            setLoading(true);
            console.log(news)
            const updatedNews = await api.updateNews(newnews.id, newnews);
            console.log(updatedNews)

            setNews(news.map((news) => (news.id === updatedNews.id ? updatedNews : news)));
            setLoading(false);
          } catch (error) {
            console.log(error)
          }
        }

  return (
    <div className="site-card-wrapper">
      <Row>
        <Col span={12}>
          <Space direction="vertical">
            <Search
              placeholder="input search text"
              name="searchValue"
              value={searchValue.input}
              onChange={(e) => setSearchValue({...searchValue,input:e.target.value})}
              enterButton
            />
             <Select
            showSearch
            placeholder="Select a category"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {categories && categories.map((category) =>
                <Option value={category}>{category}</Option>
            )}
            )
          </Select>
          </Space>
         
        </Col>
        <Col>      <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={search}/>
</Col>
      </Row>

      {isError && <p>No data</p>}
      {loading ? (
        <div>loading .....</div>
      ) : (
        <>
          <Row style={{ marginTop: "20px" }}>
          <Col span={24} style={{ marginBottom: "20px" }}>
      <Button type="primary" shape="round" icon={<PlusCircleOutlined />}  size="small" onClick={()=>setVisibleAdd(!visibleAdd)}>
        {visibleAdd ? 'Hide Add' : ' Show Add'}
      </Button>
        </Col> 

                     <NewsList news={news} updateNews={updateNews} deleteNews={deleteNews} />


          </Row>
          {isUpdate && (
      <>
       <Input placeholder="input placeholder" name="newTitle" value={updatedNews.title} onChange={(e)=>setUpdatedNews({...updatedNews,title:e.target.value})}/>
        <Input placeholder="input placeholder" name='newCategory' value={updatedNews.category} onChange={(e)=>setUpdatedNews({...updatedNews,category:e.target.value})}/>
        <Button type="primary" onClick={onFormLayoutChange}>Submit</Button>
        </>
      )}
        </>
      )}
    </div>
  );
}

export default NewsPage;
