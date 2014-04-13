class CreateSubmissions < ActiveRecord::Migration
  def change
    create_table :submissions do |t|
      t.float :latitude
      t.float :longitude
      t.integer :blue_factor

      t.timestamps
    end
  end
end
