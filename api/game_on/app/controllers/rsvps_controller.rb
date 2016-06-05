class RsvpsController < ApplicationController
  def show
    @rsvps = current_player.rsvps
  end

  def create

  end

  def update
  end
end
