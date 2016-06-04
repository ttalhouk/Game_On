class CreateTeams < ActiveRecord::Migration
  def change
    create_table :teams do |t|
      t.string :name
      t.references :sport, index: true, foreign_key: true
      t.string :chat_id
      t.references :manager, index: true, foreign_key: true
      t.string :city
      t.integer :zip_code

      t.timestamps null: false
    end
  end
end
