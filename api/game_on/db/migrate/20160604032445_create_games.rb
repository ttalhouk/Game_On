class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.datetime :start_time
      t.string :address
      t.string :city
      t.integer :zip_code
      t.integer :team_size
      t.integer :home_team_id
      t.integer :away_team_id

      t.timestamps null: false
    end
  end
end
