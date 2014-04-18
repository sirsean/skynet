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
    submission.destroy if submission.can_delete?(current_user)
    redirect_back_or_default
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
