class Vote < ActiveRecord::Base
  belongs_to :user
  belongs_to :submission

  validates :user, :submission, :value, presence: true
  validates :value, inclusion: { in: [-1, 0, 1] }
  validates :submission_id, uniqueness: { scope: :user_id }

  scope :for_user, ->(user) do
    where(user: user)
  end
end
