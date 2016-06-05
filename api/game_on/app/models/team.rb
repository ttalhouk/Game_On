class Team < ActiveRecord::Base
  belongs_to :sport
  belongs_to :manager, class_name: "Player", foreign_key: "player_id"
  has_many :players_teams
  has_many :players, through: :players_teams
  has_many :home_games, :class_name => "Game", foreign_key: "home_team_id"
  has_many :away_games, :class_name => "Game", foreign_key: "away_team_id"
  has_many :rsvps

  validates :name, :manager_id, :city, :zip_code, presence: true
  validates :name, uniqueness: { scope: :sport }

end
