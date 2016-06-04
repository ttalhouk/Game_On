class Player < ActiveRecord::Base
  has_many :rsvps
  has_many :players_teams
  has_many :teams, through: :players_teams
  has_one :team, foreign_key: :manager_id

  has_secure_password

  validates :name, :email, :phone, :zip_code, :city, presence: true
  validates :email, uniqueness: true

end
