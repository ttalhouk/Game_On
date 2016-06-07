class Game < ActiveRecord::Base
  belongs_to :home_team, :class_name => "Team", :foreign_key => "home_team_id"
  belongs_to :away_team, :class_name => "Team", :foreign_key => "away_team_id"
  has_many :rsvps, dependent: :destroy

  validates :start_time, :address, :city, :zip_code, :team_size, presence: true

end
