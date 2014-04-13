class DashboardController < ApplicationController
  def index
    @submissions = Submission.where("photo is not null").order(created_at: :desc)
  end
end
