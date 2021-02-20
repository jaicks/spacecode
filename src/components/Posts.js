import React, { Component, Fragment } from 'react';
import { Container, Grid } from '@material-ui/core'
import axios from 'axios';
import SimpleCard from "./SimpleCard";
import Comment from "./Comments";
import DeleteIcon from '@material-ui/icons/Delete';
import Pagination from '@material-ui/lab/Pagination';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import { Modal } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import SimpleModal from "./Model";


class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postdata: [],
            searchString: "",
            commentData: [],
            selectedPostId: 0,
            isCommentOpen: false,
            page: 1,
            per_page: 10

        }
    }

    componentDidMount() {
        console.log("componentDidMount")
        this.getdata()
     
    }
    getdata = () =>{
        axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then(res => {
            console.log(res)
            this.setState({ postdata: res.data })
        })

    }

    handleSearch = (e) => {
        console.log("search")
        this.setState({ searchString: e.target.value })
    }
    getComment = (id) => {
        this.setState({ selectedPostId: id - 1, isCommentOpen: !this.state.isCommentOpen });
        axios
            .get("https://jsonplaceholder.typicode.com/comments?postId=" + id)
            .then(res => {
                this.setState({ commentData: res.data })
            })
    }
    handleDeletePost = (id) => {
        axios
            .delete("https://jsonplaceholder.typicode.com/posts/" + id)
            .then(res => {
                console.log(res)
                this.setState({})
            })
    }
    filterHandle = () => {
        let currentList = [];
        let newList = [];
        let finalList = [];

        if (this.state.searchString !== "") {
            currentList = this.state.postdata ? this.state.postdata : [];
            newList = currentList.filter(item => {
                const lc = item && item.title ? item.title.toLowerCase() : "";
                const filter = this.state.searchString && this.state.searchString.toLowerCase();
                var datass = lc.includes(filter);
                console.log(datass)
                if (datass) {
                    finalList.push(
                        item
                    );
                }

            });

        }
        else {
            finalList = this.state.postdata ? this.state.postdata : [];
        }
        return finalList;

    }

    handlePagination = (e, value) => {
        this.setState({ page: value })
        
    }

    render() {
        const { selectedPostId, isCommentOpen, commentData } = this.state;
        console.log(selectedPostId, isCommentOpen)
        let filterData = this.filterHandle();
        filterData = filterData && filterData.slice((this.state.page - 1) * this.state.per_page,
            this.state.page * this.state.per_page)
        return (
            <div>
                <Fragment>
                    <div className="search">
                        <input className="search" placeholder="Search by title" onChange={(e) => { this.handleSearch(e) }} />
                        <SimpleModal getdata={this.getdata} />

                    </div>
                    {
                        filterData.length > 0 && (
                            filterData.map((data, index) => {
                                return (
                                    <div className="card">
                                        <SimpleCard
                                            title={data.title}
                                            body={data.body}
                                        />
                                        <DeleteIcon onClick={() => this.handleDeletePost(data.id)}
                                        />
                                        <div className="comment" onClick={() => this.getComment(data.id)}><h4>Comment</h4></div>
                                        {
                              //puchna Hai               
                              selectedPostId === index && isCommentOpen && (
                                                commentData && commentData.length > 0 && (
                                                    commentData.map((commentvalue, index) => {
                                                        return (
                                                            <Comment
                                                                name={commentvalue.name}
                                                                email={commentvalue.email}
                                                                body={commentvalue.body}
                                                            />
                                                        )
                                                    })
                                                )
                                            )
                                        }
                                    </div>
                                )   
                            })

                        )
                    }
                    <Pagination count={10} color="secondary" showFirstButton showLastButton size="large" onChange={this.handlePagination} />
                </Fragment>
            </div>
        )
    }
}

export default Posts;
