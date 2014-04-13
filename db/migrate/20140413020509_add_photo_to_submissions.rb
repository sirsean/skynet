class AddPhotoToSubmissions < ActiveRecord::Migration
  def change
    add_column :submissions, :photo, :string
  end
end
