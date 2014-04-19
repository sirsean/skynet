class NearbyController < ApplicationController
  def index
  end

  def nearby
    @submissions = Submission.nearby(params[:latitude], params[:longitude], 2)
    render partial: 'nearby', locals: { submissions: @submissions }, layout: false
  end
end
