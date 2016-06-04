class Rsvp < ActiveRecord::Base
  belongs_to :game
  belongs_to :team
  belongs_to :player

  validates :player_id, uniqueness: {scope: :game_id}
end
