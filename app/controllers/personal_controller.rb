class PersonalController < ApplicationController
  def show
    @submissions = Submission
      .where(user_id: params[:user_id])
      .where("photo is not null")
      .order(created_at: :desc)
      .paginate(page: params[:page], per_page: 10)
  end
end
