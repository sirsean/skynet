class Submission < ActiveRecord::Base
  self.per_page = 10
  mount_uploader :photo, PhotoUploader
  belongs_to :user

  def can_delete?(u)
    !u.nil? && (u == self.user || u.admin?)
  end
end
