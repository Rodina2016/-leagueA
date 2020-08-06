import React from 'react';
import styled from "styled-components";

const Authors = ({postUserId, users}) => {
    return (
        <div>
            {
                users.map((item) => {
                    if(item.id === postUserId) {
                        return (
                            <AuthorsItem key={postUserId}>
                                <div>
                                    <AuthorsItemTitle>author</AuthorsItemTitle>: {item.name}
                                </div>
                                <div>
                                    <AuthorsItemTitle>user name</AuthorsItemTitle>: {item.username}
                                </div>
                            </AuthorsItem>
                        )
                    }
                })
            }
        </div>

    )
}

export default Authors;

const AuthorsItem = styled.div`

`

const AuthorsItemTitle = styled.div`
    display: inline-block;
    font-weight: 600;
`