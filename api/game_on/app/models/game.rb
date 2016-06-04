class Game < ActiveRecord::Base
  has_many :games_teams
  has_many :teams, through: :games_teams

  validates :start_time, :address, :city, :zip_code, :team_size, presence: true
end
