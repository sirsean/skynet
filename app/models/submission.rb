class Submission < ActiveRecord::Base
  mount_uploader :photo, PhotoUploader
end
