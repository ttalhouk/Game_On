class Team < ActiveRecord::Base
  belongs_to :sport
  belongs_to :manager, class_name: "Player", foreign_key: "player_id"
  has_many :players_teams, dependent: :destroy
  has_many :players, through: :players_teams, dependent: :destroy
  has_many :home_games, :class_name => "Game", foreign_key: "home_team_id", dependent: :destroy
  has_many :away_games, :class_name => "Game", foreign_key: "away_team_id", dependent: :destroy
  has_many :rsvps, dependent: :destroy

  validates :name, :manager_id, :city, :zip_code, presence: true
  validates :sport_id, presence: true
  validates :name, uniqueness: { scope: :sport }
  # validates_format_of :zip_code, :with => /\d{5}([ \-]\d{4})?/, :message => "should be in the form 12345 or 12345-1234"


end
