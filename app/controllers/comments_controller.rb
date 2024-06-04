class CommentsController < ApplicationController
  def index
    @comment = Comment.new
    @comments = Comment.all.order(created_at: :desc)
  end

  def create
    sleep 1 # simulate slow response
    @comment = Comment.new(comment_params)
    @comment.save
    redirect_back_or_to comments_path
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :author)
  end
end
