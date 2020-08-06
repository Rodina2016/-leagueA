import React from 'react';
import styled from "styled-components";
import {Wrapper} from "../styles/common";

const Search = ({handleChange, searchTerm}) => {

    return (
        <SearchBlock>
            <Wrapper>
                <SearchForm>
                    <SearchInput type="text" placeholder={'search'} value={searchTerm}
                                 onChange={handleChange}/>
                </SearchForm>
            </Wrapper>
        </SearchBlock>
    )
}

export default Search;

const SearchBlock = styled.div`
    background-color: black;
    margin-bottom: 24px;
`

const SearchForm = styled.form`
    padding: 16px;
`

const SearchInput = styled.input`
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid grey;
`