class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.references :user, index: true
      t.references :submission, index: true
      t.integer :value, default: 0

      t.timestamps
    end
  end
end
