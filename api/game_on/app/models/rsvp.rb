class Rsvp < ActiveRecord::Base
  belongs_to :game
  belongs_to :team
  belongs_to :player

  validates :player_id, uniquness: {scope: :game_id}
end
