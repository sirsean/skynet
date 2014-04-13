class SubmissionsController < ApplicationController
  def show
    logger.info params.inspect
    @submission = Submission.find(params[:id])
  end

  def new
  end

  def create
    logger.info params.inspect
    logger.info params[:submission].inspect
    logger.info submission_params.inspect

    @submission = Submission.new(submission_params)
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
