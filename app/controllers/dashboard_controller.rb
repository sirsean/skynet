class DashboardController < ApplicationController
  def index
    @submissions = Submission.where("photo is not null")
  end
end
