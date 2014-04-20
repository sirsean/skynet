class SubmissionsController < ApplicationController
  def show
    logger.info params.inspect
    @submission = Submission.find(params[:id])
  end

  def new
  end

  def create
    attributes = submission_params
    attributes[:photo] = uploaded_picture(attributes[:photo])
    @submission = Submission.new(attributes) do |s|
      s.user = current_user
    end
    if @submission.save
      redirect_to submission_path(@submission)
    else
      render :new
    end
  end

  def destroy
    submission = Submission.find(params[:id])
    if signed_in?
      submission.destroy if submission.can_delete?(current_user)
    end
    redirect_back_or_default
  end

  def vote
    submission = Submission.find(params[:id])
    if signed_in?
      value = params[:value].to_i
      Submission.transaction do
        submission.votes.build do |vote|
          vote.submission = submission
          vote.user = current_user
          vote.value = value
        end
        logger.info "HI"
        logger.info submission.inspect
        logger.info submission.votes.inspect
        logger.info submission.votes.first.valid?
        logger.info submission.votes.first.errors.inspect
        submission.vote_total += value
        submission.save!
      end
    end
    redirect_back_or_default submission_path(submission)
  end

  private

  def submission_params
    params.require(:submission).permit(:latitude, :longitude, :blue_factor, :photo)
  end

  def uploaded_picture(picture)
    return unless picture
    tempfile = Tempfile.new ['upload', 'jpg']
    tempfile.binmode
    tempfile.write(Base64.decode64(picture.sub("data:image/jpeg;base64,", "")))
    ActionDispatch::Http::UploadedFile.new(tempfile: tempfile, filename: 'upload.jpg')
  end
end
