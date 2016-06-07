class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :name
      t.string :password_digest
      t.string :email
      t.string :phone
      t.integer :zip_code
      t.string :city

      t.timestamps null: false
    end
  end
end
