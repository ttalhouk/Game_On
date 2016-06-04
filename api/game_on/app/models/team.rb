class Team < ActiveRecord::Base
  belongs_to :sport
  belongs_to :manager_id, class_name: "Player"
  has_many :players_teams
  has_many :players, through: :players_teams
  has_many :games_teams
  has_many :games, through: :games_teams
  has_many :rsvps

  validates :name, :manager_id, :city, :zip_code, presence: true
  validates :name, uniqueness: { scope: :sport }

end
