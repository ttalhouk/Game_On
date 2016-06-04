class Sport < ActiveRecord::Base
  has_many :teams

  validates :sport, uniqueness: true
end
