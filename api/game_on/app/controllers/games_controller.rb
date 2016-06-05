class GamesController < ApplicationController
  before_action :set_player, only[:index, :new]
  def index
    @player.teams
    games = player.games

  end

  def show

  end

  def new
    teams = find_managed_teams(@player)
    response_hash = {
      player:{
        info: @player.as_json,
        teams: teams.as_json
      }
    }
    render json: response_hash


  end

  def create
  end

  def update

  end

  private

  def set_player
    @player = Player.find(params[:player_id])
  end

  def find_managed_teams(player)
    player.teams.find_by(manager_id: player_id)
  end


end
