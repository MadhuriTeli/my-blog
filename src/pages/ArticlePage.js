import { useParams } from "react-router-dom";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import { useEffect, useState } from "react";
import axios from 'axios';
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";

const ArticlePage = () => {

  const [articileInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
  const { articleId } = useParams();

  useEffect(() => {

    const loadArticleInfo = async () => {
       const response = await axios.get(
         `/api/articles/${articleId}`
       );
       const newArticleInfo = response.data;
       setArticleInfo(newArticleInfo);
    }
    loadArticleInfo();
   
  },[]);


  const article = articles.find((article) => article.name === articleId);

  const addUpvote = async () => {
    const response = await axios.put(`/api/articles/${articleId}/upvote`);
    const updatedArticle = response.data;
    setArticleInfo(updatedArticle);
  }
  
  if (!article) {
    return <NotFoundPage />
  }

    return (
      <>
        <h1>{article.title}</h1>
        <div className="upvotes-section">
          <button onClick={addUpvote}>Upvote</button>
          <p>This Article has {articileInfo.upvotes} upvote(s)</p>
        </div>

        {article.content.map((paragraph, item) => (
          <p key={item}>{paragraph}</p>
        ))}
        <AddCommentForm articleName={articleId} onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} />
        <CommentsList comments={articileInfo.comments} />
      </>
    );
}

export default ArticlePage;