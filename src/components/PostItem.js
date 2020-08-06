import React from 'react';
import Authors from "./Authors";
import styled from "styled-components";

const PostItem = ({posts, users}) => {
    return (
        <Posts>
            {
                posts.map((item) => {
                    return (
                        <Item key={item.id}>
                            <ItemWrap>
                                <ItemHeading>{item.title}</ItemHeading>
                                <ItemText>{item.body}</ItemText>
                                <Authors postUserId={item.userId} users={users}/>
                            </ItemWrap>
                        </Item>
                    )
                })
            }
        </Posts>

    )
}

export default PostItem;

const Posts = styled.div`
    display:flex;
    flex-wrap:wrap;
`

const Item = styled.div`
    flex-basis: 50%;
    padding: 0 16px;
    margin-bottom: 24px;
    box-sizing: border-box;
`

const ItemWrap = styled.div`
    display:flex;
    flex-direction:column;
    height: 100%;
    padding: 0 16px 24px;
    border: 1px solid grey;
    box-sizing: border-box;
    border-radius: 4px;
`

const ItemText = styled.div`
    padding-bottom: 24px;
    margin-bottom: 24px;
    border-bottom:1px solid grey;
    flex-grow: 1;
`

const ItemHeading = styled.h2`
    font-size: 20px;
    text-transform: uppercase;
`
