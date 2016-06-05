class Game < ActiveRecord::Base
  belongs_to :home_team, :class_name => "Team", :foreign_key => ""
  belongs_to :away_team, :class_name => "Team"

  validates :start_time, :address, :city, :zip_code, :team_size, presence: true
end
