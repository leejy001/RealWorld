import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { getCommentsInfo } from "../../../api/comment";
import { useRouter } from "../../../hooks/useRouter";
import { CommentResult } from "../../../types/comment";
import { UserResult } from "../../../types/user";

interface ArticleProps {
  slug: string;
  userInfo: UserResult | null;
}
function Comments({ slug, userInfo }: ArticleProps) {
  const { routeTo } = useRouter();
  const [comments, setComments] = useState<CommentResult[]>([]);
  const commentSubmitHandler = () => {};

  const getCommentsListInfo = useCallback(async () => {
    const commentsRes = await getCommentsInfo(slug);
    if (commentsRes?.comments) setComments(commentsRes.comments);
  }, [slug]);

  useEffect(() => {
    getCommentsListInfo();
  }, [getCommentsListInfo]);

  return (
    <CommentsContainer>
      <CommentFormCard onSubmit={commentSubmitHandler}>
        <textarea name="body" placeholder="Write a comment..." />
        <CommentFormCardFooter>
          <img
            src={userInfo?.user.image}
            alt="profile-img"
            width={30}
            height={30}
          />
          <button type="submit" value="Submit">
            Post Comment
          </button>
        </CommentFormCardFooter>
      </CommentFormCard>
      <CommentsListWrapper>
        {comments.map((comment) => (
          <CommentCard key={comment.id}>
            <CommentCardBody>{comment.body}</CommentCardBody>
            <CommentCardFooter>
              <CommentCardUserInfo>
                <img
                  src={comment.author.image}
                  alt="profile-img"
                  width={20}
                  height={20}
                />
                <CommentCardUserName
                  onClick={() => routeTo(`/profile/${comment.author.username}`)}
                >
                  {comment.author.username}
                </CommentCardUserName>
                <CommentCardCreateAt>{comment.createdAt}</CommentCardCreateAt>
              </CommentCardUserInfo>
            </CommentCardFooter>
          </CommentCard>
        ))}
      </CommentsListWrapper>
    </CommentsContainer>
  );
}

export default Comments;

const CommentsContainer = styled.div`
  margin: 0 auto;
  max-width: 700px;
  width: 100%;
`;

const CommentFormCard = styled.form`
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  textarea {
    border: none;
    border-radius: 5px 5px 0px 0px;
    width: 100%;
    height: 100px;
    padding: 20px;
    font-size: 16px;
    resize: vertical;
  }
`;

const CommentFormCardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background-color: #f5f5f5;
  border-radius: 0px 0px 5px 5px;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  img {
    border-radius: 50%;
  }
  button {
    background-color: #5cb85c;
    border: 1px solid #5cb85c;
    border-radius: 3px;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    padding: 4px 8px;
  }
`;

const CommentsListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CommentCard = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 5px;
`;

const CommentCardBody = styled.div`
  padding: 20px;
  line-height: 1.2;
`;

const CommentCardFooter = styled.div`
  background-color: #f5f5f5;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  padding: 12px 20px;
  img {
    border-radius: 50%;
  }
`;

const CommentCardUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CommentCardUserName = styled.p`
  cursor: pointer;
  font-size: 12px;
  color: #5cb85c;
`;

const CommentCardCreateAt = styled.p`
  font-size: 12px;
  color: #bbb;
`;
