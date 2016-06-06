class CreateRsvps < ActiveRecord::Migration
  def change
    create_table :rsvps do |t|
      t.references :game, index: true, foreign_key: true
      t.references :team, index: true, foreign_key: true
      t.references :player, index: true, foreign_key: true
      t.boolean    :responded, default: false
      t.timestamps null: false
    end
  end
end
