import { Col, Row, Space, Input } from "antd";
import { useCallback, useState, useEffect } from "react";
import NewsList from "../components/newsList";
import * as api from "../services/news.service";
import { Select } from 'antd';
const { Option } = Select;

const { Search } = Input;

function NewsPage() {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const onChange = (value) => {
    console.log(`selected ${value}`);
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

  // useEffect(() => {
  //   let didCancel = false;
  //   async function search(){
  //     try {
  //     setLoading(true);
  //     if (searchValue.length === 0){
  //       setTasks([]);
  //       setLoading(false);
  //     }else {
  //       const newData =  await api.fetchTasksByFilter(searchValue);
  //       console.log(didCancel);
  //       if (!didCancel){
  //         console.log('did not cancel');
  //         setTasks(newData);
  //         setLoading(false);
  //       }
  //       //setLoading(false);
  //       //setTasks(newData);
  //     }

  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   search();
  //   return(()=>{console.log(`cleanup ${searchValue}`) ;
  //   didCancel = true;});
  // }, [searchValue]);

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
  //       const deleteNews = async (id) => {
  //         try {
  //           setLoading(true);
  //           await api.deleteTask(id);
  //           setTasks(tasks.filter((task) => task._id !== id));
  //           setLoading(false);
  //         } catch (error) {
  //           console.log('error')
  //         }
  //       }
  //       const updateNews = async (task) => {
  //         try {
  //           setLoading(true);
  //           const updatedTask = await api.updateTask(task._id, task);
  //           console.log(updatedTask)
  //           setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
  //           setLoading(false);
  //         } catch (error) {
  //           console.log('error')
  //         }
  //       }
  const onSearch = (value) => console.log(value);

  return (
    <div className="site-card-wrapper">
      <Row>
        <Col span={12}>
          <Space direction="vertical">
            <Search
              placeholder="input search text"
              name="searchValue"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
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
        <Col></Col>
      </Row>

      {isError && <p>No data</p>}
      {loading ? (
        <div>loading .....</div>
      ) : (
        <>
          <Row style={{ marginTop: "20px" }}>
            <NewsList news={news} />
          </Row>
        </>
      )}
    </div>
  );
}

export default NewsPage;
