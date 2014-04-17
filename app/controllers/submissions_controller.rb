class SubmissionsController < ApplicationController
  def show
    logger.info params.inspect
    @submission = Submission.find(params[:id])
  end

  def new
  end

  def create
    @submission = Submission.new(submission_params) do |s|
      s.user = current_user
    end
    if @submission.save
      redirect_to submission_path(@submission)
    else
      render :new
    end
  end

  private

  def submission_params
    params.require(:submission).permit(:latitude, :longitude, :blue_factor, :photo)
  end
end
