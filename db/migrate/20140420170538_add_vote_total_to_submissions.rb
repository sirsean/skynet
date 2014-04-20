class AddVoteTotalToSubmissions < ActiveRecord::Migration
  def change
    add_column :submissions, :vote_total, :integer, default: 0
  end
end
