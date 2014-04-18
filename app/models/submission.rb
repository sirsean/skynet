class Submission < ActiveRecord::Base
  self.per_page = 10
  mount_uploader :photo, PhotoUploader
  belongs_to :user
end
