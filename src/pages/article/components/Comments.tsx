import { Icon } from "@iconify/react";
import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "../../../hooks/useRouter";
import useCommentsQuery from "../../../hooks/comments/useCommentsQuery";
import Spinner from "../../../components/Spinner";
import useCreateCommentMutation from "../../../hooks/comments/useCreateCommentMutation";
import useDeleteCommentMutation from "../../../hooks/comments/useDeleteCommentMutation";

interface UserInfo {
  email: string;
  username: string;
  bio: string;
  image: string;
}

interface ArticleProps {
  slug: string;
  userInfo: UserInfo;
}
function Comments({ slug, userInfo }: ArticleProps) {
  const { routeTo } = useRouter();
  const [body, setBody] = useState<string>("");
  const { isLoading, data } = useCommentsQuery(slug);
  const { mutate: createMutate } = useCreateCommentMutation();
  const { mutate: deleteMutate } = useDeleteCommentMutation();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = event.target.value;
    setBody(val);
  };

  const commentSubmitClickHandler = () => {
    createMutate({ slug, body });
    setBody("");
  };

  const deleteCommentClickHandler = async (id: number) => {
    deleteMutate({ slug, id });
  };

  return (
    <CommentsContainer>
      <CommentFormCard>
        <textarea
          placeholder="Write a comment..."
          value={body}
          onChange={handleChange}
        />
        <CommentFormCardFooter>
          <img src={userInfo.image} alt="profile-img" width={30} height={30} />
          <PostCommentButton
            onClick={commentSubmitClickHandler}
            isWritten={body.length !== 0}
            type="submit"
            value="Submit"
            disabled={body.length === 0}
          >
            Post Comment
          </PostCommentButton>
        </CommentFormCardFooter>
      </CommentFormCard>
      <CommentsListWrapper>
        {isLoading ? (
          <Spinner size={70} />
        ) : (
          <>
            {data?.comments.map((comment) => (
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
                      onClick={() =>
                        routeTo(`/profile/${comment.author.username}`)
                      }
                    >
                      {comment.author.username}
                    </CommentCardUserName>
                    <CommentCardCreateAt>
                      {comment.createdAt}
                    </CommentCardCreateAt>
                  </CommentCardUserInfo>
                  {userInfo.username === comment.author.username && (
                    <CommentDeleteButton
                      onClick={() => deleteCommentClickHandler(comment.id)}
                    >
                      <Icon
                        className="delete-comment"
                        icon="mdi:trash"
                        color="#b85c5c"
                      />
                    </CommentDeleteButton>
                  )}
                </CommentCardFooter>
              </CommentCard>
            ))}
          </>
        )}
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

const CommentFormCard = styled.div`
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => theme.colors.BORDER_GRAY};
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
  border-top: 1px solid ${({ theme }) => theme.colors.BORDER_GRAY};
  img {
    border-radius: 50%;
  }
`;

const PostCommentButton = styled.button<{ isWritten: boolean }>`
  background-color: ${({ theme }) => theme.colors.COLOR_GREEN};
  border: 1px solid ${({ theme }) => theme.colors.COLOR_GREEN};
  border-radius: 3px;
  color: ${({ theme }) => theme.colors.FONT_WHITE};
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 4px 8px;
`;

const CommentsListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CommentCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.BORDER_GRAY};
  border-radius: 5px;
`;

const CommentCardBody = styled.div`
  padding: 20px;
  line-height: 1.2;
`;

const CommentCardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f5f5f5;
  border-top: 1px solid ${({ theme }) => theme.colors.BORDER_GRAY};
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
  color: ${({ theme }) => theme.colors.FONT_GREEN};
`;

const CommentCardCreateAt = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.FONT_GRAY};
`;

const CommentDeleteButton = styled.button`
  border: none;
  cursor: pointer;
  .delete-comment {
    font-size: 20px;
  }
`;
