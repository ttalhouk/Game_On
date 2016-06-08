class RsvpsController < ApplicationController
  include GameUpdater
  before_action :set_player, only: [:index, :update, :destroy]
  before_action :set_team, only: [:update, :destroy]
  before_action :set_game, only: [:update, :destroy]

  def index
    @rsvps = Rsvp.where(["player_id = ? AND responded = ?",@player.id, false])
    rsvp_info = format_data(@rsvps)
    response_hash = {player:
      {
        info: @player.as_json,
        open_rsvp: rsvp_info
      }
    }
    render json: response_hash
  end

  def update

    @rsvp = Rsvp.find(params[:id])
    @rsvp.update(responded: true)
    responses = Rsvp.where(["team_id = ? AND game_id = ? AND responded = ?", @team.id, @game.id, true]).count
    if responses >= @game.team_size
      GameUpdater.add_team_to_game(@game, @team)
      remove_invites
    end

    response_hash = {
      player:{
        info: @player.as_json,
      }
    }
    render json: response_hash

  end

  def destroy
    Rsvp.find(params[:id]).destroy
    response_hash = {
      player:{
        info: @player.as_json,
      }
    }
    render json: response_hash
  end

  private

  def remove_invites
    team_confirmed = Rsvp.where(["game_id = ?", @game.id])
    team_confirmed.each {|invite| invite.destroy }
  end

  def set_team
    rsvp = Rsvp.find(params[:id])
    @team = Team.find(rsvp.team_id)
  end

  def set_player
    @player = Player.find(params[:player_id])
  end

  def set_game
    rsvp = Rsvp.find(params[:id])
    @game = Game.find(rsvp.game_id)
  end

  def format_data(rsvps)
    data = []
    rsvps.each do |rsvp|
      game= Game.find(rsvp.game_id)
      data << {
        player_team: Team.find(rsvp.team_id).name,
        address: game.address,
        zip_code: game.zip_code,
        city: game.city,
        start_time: game.start_time.strftime('%I:%M %p %m/%d/%Y'),
        rsvp_id: rsvp.id
      }
    end
      return data
  end
end
