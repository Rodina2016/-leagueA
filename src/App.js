import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Search from "./components/Search";
import PostItem from "./components/PostItem";
import {Container, Wrapper} from "./styles/common";

function App() {

    const [posts, setPosts] = useState([]);
    const [constPosts, setConstPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState(true);
    const [successRequest, setSuccessRequest] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const usersData = await axios(
                'https://jsonplaceholder.typicode.com/users',
            );
            setUsers(usersData.data);

            const postsData = await axios.get(
                'https://jsonplaceholder.typicode.com/posts',
            );

            setPosts(postsData.data);
            setConstPosts(postsData.data);
        };

        fetchData()
            .catch ((e) => {
                setSuccessRequest(false);
                console.error(e.message);
            });

    }, []);

    const handleChange = event => {
       setSearchTerm(event.target.value);

        if(!posts.length) {
            setSearchResults(false);
        }
    };

    useEffect(() => {

        //ищем совпадения в тексте и в заголовке поста
        const resultsPosts = constPosts.filter(item => {
                if(item.body.toLowerCase().includes(searchTerm) || item.title.toLowerCase().includes(searchTerm)) {
                    return item;
                }
            }
        );

        //ищем совпадения в имени или в юзернейме автора
        const resultUsers = users.filter(item => {
            let regExp = new RegExp(searchTerm, 'ig');
            if(item.name.toLowerCase().trim().match(regExp) || item.username.toLowerCase().trim().match(regExp)) {
                return item;
            }
        });

        //находим посты юзеров, имена которых подошли
        const resultPosts2 = [];
        constPosts.map(post => {
            resultUsers.forEach(user => {
                if(user.id === post.userId) {
                    resultPosts2.push(post);
                }
            });
        });

        //объединяем массивы и удаляем дубли постов
        let result = resultsPosts.concat(resultPosts2);
        result = result.filter((item, ind) => {
            return result.indexOf(item) === ind;
        });

        if(searchTerm === '') {
            setPosts(constPosts);
            setSearchResults(true);
        } else {
            setPosts(result);
        }

    }, [searchTerm]);

    let postList;
    let content;
    if(searchResults) {
        postList = <PostItem posts={posts} users={users}/>
    } else {
        postList = <InfoBlock>Ничего не найдено по запросу</InfoBlock>
    }

    if(!successRequest) {
        content = <InfoBlock>Пока нет данных</InfoBlock>
    }

  return (
      <Container>
          <Search handleChange={handleChange} searchTerm={searchTerm}/>
          <Wrapper>
              {postList}
              {content}
          </Wrapper>
      </Container>
  );
}

export default App;

const InfoBlock = styled.div`
    padding: 0 16px;
    box-sizing: border-box;
`


