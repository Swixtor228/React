import '../App.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const Post = () => {
  const [postLoading, setPostLoading] = useState(false);
  const trigger = useRef(null);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(10);
  const observer = useRef(null);
  const chanePage = (page) => {
    setPage(page.selected + 1)
  }

  const limit = 10;
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    if (postLoading) return;
    if (page > 10) return;
    if (observer.current) observer.current.disconnect();
    var callback = function (entries, observer) {
      if (entries[0].isIntersecting) {
        setPage(page + 1)
        console.log(page + 1);
      }
    };
    observer.current = new IntersectionObserver(callback);
    observer.current.observe(trigger.current)
  }, [postLoading]);

  useEffect(() => {
    fetchPost()
  }, [page]);

  const fetchPost = async () => {
    setPostLoading(true);
    const count = await axios.get('https://jsonplaceholder.typicode.com/posts')
    setTotalPage(count.data.length / limit);
    const fetchPost = await axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        _page: page,
        _limit: limit
      }
    });
    setPosts([...posts, ...fetchPost.data]);
    setPostLoading(false)
  }

  const deletePost = (id) => {
    const confirm = window.confirm("Вы действительно хотите это удалить?")
    if (confirm) setPosts(posts.filter((post) => post.id !== id))
  }

  const onChange = (e) => {
    setFilter(posts.filter((posts) =>
      posts.title.toLowerCase().includes(e.target.value.toLowerCase())
    )
    )
  }
  const getSearch = () => {
    if (filter) return filter
    return posts
  }

  const searchPost = getSearch();

  return (

    <div className="container">
      <div className="row">
        <h3 className="center-align">Posts</h3>
        <form className="col s12">
          <div className="input-field col s12">
            <i className="material-icons prefix">search</i>
            <textarea
              id="icon_prefix2"
              className="materialize-textarea"
              placeholder="Search"
              onChange={onChange}>
            </textarea>
          </div>
        </form>
        <div className="col s6">
          {searchPost.map((post) =>
            <div className="post-box">
              <p key={post.id}></p>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <div className="center-align">
                <button className="waves-effect waves-light btn" onClick={() => deletePost(post.id)}>удалить</button>
              </div>
            </div>
          )}
        </div>
        <div className="col s6">
          {searchPost.map((post) =>
            <div className="post-box">
              <p key={post.id}></p>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <div className="center-align">
                <button className="waves-effect waves-light btn" onClick={() => deletePost(post.id)}>удалить</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div ref={trigger} ></div>
      <ReactPaginate
        className="littleContainer"
        className="pagination"
        breakLabel="..."
        nextLabel=">"
        onPageChange={chanePage}
        pageRangeDisplayed={3}
        pageCount={totalPage}
        previousLabel="<"
        renderOnZeroPageCount={null}
        activeClassName={"active"}
      />

    </div>
  );
}


export default Post;