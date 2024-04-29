import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { Error } from '../types/Error';

type Props = {
  post: Post;
  comments: Comment[] | null;
  isLoadingComments: boolean;
  error: Error | null;
  isShowingForm: boolean;
  handleShowForm: (show: boolean) => void;
  isSubmittingForm: boolean;
  handleIsSubmittingForm: (isSubmitting: boolean) => void;
  handleCommentFormSubmission: (
    postId: Post['id'],
    authorName: string,
    authorEmail: string,
    commentBody: string,
  ) => void;
  handleDeleteComment: (commentId: number) => void;
};

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  error,
  isLoadingComments,
  isShowingForm,
  handleShowForm,
  isSubmittingForm,
  handleIsSubmittingForm,
  handleCommentFormSubmission,
  handleDeleteComment,
}) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {post.id}: {post.title}
          </h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {isLoadingComments && <Loader />}

          {error === Error.CommentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isLoadingComments && !comments?.length && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isLoadingComments && !!comments?.length && (
            <p className="title is-4">Comments:</p>
          )}

          {!isLoadingComments &&
            !!comments?.length &&
            comments.map((currentComment: Comment) => (
              <article
                key={currentComment.id}
                className="message is-small"
                data-cy="Comment"
              >
                <div className="message-header">
                  <a
                    href={`mailto:${currentComment.email}`}
                    data-cy="CommentAuthor"
                  >
                    {currentComment.name}
                  </a>
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => handleDeleteComment(currentComment.id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {currentComment.body}
                </div>
              </article>
            ))}

          {/* <article className="message is-small" data-cy="Comment">
            <div className="message-header">
              <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
                Misha Hrynko
              </a>
              <button
                data-cy="CommentDelete"
                type="button"
                className="delete is-small"
                aria-label="delete"
              >
                delete button
              </button>
            </div>

            <div className="message-body" data-cy="CommentBody">
              Some comment
            </div>
          </article>

          <article className="message is-small" data-cy="Comment">
            <div className="message-header">
              <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
                Misha Hrynko
              </a>

              <button
                data-cy="CommentDelete"
                type="button"
                className="delete is-small"
                aria-label="delete"
              >
                delete button
              </button>
            </div>
            <div className="message-body" data-cy="CommentBody">
              One more comment
            </div>
          </article>

          <article className="message is-small" data-cy="Comment">
            <div className="message-header">
              <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
                Misha Hrynko
              </a>

              <button
                data-cy="CommentDelete"
                type="button"
                className="delete is-small"
                aria-label="delete"
              >
                delete button
              </button>
            </div>

            <div className="message-body" data-cy="CommentBody">
              {'Multi\nline\ncomment'}
            </div>
          </article> */}

          {!isShowingForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => handleShowForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isShowingForm && (
          <NewCommentForm
            isSubmittingForm={isSubmittingForm}
            handleIsSubmittingForm={handleIsSubmittingForm}
            handleCommentFormSubmission={handleCommentFormSubmission}
            currentPostId={post.id}
          />
        )}
      </div>
    </div>
  );
};
